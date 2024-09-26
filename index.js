const express = require("express"); 
const path = require('path');
const morgan = require('morgan');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const session = require('express-session');
// Crear servidor
const servidor = express();

// Configuración del servidor
servidor.set('port', process.env.PORT || 3001); 
servidor.set("view engine", "ejs"); 

// Middlewares
servidor.use(morgan('dev')); 
servidor.use(express.json()); 
servidor.use(express.urlencoded({ extended: false }));
servidor.use(bodyParser.json());//maneja las solicitudes POST

// Archivos estáticos
servidor.use(express.static(path.join(__dirname, 'public')));

// Configurar sesión
servidor.use(session({
  secret: 'soyaldana',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

// Crear conexión a la base de datos
function handleDisconnect() {
  conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3308",
    password: "2812",
    database: "gdc"
});

// Avisar si hay error en la conexión
conexion.connect  ((err) => {
  if (err) {
    console.log(err.message);
    setTimeout(handleDisconnect, 2000); // Establecer un reintento cada 2 segundos
  } else {
    console.log("Conectado");
  }
});

conexion.on('error', (err) => {
  console.log('Error en la conexión:', err);
  if (err.code === 'PRTOCOL_CONNECTION_LOST') {
    handleDisconnect(); // Reconectar
  } else {
    throw err;
  }
});
}

handleDisconnect();

// Rutas
servidor.get("/", (req, res) => {
  res.render("index");
});
servidor.get('/inicio', (req, res) => {
  if (req.session.user) {
    res.render("inicio", {user: req.session.user});
  } else {
    res.redirect('/');
  }
});
servidor.get("/departamentos", (req, res) => {
  res.render("departamentos");
});

servidor.get("/proyectos", (req, res) => {
  res.render("proyectos");
});
servidor.post("/ingresar", (req, res) => {
  const { usuario, password } = req.body;
  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";
  
  conexion.query(sql, [usuario, password], (err, lista) => {
    if (err) {
      console.log(err.message);
      res.status(500).send('Error en la consulta');
      return;
    }
    if (lista.length === 0) {
      console.log("Usuario o contraseña incorrecto");
      res.send("Usuario o contraseña incorrecto");
    } else {
      const user = lista[0];
      req.session.user = user;
      res.redirect('/inicio');
    }
  });
});


const tools = "SELECT idherramienta, nombre, cantidad, estado from herramientas";
servidor.get('/herramientas', (req, res) => {
  conexion.query(tools, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).send('Error en la consulta a la base de datos');
      return;
    }
    res.render('herramientas', { data: results });
  });
});

//cargar saludo personalizado


//------------------------------------
const materialesDB = "select idmateriales, m.nombre, cantidad, d.nombre as departamento from materialesf m join departamentos d on m.iddepartamento = d.iddepa";
servidor.get('/datosstock', (req, res) => {
  conexion.query(materialesDB, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).send('Error en la consulta a la base de datos');
      return;
    }
    res.render('datosstock', { data: results });
  });
});

//traer los materiales de un departamento especifico
const albanileria = "select idmateriales, m.nombre, cantidad from materialesf m where iddepartamento = 2";
servidor.get('/albanileria', (req, res) => {
  conexion.query(albanileria, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).send('Error en la consulta a la base de datos');
      return;
    }
    res.json(results)
  });
});
//electricidad
const electricidad  = "select idmateriales, m.nombre, cantidad from materialesf m where iddepartamento = 3";
servidor.get('/electricidad', (req, res) => {
  conexion.query(electricidad, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).send('Error en la consulta a la base de datos');
      return;
    }
    res.json(results)
  });
});

//herreria
const herreria = "select idmateriales, m.nombre, cantidad from materialesf m where iddepartamento = 1";
servidor.get('/herreria', (req, res) => {
  conexion.query(herreria, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).send('Error en la consulta a la base de datos');
      return;
    }
    res.json(results)
  });
});

//pintureria
const pintureria = "select idmateriales, m.nombre, cantidad from materialesf m where iddepartamento = 4";
servidor.get('/pintureria', (req, res) => {
  conexion.query(pintureria, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).send('Error en la consulta a la base de datos');
      return;
    }
    res.json(results)
  });
});

//plomeria
const plomeria = "select idmateriales, m.nombre, cantidad from materialesf m where iddepartamento = 6";
servidor.get('/plomeria', (req, res) => {
  conexion.query(plomeria, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).send('Error en la consulta a la base de datos');
      return;
    }
    res.json(results);
  });
});

