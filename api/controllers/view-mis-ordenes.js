module.exports = {


  friendlyName: 'View mis ordenes',


  description: 'Display "Mis ordenes" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/mis-ordenes'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
