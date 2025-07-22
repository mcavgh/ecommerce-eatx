const { Cart, Product, Image, Review, User,Order } = require('../db.js');

module.exports = {


  addProductToUser: async (idUser, idProduct) => {
        return await Product.findByPk(idProduct).then( async (oneProduct) => {
          return await User.findByPk(idUser)
            .then((oneUser) => {
              oneUser.addProduct(oneProduct);
              return oneProduct;
            });
         });
      },
    

}