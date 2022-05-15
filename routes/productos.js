const express = require("express");
const { sendFile } = require("express/lib/response");
const router = express.Router();

const cl_Producto = require("../modules/cl_Producto"); //importo la clase cl_Producto
const Producto = new cl_Producto();

//GET '/api/productos' -> devuelve todos los productos
router.get("/",(req, res)=>{
    res.status(200).json(Producto.getProductos()); 
});


//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:idProducto",(req, res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);

    //valido que el id ingresado sea numerico
    if ( !isNaN(idProducto) ){
        let objProductoId = Producto.getProductoById(idProducto);
        objProductoId != null ? res.status(200).json(objProductoId): res.status(406).json({error:`No se encontró el producto con id: ${idProducto}`});
    }else{
        res.status(404).json({error:'El id ingresado no es numerico'});
    }    
});

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado
router.post("",(req,res)=>{
    //obtengo TODOS(...) los campos recibidos por body
    let objProductoBody = {...req.body};

    //agrego nuevo producto al arrayProductos y devuelvo solo el nuevo obj producto con el id asignado
    let objProductoNuevo = Producto.setProducto(objProductoBody);
    objProductoNuevo != null ? res.status(200).json(objProductoNuevo) : res.status(406).json({error:'Error al querer agregar el nuevo producto'});

});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:idProducto",(req,res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);
    let objProductoBody = {...req.body};

    //actualizo los datos del producto del id recibido
    Producto.updateProducto(idProducto,objProductoBody) ? res.status(200).json({status:`El producto con Id ${idProducto} fue actualizado correctamente.`}) : res.status(406).json({error:`No se encontró el producto con id: ${idProducto}`});
});

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:idProducto",(req,res)=>{
    //obtengo el id recibido por parametro
    let idProducto = parseInt(req.params.idProducto);
    
    //elimino producto con id enviado como parametro
    Producto.deleteProducto(idProducto) ? res.status(200).json({status:`El producto con Id ${idProducto} fue eliminado correctamente.`}) : res.status(406).json({error: `No se encontró el producto con id: ${idProducto}`});
});

module.exports = router;