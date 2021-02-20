/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': 'PrincipalController.inicio',
  'GET /acerca-de': { action: 'view-acerca-de', locals: {titulo: 'Acerca de'} },
  'GET /registro': 'SessionController.registro',
  'POST /procesar-registro': 'SessionController.procesarRegistro',
  'GET /iniciar-sesion': 'SessionController.inicioSesion',
  'GET /cerrar-sesion': 'SessionController.cerrarSesion',
  'POST /procesar-inicio-sesion': 'SessionController.procesarInicioSesion',
  'GET /agregar-carro-compra/:fotoId': 'CompraController.agregarCarroCompra',
  'GET /eliminar-carro-compra/:fotoId': 'CompraController.eliminarCarroCompra',
  'GET /comprar-fotos': 'CompraController.comprarFotos',
  'GET /carro-de-compras': 'CompraController.carroCompra',
  'GET /mis-ordenes': 'CompraController.misOrdenes',
  'GET /orden-detalle/:ordenId': 'CompraController.detalleOrden',
  'GET /admin/iniciar-sesion': 'AdminController.inicioSesion',
  'GET /admin/cerrar-sesion': 'AdminController.cerrarSesion',
  'POST /admin/procesar-inicio-sesion': 'AdminController.procesarInicioSesion',
  'GET /admin/principal': 'AdminController.principal',
  'GET /admin/agregar-fotos': 'AdminController.agregarFoto',
  'POST /admin/procesar-agregar-foto': 'AdminController.procesarAgregarFoto',
  'GET /admin/clientes': 'AdminController.clientes',
  'GET /admin/administradores': 'AdminController.administradores',
  'GET /admin/cliente/ordenes/:idCliente': 'AdminController.clienteOrdenes',
  'GET /admin/orden-detalle/:ordenId': 'AdminController.detalleOrden',
  'GET /admin/cliente/activar/:idCliente': 'AdminController.activarCliente',
  'GET /admin/cliente/desactivar/:idCliente': 'AdminController.desactivarCliente',
  'GET /admin/administradores/activar/:idAdmin':'AdminController.activarAdmin',
  'GET /admin/administradores/desactivar/:idAdmin':'AdminController.desactivarAdmin',
  'GET /admin/dashboard':'AdminController.dashboard',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
