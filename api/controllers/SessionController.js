/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  registro: async function(req, res){
    res.view('pages/registro', {titulo: 'Registro'});
  },

  procesarRegistro: async function(req, res){
    const registro = await {
      nombre: req.body.Nombre,
      email: req.body.Correo,
      clave: req.body.Clave,
      activo: true
    };
    const cliente = await Cliente.findOne({email: req.body.Correo});
    if(cliente){
      req.addFlash('mensaje', 'Existe un registro con este correo');
      return res.redirect('/registro');
    }else{
      const cliente = await Cliente.create(registro)
      req.session.cliente = cliente;
      req.addFlash('mensajeCorrecto', 'Se ha registrado el usuario');
      res.redirect('/registro');
    }
  },

  inicioSesion: async function(req, res){
    res.view('pages/iniciar-sesion', {titulo: 'Iniciar sesion'});
  },

  procesarInicioSesion: async function(req, res){
    const login = {
      email: req.body.Correo,
      clave: req.body.Clave
    };
    const cliente = await Cliente.findOne(login);
    if(cliente){
      if(cliente.activo){
        req.session.cliente = cliente;
        let carritoCompra = await CarroCompra.find({cliente: cliente.id});
        req.session.carritoCompra = carritoCompra;
        req.addFlash('mensaje', 'Sesion Iniciada');
        res.redirect('/');
      }
      req.addFlash('mensaje', 'El usuario no esta activo');
      res.redirect('/iniciar-sesion');
    }else{
      req.addFlash('mensaje', 'El usuario o contrasena no existen');
      res.redirect('/iniciar-sesion');
    }
  },

  cerrarSesion: function(req, res){
    if(req.session.cliente){
      req.session.cliente = '';
      req.session.carritoCompra = '';
      req.addFlash('mensajeCorrecto', 'El usuario ha cerrado sesion');
      res.redirect('/iniciar-sesion');
    }else{
      req.addFlash('mensaje', 'No hay una sesion iniciada');
      res.redirect('/');
    }
  }

};

