const { sendEmail } = require('../controllers/newsletter');
const { addProductToUser } = require('../controllers/user');
const server = require("express").Router();
const { Order, Product, User, Newsletter } = require("../db");

// TRAE UN USUARIO POR ID |
//------------------------
server.get("/users", (req, res) => {

  User.findAll()
    .then((user) => res.send(user ? user : "no hay usuarios"))
    .catch((err) => res.send(err));
});


// TRAE UN USUARIO POR ID |
//------------------------
server.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => res.send(user ? user : "el usuario no existe"))
    .catch((err) => res.send(err));
});

// TRAE UN USUARIO POR EMAIL |

server.get("/email/:email", (req, res) => {
  const { email } = req.params;
  User.findOne({ where: { email: email } })
    .then((user) => res.send(user ? user : "el usuario no existe"))
    .catch((err) => res.send("errorrrrrrrrrrrrrrrrrrrrrrrrr"));
});
// CREAR USUARIO |
//----------------
server.post("/register", (req, res) => {
  const { name, surname, email, password, photoURL, access } = req.body;

  User.create({
    name: name,
    surname: surname,
    email: email,
    password: password,
    photoURL: photoURL,
    access: access,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.send(err));
});

// AGREGAR PRODUCTS A LA WISHLIST DEL USER
server.post("/:idUser/product/:idProduct", async (req, res) => {
  let { idUser, idProduct } = req.params;

  return addProductToUser(idUser, idProduct).then((data) => {
    return res.status(201).send(data);
  }).catch(error => {
    return res.status(400).send({ data: error });
  });
});

//ELIMINAR PRODUCTS A LA WISHLIST DE USER
server.delete("/:idUser/product/:idProduct",  (req, res) => {
  let { idUser, idProduct } = req.params;
   Product.findByPk(idProduct).then( (oneProduct) => {
    User.findByPk(idUser)
      .then((oneUser) => {
        oneUser.removeProduct(oneProduct);
       res.send("eliminado")
      });
   })
  .catch(error => {
    return res.status(400).send({ data: error });
  });
});
//TRAER PRODUCTOS DE LA WISHLIST DEL USER
server.get("/:idUser/wishList", async (req, res) => {
  const { idUser } = req.params;
  User.findOne({
    where: {
      id: idUser
    },
    include: [{ model: Product }]
  })

    .then((user) => {
      res.send(user.products);
    })
    .catch((err) => res.status(400).send(err));
})
//TRAE TODOS LOS USUARIOS QUE TENGAN EL PRODUCTO EN SU WISHLIST y ESTAN SUSCRIPTOS
server.get("/product/:idProduct/wishList", async (req, res) => {
  const { idProduct } = req.params;
  User.findAll({
    //raw:true,
    include: {
      model: Product,
      where: { id: parseInt(idProduct) },
    },
    include: {
      model: Newsletter,
      required: true,
    },
  })
    .then((users) => {
      const userMails = users.map(user => user.email)
      Product.findOne({ 
        raw:true,
        where: { id: idProduct } })
        .then((product) => {
          sendEmail(product,userMails)
          res.send("se envio el mail")
        })
    })
    .catch((err) => res.status(400).send(err));
})

server.put('/:id/usuario/admin', (req, res, next) => {
  const { id } = req.params;

  User.update(
    {
      access: "Admin",
    },
    {
      where: { id },
    }
  )
    .then(r => res.send(r))
    .catch(next);
})



server.put('/:id/usuario/user', (req, res, next) => {
  const { id } = req.params;

  User.update(
    {
      access: "User",
    },
    {
      where: { id },
    }
  )
    .then(r => res.send(r))
    .catch(next);
})

// UPDATE USER PHOTO
server.put('/:id/avatar', (req, res, next) => {
  const { id } = req.params;

  User.update(
    {
      photoURL: req.body.photoURL,
    },
    {
      where: { id },
    }
  )
    .then(r => res.send(r))
    .catch(next);
})

//////////////// DELETE USER ////////////////
server.delete('/:id', (req, res) => {
  const id = req.params.id

  User.destroy({

    where: { id: id },
  })
    .then((user) => {
      if (user) res.send("user eliminated");

      else res.send("user not found");
    })
    .catch((err) => res.send("an unexpected error occurred"));
})


// // MODIFICA UN PRODUCTO |
// //-----------------------
// server.get("/:id/usuario", (req, res) => {

//   const id = req.params.id;
//   Product.findOne({ where: { id } })
//     .then((product) => {

//         product.update({
//           access:"Admin"

//         })
//         res.send(product);

//     })
//     .catch((error) => {
//       res.status(400).json(error);
//     });
// });

module.exports = server;
