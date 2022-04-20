const express= require('express')
const {Router} = require('express');
const fs =require('fs');
const { stringify } = require('querystring');

const router = Router();

const app = express();

/* Pa poder probar se necesita poner el let admin=false o true */

let admin =true;
if(admin){
    // app.use('/api/productos', router)
    let lectura = fs.readFileSync('./productos.json');
    let conversion = JSON.parse(lectura)
    let mostrar = JSON.stringify(conversion)
        router.get('/', async(req, res) => {
                let idItem=1;
                let datas =conversion.map(lm =>({...lm, id:idItem++}))
                await fs.promises.writeFile('./productos.json', JSON.stringify(datas,null,2))
                // console.log(datas)
                res.send(datas)
            })
        router.post('/', async (req,res)=>{
        const nuevoProducto =req.body
            let contenido = await fs.promises.readFile('./productos.json', 'utf-8')
            contenido=JSON.parse(contenido)
            let cantidad=Object.values(contenido)
            cantidad.push(nuevoProducto);
            let idItem=1;
            let mostrar = cantidad.map(lm => ({id:idItem++, ...lm, timestamp: new Date().toLocaleString()}))
            await fs.promises.writeFile('./productos.json', JSON.stringify(mostrar,null,2))             
            res.send('Elemento agregado a productos')
        });


        
router.get('/:id',(req,res)=>{
id=req.params.id
let data=conversion
    if(id !=0){
    if( id < conversion.length+1  ){
    const prod=data.filter(prod => prod.id == id)
    res.send(prod)
    }else{
    res.send({Error:'Id no encontrado'})
    }}else{
        res.send({Error:'Id no encontrado'})
    }
})
router.put('/:id', async(req, res) => {
        const id= req.params.id
        let data= JSON.parse(await fs.promises.readFile('./productos.json','utf-8'))
        let product =data.filter(prod => prod.id == id)
        let{nombre,descripcion,codigo,thumbnail,timestamp,precio,stock}= req.body;
        const actulizacion={
            id:parseInt(id),
            nombre: nombre,
            codigo:codigo,
            thumbnail: thumbnail,
            precio:precio,
            stock:stock,     
            descripcion:descripcion,
            timestamp:new Date().toLocaleString()}
            data[id-1]=actulizacion;
        if( id < conversion.length+1){
            if(id ==0){
                res.send({Error:'Id no encontrado'})
            }else{
        await fs.promises.writeFile('./productos.json',JSON.stringify(data,null,2))
        res.send({Producto:product,Cambio:actulizacion})
    }
        }else{
        res.send({Error:'Id no encontrado'})
        }          
})
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
}
else{

// app.use('/api/carrito',router);
let carrito= fs.readFileSync('./carrito.json');
let cambio = JSON.parse(carrito);

router.get('/',async(req,res)=>{
    let cambio = JSON.parse(carrito);
    let idItem=1;
    let mostrar = cambio.map(insertar => ({...insertar,id:idItem++ }))
    await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))
    res.send(mostrar)
});

// POST: '/' - Crea un carrito y devuelve su id.
router.post('/', async (req,res)=>{
    const nuevoCarrito =req.body
        let contenido = await fs.promises.readFile('./carrito.json', 'utf-8')
        contenido=JSON.parse(contenido)
        let cantidad=Object.values(contenido)
        cantidad.push(nuevoCarrito);
        let idItem=1;
       
        let mostrar = cantidad.map(lm => ({id:idItem++, ...lm,timestamp: new Date().toLocaleString()}))
        
        
        await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))
                      
   res.send(`Carrito con id ${mostrar.length}`)

});

