const server = require('express').Router();
const { addProducttoOrder } = require('../controllers/cart');
const { Order, Product, User } = require("../db");

// ASOCIAR  PRODUCTOS A ORDENES |
//--------------------------------
server.post("/:idProducto/order/:idOrder/quantity/:quantity", async (req, res) => {
  let { idProducto, idOrder, quantity } = req.params;
  quantity = parseInt(quantity)
  return addProducttoOrder(idProducto, idOrder, quantity).then((data) => {
    return res.status(201).send("Producto added!");
  }).catch(error => {
    return res.status(400).send({ data: error });
  });
});

// DESASOCIAR  PRODUCTOS A ORDENES |

server.delete("/:idProduct/order/:idOrder",  (req, res) => {
  let { idOrder, idProduct } = req.params;
   Product.findByPk(idProduct).then( (oneProduct) => {
    Order.findByPk(idOrder)
      .then((oneOrder) => {
        oneOrder.removeProduct(oneProduct);
       res.send("eliminado")
      });
   })
  .catch(error => {
    return res.status(400).send({ data: error });
  });
});
// DEVUELVE UN PRODUCTO SEGUN USERID |
//--------------------------------
server.get('/:id', (req, res, next) => {
  const { id } = req.params
  if (!id) return res.error()
  Order.findAll({
    include: {
      model: Product
    },
    where: {
      userId: parseInt(id)
    }
  })
    .then(res => res.send(res))
    .catch(error => res.send(error))
})





server.delete('/:id/cart/', (req, res) => {
  const { id } = req.params;

  Order.findOne({ where: { id } })
    .then((order) => {
      order.destroy();
      return res.status(200).json({
        message: 'Orden eliminada!!',
        data: order,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: 'Error al eliminar Orden',
        data: err,
      });
    });
});
// VER ITEMS DEL USUARIO |
//------------------------
server.get("/:id/orders", (req, res) => {

  const { id } = req.params;
  Order.findAll({
    include: {
      model: Product,
    },
    where: { userId: parseInt(id) },
  }).then((items) => {
    res.send(items);
  })
    .catch((err) => res.send(err));
});

// VER ITEMS DEL CARRITO |
//------------------------
server.get("/:id/cart", (req, res) => {
  //Muestra todos los items del carrito
  const { id } = req.params;
  Order.findAll({
    include: {
      model: Product,
    },
    where: {
      userId: parseInt(id),
      state: "carrito",
    },
  }) //busca todos los items
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});


// COMPRAR PRODUCTOS DEL CARRITO |
//--------------------------------
server.put("/:id/buy", (req, res) => {
  const { id } = req.params;

  Order.update(
    {
      state: "creada",
    },
    {
      where: { userId: parseInt(id), state: "carrito" },
    }
  )
    .then((up) =>
      res.send(
        up[0] ? "se ejecuto la compra" : "no se encontraron los productos"
      )
    )
    .catch((err) => res.send(err));
});



module.exports = server;