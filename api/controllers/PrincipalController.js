/**
 * PrincipalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  inicio: async function(req, res){
    const fotos = await Foto.find();
    res.view('pages/homepage', {titulo: '', fotos: fotos, usuario: req.session.cliente});
  }

};

