const { Cart, Product, Image, Review, User,Order } = require('../db.js');

module.exports = {


    addProducttoOrder: async (idProducto, idOrder,quantity) => {
        return await Product.findByPk(idProducto).then( async (oneProduct) => {
          return await Order.findByPk(idOrder)
            .then((neworder) => {
              oneProduct.addOrder(neworder, { through: { quantity: quantity }});
              return neworder;
            });
         });
      },
    

}