const {Router} = require('express');
const fs =require('fs');
const { stringify } = require('querystring');

const router = Router();

let lectura = fs.readFileSync('./productos.json');
let conversion = JSON.parse(lectura)
let mostrar = JSON.stringify(conversion)
let admin = true;


router.get('/', (req, res) => {
    // idItem=1;
    // let datas =conversion.map(lm =>({...lm, id:idItem++}))
    // console.log(datas)
    res.send(conversion)
})

router.post('/', async (req,res)=>{
        const nuevaPersona =req.body
            let contenido = await fs.promises.readFile('./productos.json', 'utf-8')
            contenido=JSON.parse(contenido)
            let cantidad=Object.values(contenido)
            cantidad.push(nuevaPersona);
            let idItem=1;
            let mostrar = cantidad.map(lm => ({...lm, id:idItem++}))
            // console.log(mostrar);
            await fs.promises.writeFile('./productos.json', JSON.stringify(mostrar,null,2))
        // console.log(conversion)                    
            res.send('post ok')
        });

//  router('/productos')
//     .get((req,res)=>{
//         res.send(conversion)
//     })
//     .post((req,res)=>{
//         const nuevaPersona =req.body
//         let idItem=1;
//         conversion.push(nuevaPersona)
//         conversion = conversion.map(lm => ({...lm, id:idItem++}))
//     console.log(conversion)                    
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

router.delete('/:id', async (req,res)=>{
        const id=req.params.id
        let data= JSON.parse(await fs.promises.readFile('./productos.json'))
        if( id < conversion.length+1){
            if(id ==0){
                res.send({error:'id no encotrado'})
            }else{
        const nData = data.splice(id-1,1) 
        await fs.promises.writeFile('./productos.json',JSON.stringify(data,null,2))
        res.send({"Elemento Eliminado":nData})
    }
        }else{
        res.send({Error:'Id no encontrado'})
        }  
        })



router.get('/:id',(req,res)=>{
id=req.params.id
let data=conversion
    if( id < conversion.length+1){
    const prod=data.filter(prod => prod.id == id)
    res.send(prod)
    }else{
    res.send({Error:'Id no encontrado'})
    }
})


router.put('/:id', async(req, res) => {
        const id= req.params.id
        let data= JSON.parse(await fs.promises.readFile('./productos.json'))
        let product =data.filter(prod => prod.id == id)
        let{nombre,descripcion,codigo,thumbnail,timestamp,precio,stock}= req.body;
        const actulizacion={nombre: nombre,
            descripcion:descripcion,
            codigo:codigo,
            thumbnail: thumbnail,
            timestamp:new Date().toLocaleString(),
            precio:precio,
            stock:stock}     
            console.log(actulizacion);
        if( id < conversion.length+1){
            if(id ==0){
                res.send({error:'id no encotrado'})
            }else{
                console.log((data)) 
            // console.log((actulizacion));
        // await fs.promises.writeFile('./productos.json',JSON.stringify(data,null,2))
        res.send({Producto:product,Cambio:actulizacion})
    }
        }else{
        res.send({Error:'Id no encontrado'})
        }  
        
// res.send({Producto:product,Cambio:actulizacion})

})


// router.get('/productos',(req,res)=>{});
// router.get('/productos/:id',(req,res)=>{});
// router.post('/productos',(req,res)=>{});
// router.put('/productos/:id',(req,res)=>{});
// router.delete('/productos/:id',(req,res)=>{});


module.exports= router;