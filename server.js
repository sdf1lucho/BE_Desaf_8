// Importo todo lo que necesi

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { engine } = require("express-handlebars");

const productosRouter = require('./routes/productos');

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/productos', productosRouter);


//*******************************************************
// MOTOR DE PLANTILLA
app.engine(
    "hbs", // nombre del motor / plantilla  
    engine({ //engine viene del nombre como lo importe  const { engine } = require("express-handlebars");
      extname: ".hbs", // extension de los archivos, si no ponemos por defecto va ser .handlebars
      defaultLayout: "layout.hbs", //plantilla principal
      layoutsDir: __dirname + "/views/layouts", //ruta de la plantilla principal
      partialsDir: __dirname + "/views/partials", // ruta a las plantillas parciales
    })
  );
app.set("views", "./views");  //ubicacion de los archivos de plantilla
app.set("view engine", "hbs"); //motor de plantilla q vamos a utilizar "hbs"
//*******************************************************

// Esta ruta carga nuestro archivo index.html en la raíz de la misma
const cl_Producto = require("./modules/cl_Producto"); //importo la clase cl_Producto
const Producto = new cl_Producto();
let listaProductos = []
listaProductos = Producto.getProductos();

app.get('/', (req, res) => { 
  res.render("body", {listadoProducto: listaProductos,  listadoExiste: true});
})

//inicializamos el canal de websockets
io.on('connection', socket => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('¡Nuevo Cliente conectado!')
    //envio datos al cliente (desde servidor)
    socket.emit('msgTodosProductos', listaProductos ) // (evento, msg)

    socket.on('msgNuevoProducto', data => {  
      console.log("io.on sockek.on msgNuevoProducto: inicio (server.js):")
      console.log("io.on sockek.on msgNuevoProducto: rtaPosData y listadoProductos")
      console.log(data);      
      if (data.status != "ok"){
        console.log("estado no OK: no agrego el producto")
      }else{
        console.log("estado OK: agrego el producto")
      } 
      console.log(listaProductos);
      io.sockets.emit('msgTodosProductos', listaProductos);
    })
   
})

// Defino mi server
const PORT = 8080 
const connectedServer = httpServer.listen(PORT, function () { // 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

/* El servidor funcionando en el puerto 8080
httpServer.listen(8080, () => console.log('SERVER ON'))*/
