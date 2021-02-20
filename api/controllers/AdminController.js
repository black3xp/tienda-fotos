/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require('path')
const fs = require('fs')

module.exports = {

  inicioSesion: async function (req, res) {
    res.view('pages/admin/inicio_sesion', {
      titulo: 'Iniciar sesion'
    });
  },

  procesarInicioSesion: async function (req, res) {
    const login = {
      email: req.body.Correo,
      clave: req.body.Clave
    };
    const admin = await Admin.findOne(login);
    if (admin) {
      console.log(admin)
      if(admin.activo){
        req.session.admin = admin;
        req.session.cliente = undefined;
        req.addFlash('mensajeCorrecto', 'Sesion admin iniciada');
        res.redirect('/admin/dashboard');
      }
      req.addFlash('mensaje', 'El usuario no esta activo');
      res.redirect('/admin/iniciar-sesion');
    } else {
      req.addFlash('mensaje', 'El usuario o contrasena no existen');
      res.redirect('/admin/iniciar-sesion');
    }
  },

  cerrarSesion: function (req, res) {
    if (req.session.admin) {
      req.session.admin = undefined;
      req.addFlash('mensaje', 'El usuario ha cerrado sesion');
      res.redirect('/');
    } else {
      req.addFlash('mensaje', 'No hay una sesion iniciada');
      res.redirect('/');
    }
  },

  principal: async function (req, res) {
    const fotos = await Foto.find();
    if (!req.session.admin) {
      res.redirect('/admin/iniciar-sesion');
    }
    res.view('pages/admin/principal', {fotos});
  },

  agregarFoto: function (req, res) {
    if (!req.session || !req.session.admin) {
      res.redirect('/admin/iniciar-sesion')
    } else {
      res.view('pages/admin/agregar-fotos');
    }
  },

  procesarAgregarFoto: async function (req, res) {
    let foto = await Foto.create({
      titulo: req.body.titulo,
      activa: false
    }).fetch()
    req.file('foto').upload({}, async (_err, archivos) => {
      if (archivos && archivos[0]) {
        let upload_path = archivos[0].fd;
        let ext = path.extname(upload_path);

        await fs.createReadStream(upload_path).pipe(fs.createWriteStream(path.resolve(sails.config.appPath, `assets/images/fotos/${foto.id}${ext}`)))
        await Foto.update({id: foto.id}, {contenido: `${foto.id}${ext}`, activa: true});
        req.addFlash('mensaje', 'Foto agregada correctamente');
        return res.redirect('/admin/principal');
      }
      req.addFlash('mensaje', 'No hay foto seleccionada');
      res.redirect('/admin/agregar-fotos')
    })
  },

  clientes: async function(req, res){
    if(!req.session.admin){
      res.redirect('/admin/iniciar-sesion')
    }
    const clientes = await Cliente.find();
    res.view('pages/admin/clientes', {clientes})
  },

  clienteOrdenes: async function(req, res){
    if(!req.session.admin){
      res.redirect('/admin/iniciar-sesion')
    }
    const ordenes = await Orden.find({cliente: req.params.idCliente});
    res.view('pages/admin/ordenes', {ordenes})
  },

  detalleOrden: async function(req, res){
    if(!req.session || !req.session.admin){
      res.redirect('/admin/iniciar-sesion');
    }
    const idOrden = req.params.ordenId;
    //const orden = await OrdenDatalles.find().populate('orden').populate('foto');
    //let orden = await OrdenDatalles.findOne({ordenId: idOrden}).populate('foto').populate('orden');
    //let orden = await OrdenDatalles.findOne({orden: idOrden}).populate('foto').populate('orden');
    let orden = await OrdenDatalles.find({orden: idOrden}).populate('foto').populate('orden');
    console.log(orden)
    res.view('pages/admin/detalle', {orden});
  },

  activarCliente: async function(req, res){
    if(!req.session.admin){
      res.redirect('/admin/iniciar-sesion');
    }
    const idCliente = req.params.idCliente;
    const cliente = await Cliente.update({id: idCliente}, {activo: true})
    req.addFlash('mensaje', 'Se ha activado el cliente');
    res.redirect('/admin/clientes')
  },

  desactivarCliente: async function(req, res){
    if(!req.session.admin){
      res.redirect('/admin/iniciar-sesion');
    }
    const idCliente = req.params.idCliente;
    const cliente = await Cliente.update({id: idCliente}, {activo: false})
    req.addFlash('mensaje', 'Se ha desactivado el cliente');
    res.redirect('/admin/clientes')
  },

  administradores: async function(req, res){
    if(!req.session.admin){
      res.redirect('/admin/iniciar-sesion')
    }
    const admin = await Admin.find();
    res.view('pages/admin/administradores', {admin})
  },

  activarAdmin: async function(req, res){
    if(!req.session.admin){
      res.redirect('/admin/iniciar-sesion');
    }
    const idAdmin = req.params.idAdmin;
    const admin = await Admin.update({id: idAdmin}, {activo: true})
    req.addFlash('mensaje', 'Se ha activado el administrador');
    res.redirect('/admin/administradores')
  },

  desactivarAdmin: async function(req, res){
    if(!req.session.admin){
      res.redirect('/admin/iniciar-sesion');
    }
    const idAdmin = req.params.idAdmin;
    const admin = await Admin.update({id: idAdmin}, {activo: false})
    req.addFlash('mensaje', 'Se ha desactivado el administrador');
    res.redirect('/admin/administradores')
  },

  dashboard: async function(req, res){
    if(!req.session.admin){
      res.redirect('/admin/iniciar-sesion');
    }
    const clientes = await Cliente.find();
    const fotos = await Foto.find();
    const admin = await Admin.find();
    const ordenes = await Orden.find();
    res.view('pages/admin/dashboard', {clientes: clientes.length, fotos: fotos.length, admin: admin.length, ordenes: ordenes.length})
  }

};