// DELETE: '/:id' - Vacía un carrito y lo elimina.
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

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/:id/productos', async(req,res)=>{
    //cambiar
    let lectura =await fs.promises.readFile('./carrito.json','utf-8');
    lectura=JSON.parse(lectura)
    console.log("leido",lectura[0].contenido[0].productos[0]);
    
    res.json(lectura)
});

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
router.post('/:id/productos', async (req,res)=>{
        const id =req.params.id
        let contenido = await fs.promises.readFile('./carrito.json', 'utf-8')
        let productosC = await fs.promises.readFile('./productos.json','utf-8');
        contenido=JSON.parse(contenido)
        productosC=JSON.parse(productosC)
        let cantidad=Object.values(contenido)

        let mostrar=contenido.map(lm => (lm))
        if(id < contenido.length+1){
            if(id ==0){
            res.send('Id no encontrado')
        }else{
            if(!mostrar[id-1].productos ){
        mostrar[id-1].productos=productosC}
        else{
        mostrar[id-1].productos.push(productosC);
        }
        await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))       
        res.send(mostrar[id-1])
        
    }
    }else{
        res.send('Id no encontrado')
    }
    });



router.post('/:id/productos/:idp', async (req,res)=>{
    const id =req.params.id
    const idPro=req.params.idp
    
    let contenido = await fs.promises.readFile('./carrito.json', 'utf-8')
    let productosC = await fs.promises.readFile('./productos.json','utf-8');
    
    contenido=JSON.parse(contenido)
    productosC=JSON.parse(productosC)

    let mostrar=contenido.map(lm => (lm))

    
    if(parseInt(id-1) < contenido.length && parseInt(id)!=0){
       
        if(idPro > productosC.length){
            res.send("No existe ese producto. seleccione otro");
        }else if(!mostrar[id-1].productos){
            if(idPro==0){
                res.send('No existe ese producto. seleccione otro')
            }else{
            mostrar[id-1].productos=[productosC[idPro-1]]
            await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))
            res.send({Carrito:id,AgregoProducto:productosC[idPro-1]});}
        }
        else{
            if(idPro==0){
                res.send('No existe ese producto. seleccione otro')
            }else{
            mostrar[id-1].productos.push(productosC[idPro-1])
            await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))
            res.send({Carrito:id,AgregoProducto:productosC[idPro-1]});}
            
        }
        
    }else{
        
        res.send("No existe ese carrito, seleccione otro")
    }

});

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
router.delete('/:id/productos/:idPro', async (req,res)=>{
    const id=req.params.id
    const idPro=req.params.idPro
    let contenido = await fs.promises.readFile('./carrito.json', 'utf-8')
    let productosC = await fs.promises.readFile('./productos.json','utf-8');
    
    contenido=JSON.parse(contenido)
    productosC=JSON.parse(productosC)

    let mostrar=contenido.map(lm => (lm))     
        if(parseInt(id-1) < contenido.length && parseInt(id)!=0){
            // console.log(contenido.length)
            if(idPro > productosC.length){
                res.send("No existe ese producto. seleccione otro");
            }else if(!mostrar[id-1].productos){
                if(idPro==0){
                    res.send('No existe ese producto. seleccione otro')
                }else{
                mostrar[id-1].productos=[productosC[idPro-1]]
                await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))
                res.send({Carrito:id,ProductoEliminado:productosC[idPro-1]});}
            }
            else{
                let nro = contenido[id-1].productos;
                if(idPro==0 ){
                    res.send('No existe ese producto. seleccione otro 1')      
                }else{
    
            let index = contenido[id-1].productos.findIndex(prod => prod.id  == idPro);
           
          
            if (index !== -1){
                
                let borrado=mostrar[id-1].productos.splice(index,1)

                await fs.promises.writeFile('./carrito.json', JSON.stringify(mostrar,null,2))

                res.send({Carrito:id,ProductoEliminado:borrado});
                console.log("producto borrado");
               
            }else{
                res.send(`No existe producto con ID: ${idPro}`)
            }
        
        }
            }
        }else{
            
            res.send("No existe ese carrito, seleccione otro")
        }

});
}


module.exports= router;