//finalization
const finalizacion = "select idmateriales, m.nombre, cantidad from materialesf m where iddepartamento = 6";
servidor.get('/finalizacion', (req, res) => {
  conexion.query(finalizacion, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).send('Error en la consulta a la base de datos');
      return;
    }
    res.json(results);
  });
});
//---------------------------------------------------------------------------//

//solicitud formulario para agregar materiales

servidor.post('/agregarmateriales', (req, res) => {
  const { nombre, cantidad, iddepartamento, fechamodificacion } = req.body;
  
  const query = "INSERT INTO materialesf (nombre, cantidad, fechamodificacion, iddepartamento, idgrupo) VALUES (?, ?, ?, ?, '6')";
  console.log(req.body); // Verifica los datos recibidos
  conexion.query (query, [nombre, cantidad, fechamodificacion, iddepartamento ], (error, result) => {
    if (error) {
      console.error('Error al insertar los datos: ', error);
      res.status(500).json({message: 'Error al guardar los datos'});
      return;
    } else {
      console.log('Datos ingresados correctamente:', result);
      res.redirect('/datosstock');
    }
  });
});

// Ruta para AGREGAR UNA HERRAMIENTA
servidor.post('/agregarherr', (req, res) => {
  const { nombre, cantidad, estado } = req.body;
  
  const query = "INSERT INTO herramientas (nombre, cantidad, estado) VALUES (?, ?, ?)";
  console.log(req.body); // Verifica los datos recibidos
  conexion.query (query, [nombre, cantidad, estado ], (error, result) => {
    if (error) {
      console.error('Error al insertar los datos: ', error);
      res.status(500).json({message: 'Error al guardar los datos'});
      return;
    } else {
      console.log('Datos ingresados correctamente:', result);
      res.redirect('/herramientas');
    }
  });
});

// Ruta para EDITAR EL ESTADO DE UNA HERRAMIENTA
servidor.post('/editarestado/:id', (req, res) => {
  const id = req.params.id;
  const estado = req.body.estado;
  const query = 'UPDATE herramientas SET estado = ? WHERE idherramienta = ?';
  
  conexion.query(query, [estado,id], (error, results) => {
    if (error) {
      console.error('Error al actualizar el estado de la herramienta:', error);
      return res.status(500).send('Error al actualizar el estado de la herramienta.');
    }
    
    
    // Redirige al usuario a la página de stock (o cualquier otra página)
    res.redirect('/herramientas');
  });
});
//ruta para editar una herramienta
servidor.post('/editarherr/:id', (req, res) => {
  const id = req.params.id;
  const cantidad = req.body.cantidad;
  const query = 'UPDATE herramientas SET cantidad = ? WHERE idherramienta = ?';
  
  conexion.query(query, [cantidad,id], (error, results) => {
    if (error) {
      console.error('Error al eliminar el registro:', error);
      return res.status(500).send('Error al eliminar el registro.');
    }
    
    // Redirige al usuario a la página de stock (o cualquier otra página)
    res.redirect('/herramientas');
  });
});

// Ruta para borrar un material
servidor.get('/borrar/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM materialesf WHERE idmateriales = ?';
  
  conexion.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar el registro:', error);
      return res.status(500).send('Error al eliminar el registro.');
    }
    
    // Redirige al usuario a la página de stock (o cualquier otra página)
    res.redirect('/datosstock');
  });
});

//ruta para editar un material
servidor.post('/editarcantidad/:id', (req, res) => {
  const id = req.params.id;
  const cantidad = req.body.cantidad;
  const query = 'UPDATE materialesf SET cantidad = ? WHERE idmateriales = ?';
  
  conexion.query(query, [cantidad,id], (error, results) => {
    if (error) {
      console.error('Error al eliminar el registro:', error);
      return res.status(500).send('Error al eliminar el registro.');
    }
    
    // Redirige al usuario a la página de stock (o cualquier otra página)
    res.redirect('/datosstock');
  });
});

// Iniciar el servidor
servidor.listen(servidor.get('port'), () => {
  console.log("Servidor Activo");
});

// cerrar sesion del usuario


// controlador para cerrar sesion
servidor.get('/salir', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Error al cerrar la sesion;', err);
      res.status(500).send('Error al cerrar la sesion');
      return;
    }
    res.redirect('/');
  });
});
