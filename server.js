const express = require('express');
const fs= require('fs');
// const carrito = require('./carrito.js')
// const multer= require('multer');
const app = express();

const routes = require('./routes.js');


app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',async (req, res) => {
    let messange = await mensajes.getAll();
    res.send('index.html',{messange});
});


app.use('/api/productos', routes)
app.use('/api/carrito',routes);   



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
