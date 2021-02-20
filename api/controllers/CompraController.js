/**
 * CompraController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  agregarCarroCompra: async function(req, res){
    let foto = await CarroCompra.findOne({foto: req.params.fotoId, cliente: req.session.cliente.id});
    if(foto){
      req.addFlash('mensaje', 'La foto ya habia sido agregada');
    }else{
      await CarroCompra.create({cliente: req.session.cliente.id, foto: req.params.fotoId});
      req.session.carritoCompra = await CarroCompra.find({cliente: req.session.cliente.id});
      req.addFlash('mensaje', 'La foto se agrego al carrito');
    }
    res.redirect('/');
  },

  carroCompra: async function(req, res){
    if(!req.session || !req.session.cliente){
      return res.redirect('/');
    }
    let elementos = await CarroCompra.find({cliente: req.session.cliente.id}).populate('foto');
    res.view('pages/carro-de-compra', {titulo: 'Carro de compras', elementos: elementos});
  },

  eliminarCarroCompra: async function(req, res){
    let foto = await CarroCompra.findOne({foto: req.params.fotoId, cliente: req.session.cliente.id});
    if(foto){
      await CarroCompra.destroy({cliente: req.session.cliente.id, foto: req.params.fotoId});
      req.session.carritoCompra = await CarroCompra.find({cliente: req.session.cliente.id});
      req.addFlash('mensaje', 'Se ha eliminado del carro de compras');
    }
    return res.redirect('/carro-de-compras');
  },

  comprarFotos: async function(req, res){
    if(!req.session || !req.session.cliente){
      res.redirect('/');
    }else{
      let cantidadFotos = req.session.carritoCompra.length;
      let clienteId = req.session.cliente.id;

      const orden = await Orden.create({fecha: new Date(), total: cantidadFotos, cliente: clienteId}).fetch();
      if(orden){
        req.session.carritoCompra.forEach( async (compra) => {
          const ordenDetalles = await OrdenDatalles.create({orden: orden.id, foto: compra.foto});
          const carrito = await CarroCompra.destroy({cliente: clienteId});
        });
      }
      req.session.carritoCompra = [];
      req.session.carritoCompra = await CarroCompra.find({cliente: req.session.cliente.id});
      req.addFlash('mensaje', 'Se ha realizado la compra');
      res.redirect('/carro-de-compras');
    }
  },

  misOrdenes: async function(req, res){
    if(!req.session || !req.session.cliente){
      return res.redirect('/');
    }
    let ordenes = await Orden.find({cliente: req.session.cliente.id}).sort('id desc');
    res.view('pages/mis-ordenes', {ordenes});
  },

  detalleOrden: async function(req, res){
    if(!req.session || !req.session.cliente){
      res.redirect('/');
    }
    const idOrden = req.params.ordenId;
    const orden = await OrdenDatalles.find({orden: idOrden}).populate('orden').populate('foto');
    console.log(orden)
    res.view('pages/detalle-orden', {orden});
  }

};

