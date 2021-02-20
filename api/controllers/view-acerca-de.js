module.exports = {


  friendlyName: 'View acerca de',


  description: 'Display "Acerca de" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/acerca-de'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
