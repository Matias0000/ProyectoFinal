const fs =require('fs');

const {Router} =require('express');
const router = Router();
const {getCarrito}= require('../controllers/carrito')


let contenido=fs.readFileSync('./carrito.json', 'utf-8')

// router.post('/',(req,res)=>{
//     const nuevaPersona =req.body
//             let contenido = await fs.promises.readFile('./carrito.json', 'utf-8')
//             contenido=JSON.parse(contenido)
//             let cantidad=Object.values(contenido)
//             cantidad.push(nuevaPersona);
//             let idItem=1;
//             let mostrar = cantidad.map(lm => ({...lm, id:idItem++}))
//             // console.log(mostrar);
//             await fs.promises.writeFile('../../carrito.json', JSON.stringify(mostrar,null,2))
//         // console.log(conversion)                    
//             res.send('post ok')
// });


router.get('/',(req,res)=>{
    res.send(contenido)
});

router.post('/:id/productos',(req,res)=>{});

router.put('/productos/:id',(req,res)=>{});

router.delete('/:id/:id_prod',(req,res)=>{});

