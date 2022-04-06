const express = require('express');
const fs= require('fs');
const Mensajes = require('./Datos.js');
// const carrito = require('./carrito.js')
// const multer= require('multer');
const app = express();
// const { Router } = express
// const router = Router()
// const Datos = require('./Datos');
const routes = require('./routes.js');




app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// const productos = fs.readFileSync('./productos.txt','utf-8')

// let lectura = fs.readFileSync('./productos.json');
// let conversion = JSON.parse(lectura)
// let mostrar = JSON.stringify(conversion)

// app.use('/api/productos', routes);

const mensajes = new Mensajes('mensajes.json')

app.get('/',async (req, res) => {
    let messange = await mensajes.getAll();
    res.send('index.html',{messange});
});

let admin =true;
if(admin){
    app.use('/api/productos', routes)
    
}else{
    app.use('/api/carrito',routes);
}


// app.route('/productos')
// .get((req,res)=>{
//         res.send(conversion)
//     })
//     .post((req,res)=>{
//         const nuevaPersona =req.body
//         let idItem=1;
//         conversion.push(nuevaPersona)
//         conversion = conversion.map(lm => ({...lm, id:idItem++}))
//       console.log(conversion)                    
//         res.send('post ok')
//     })
    // .put((req,res)=>{
        
    // })
    // .delete((req,res)=>{

    // })


// router.post('/api/productos',(req,res)=>{
//     const nuevaPersona =req.body
//         let idItem=1;
//         lectura.push(nuevaPersona)
//         lectura = conversion.map(lm => ({...lm, id:idItem++}))
//       // console.log(Ncontenido)                
   
//         res.send('post ok')
// //    const Nproducto=req.body
// //    productos.push(Nproducto)
// //    res.send('post OK')
// })
// update(id, body){
//    const product = {
//        title: body.title,
//        price: body.price,
//        thumbnail: "https://via.placeholder.com/150",
//        id: id
//    } ;
//    const updateIndex = this.products.findIndex((producto) => producto.id == id);
//    this.products[updateIndex] = product;
//    return product;
// }

// router.delete('/productos/:id',(req,res)=>{
//    const id=req.params.id
//    let data=conversion
//    if( id < conversion.length+1){
//       const nData = data.splice(id-1,1) 
//       res.json({"Elemento Eliminado":nData})
//    }else{
//       res.send({Error:'Id no encontrado'})
//    }  
// })



// router.get('/productos/:id',(req,res)=>{
//    id=req.params.id
//    let data=conversion
   
//    if( id < conversion.length+1){
//       const prod=data.filter(prod => prod.id == id)
//       res.send({prod})
//    }else{
//       res.send({Error:'Id no encontrado'})
//    }
// })


// app.put('/api/productos/:id', (req, res) => {
//    const id= req.params.id
   
//    const product = conversion.filter(prod => prod.id == id)
   
//    let{title,price,thumbnail}= req.body;
//    let actulizacion = {
//       title: title,
//       price: price,
//       thumbnail: thumbnail,
//       id:id    
//   } ;
//   console.log(product)

//    res.send({Producto:product,Cambio:actulizacion})

// })

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ err, message: 'Fallo todo lo que podia fallar' });
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.on('error', err => {
	console.log(`Algo salio mal: ${err}`);
});



// El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
// POST: '/' - Crea un carrito y devuelve su id.
// DELETE: '/:id' - Vacía un carrito y lo elimina.
// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
// 
