const server = require("express").Router();
const orders = require('../controllers/orders');
const { Order, Product, User } = require("../db");

//ENCUENTRA O CREA UNA ORDEN EN ESTADO "CARRITO" PARA EL USUARIO
server.post("/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [order, created] = await Order.findOrCreate({
      raw: true,
      where: { userId: userId, state: "carrito" },
      defaults: {
        state: 'carrito'
      }
    })

    res.json(order)

  } catch (error) {
    console.error(error)
  }
})


server.post("/ols", (req, res) => {
  const { price, quantity, state, userId, address, paymentMethod } = req.body
  Order.create({
    price: price,
    quantity: quantity,
    state: state,
    address: address,
    paymentMethod: paymentMethod,
    userId: userId
  })
    .then((order) => {
      res.send(order);
    })
    .catch((err) => res.send(err));
});

// VER ITEMS DEL USUARIO |
//------------------------
server.get("/userid/:id", (req, res) => {
  //Muestra todos los items del carrito
  const { id } = req.params;
  Product.findAll({
    raw:true,
    include: {
      model: Order,
      where: { userId: parseInt(id),state:"carrito" },
    },
  }) 
    .then((items) => {
      let newItemsArray=[]
      items.forEach(item => {
        const{id,name,description,price,stock,img,createdAt,discount}=item
        newItemsArray.push({id,name,description,price,stock,img,createdAt,count:item["orders.order_line.quantity"],discount})
      });
      res.send(newItemsArray);
    })
    .catch((err) => res.send(err));
});
// TRAE TODAS LAS ORDENES |
//-------------------------
server.get("/", (req, res) => {

  Order.findAll({ include: [{ model: Product }, { model: User }] })
    .then((order) => {
      res.send(order);
    })
    .catch((err) => res.send(err));
});
// TRAE UNA ORDEN POR ID |
//------------------------
server.get("/:id", (req, res) => {
  const { id } = req.params;
  Order.findAll({
    where: { id: id }, include: [{ model: Product }, { model: User }]
  })
    .then((order) =>
      res.send(
        order ? order : "la orden no existe"
      )
    )
    .catch((err) => res.send(err));

});


// TRAE ORDENES POR UserID |
//----------------------------
server.get('/user/:id', (req, res) => {
  const { id } = req.params

  User.findOne({ where: { id } })
    .then(user => {
      user.getOrders({ include: [{ model: Product }, { model: User }] })
        .then(
          products => res.send(products),
          err => res.send(err)
        )
    })
    .catch(err => res.send(err))
})




server.put('/:id/modifica', (req, res) => {
 
  const { id } = req.params;
  const { price, quantity, state, address } = req.body;
  return Order.findOne({ where: { id: id }, include: { model: Product } })
    .then((order) => {
      order.state = state;
      order.address = address;
      order.quantity = quantity;
      order.price = price;
      order.save();
      return res.status(200).json({
        message: `La Orden se a modificado`,
        data: order,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: 'Error en el proceso de la orden',
        data: err,
      });
    });
});


module.exports = server;
