const {Router} = require('express');
const express= require('express')
const fs =require('fs');
const { stringify } = require('querystring');

const router = Router();
const app = express();


let admin =false;
if(admin){
    app.use('/api/productos', router)
    let lectura = fs.readFileSync('./productos.json');
    let conversion = JSON.parse(lectura)
    let mostrar = JSON.stringify(conversion)
        router.get('/', (req, res) => {
                // idItem=1;
                // let datas =conversion.map(lm =>({...lm, id:idItem++}))
                // console.log(datas)
                res.send(conversion)
            })
        router.post('/', async (req,res)=>{
        const nuevoProducto =req.body
            let contenido = await fs.promises.readFile('./productos.json', 'utf-8')
            contenido=JSON.parse(contenido)
            let cantidad=Object.values(contenido)
            cantidad.push(nuevoProducto);
            let idItem=1;
            let mostrar = cantidad.map(lm => ({...lm, id:idItem++,timestamp: new Date().toLocaleString()}))
            // console.log(mostrar);
            await fs.promises.writeFile('./productos.json', JSON.stringify(mostrar,null,2))
        // console.log(conversion)                    
            res.send('post ok')
        });



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
}
else{

app.use('/api/carrito',router);
let carrito= fs.readFileSync('./carrito.json');
let cambio = JSON.parse(carrito);

router.get('/',(req,res)=>{
    res.send(cambio)
});

router.post('/', async (req,res)=>{
    const nuevoCarrito =req.body
        let contenido = await fs.promises.readFile('./carrito.json', 'utf-8')
        contenido=JSON.parse(contenido)
        let cantidad=Object.values(contenido)
        cantidad.push(nuevoCarrito);
        let idItem=1;
        let mostrar = cantidad.map(lm => ({...lm, id:idItem++, timestamp: new Date().toLocaleString()}))
        
        // console.log(mostrar);
        await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))
    // console.log(conversion)                    
   res.send('post ok carrito con id')

});

router.delete('/:id', async (req,res)=>{
    const id=req.params.id
    let data= JSON.parse(await fs.promises.readFile('./carrito.json'))
    if( id < cambio.length+1){
        if(id ==0){
            res.send({error:'id no encotrado'})
        }else{
    const nData = data.splice(id-1,1) 
    await fs.promises.writeFile('./carrito.json',JSON.stringify(data,null,2))
    res.send({"Carrito eliminado":nData})
}
    }else{
    res.send({Error:'Carrito no encontrado'})
    }  
    })

router.get('/:id/productos',(req,res)=>{
    res.send(cambio)
});

router.post('/:id/productos', async (req,res)=>{
        const carrito =req.params.id
        let contenido = await fs.promises.readFile('./carrito.json', 'utf-8')
        let productos = await fs.promises.readFile('./productos.json','utf-8');
        contenido=JSON.parse(contenido)
        productos=JSON.parse(productos)
        productos=JSON.stringify(productos)
        // let vista1 = Object.values(productos)
        // let vista = contenido.map( bus => ({...bus, productos }));
        // vista= JSON.parse(vista);
        let cantidad=Object.values(contenido)
        let idItem=1;
        let mostrar = cantidad.map(lm => ({...lm, id:idItem++, timestamp: new Date().toLocaleString(),
        productos}))
        
        // await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))
        res.send(console.log(mostrar))
});



router.delete('/:id/productos/:id_prod',(req,res)=>{

});
}

// router.get('/productos',(req,res)=>{});
// router.get('/productos/:id',(req,res)=>{});
// router.post('/productos',(req,res)=>{});
// router.put('/productos/:id',(req,res)=>{});
// router.delete('/productos/:id',(req,res)=>{});





module.exports= router;