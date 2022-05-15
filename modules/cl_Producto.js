
//Clase CONTENEDOR que recibe el nombre del archivo
module.exports = class cl_Producto {

    //array con los productos 
    static #arrProductos = [
        {
            id: 1,
            title: "Notebook",
            price: 199999,
            thumbnail: "images/notebook.jpg",
        },
        {
            id: 2,
            title: "Monitor",
            price: 19000,
            thumbnail: "images/monitor.jpg",
        },
        {
            id: 3,
            title: "Mouse",
            price: 880,
            thumbnail: "images/mouse.jpg",
        },
    ];

    //obtengo el máximo id (lo uso en setProducto)
    #getMaxId(){
        return cl_Producto.#arrProductos.length === 0 ? 0 : cl_Producto.#arrProductos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
    }

    //devuelve todos los productos
    getProductos(){
        return  cl_Producto.#arrProductos.length === 0 ? null : cl_Producto.#arrProductos;
    }

    //devuelve un producto según el id ingresado como parametro
    getProductoById(idProducto){
        return idProducto != undefined && typeof(idProducto) === "number" ? cl_Producto.#arrProductos.find(producto=> producto.id === idProducto): null;
    }

    //recibe y agrega un producto, y lo devuelve con su id asignado
    setProducto(objProductoIN){

        if(objProductoIN.title != undefined && 
            (objProductoIN.price != undefined && parseInt(objProductoIN.price) != NaN) && 
            (objProductoIN.thumbnail != undefined && objProductoIN.thumbnail != "")){

            let id = this.#getMaxId(); //obtengo el máximo id del array de productos
            id++; //sumo en 1 para asginar al nuevo producto            
            objProductoIN.id = id; //asigno id al nuevo producto
            
            //armo el objetoProducto a agregar y devolver con el nuevo id asignado
            let objProductoOUT =  {   
                id:objProductoIN.id,
                title:objProductoIN.title,
                price:objProductoIN.price,
                thumbnail:objProductoIN.thumbnail,
            };
            cl_Producto.#arrProductos.push(objProductoOUT); // lo agrego a mi arrayProductos
            return objProductoOUT; // lo devuelvo con el nuevo id asignado
        }else{
            return null;
        }
    }

    updateProducto(idProducto,objProducto){

        if(objProducto.title != undefined && 
            (objProducto.thumbnail != undefined && objProducto.thumbnail != "") && 
            (objProducto.price != undefined && parseInt(objProducto.price) != NaN) && 
            (idProducto != undefined && typeof(idProducto) === "number")){
            
            //busco la posicion en el array del producto a modificar
            let posicion = cl_Producto.#arrProductos.findIndex(producto=> producto.id === idProducto);
            
            //si la posicion existe , actualizo
            if( posicion > -1){
                //borro producto actual (no modificado)
                cl_Producto.#arrProductos.splice(posicion,1);
                //agrego producto modificado
                cl_Producto.#arrProductos.push(
                    {   
                        id:objProducto.id,
                        title:objProducto.title,
                        price:objProducto.price,
                        thumbnail:objProducto.thumbnail,
                    }
                );
                return true; // retorno OK la actualizacion
            }
        }
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }

    //elimina un producto según su id.
    deleteProducto(idProducto){

        if(idProducto != undefined && typeof(idProducto) === "number"){
            //obtengo la posicion en el arrayProductos del id producto ingresado como parametro
            let posicion = cl_Producto.#arrProductos.findIndex(element=> element.id === idProducto);
            
            if( posicion > -1){
                cl_Producto.#arrProductos.splice(posicion,1); //borro producto
                return true; // retorno OK la eliminacion
            }
        }
        return false; // retorno false si no se cumple nada de lo anterior (ambos if)
    }
}

