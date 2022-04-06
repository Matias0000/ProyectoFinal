

const {Router} =require('express');
const router = Router();
const {getCarrito}= require('../src/controllers/carrito')




router.get('/productos',(req,res)=>{});
router.get('/productos/:id',(req,res)=>{});
router.post('/productos',(req,res)=>{});
router.put('/productos/:id',(req,res)=>{});
router.delete('/productos/:id',(req,res)=>{});

