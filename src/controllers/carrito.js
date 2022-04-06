const db = require('../../productos.json');
const express = require('express')
const router = express();


router.get('/',(req,res)=>{
    res.send('Datos',{db});
})

router.get('/productos',getCarrito);


const getCarrito = (req,res)=>{
    res.send('Recibido');
}

module.exports={getCarrito}
module.exports=carrito;

