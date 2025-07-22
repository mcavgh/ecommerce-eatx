const { getProductsByLetterIncludeInTheName, addCategoryToProduct } = require('../controllers/product');
const server = require("express").Router();
const { Product } = require("../db.js");



// TRAE TODOS LOS PRODUCTOS QUE INCLUYAN LAS LETRAS...|
//---------------------------
server.get("/search/:foodName", (req, res, next) => {
  let { foodName } = req.params;
  return getProductsByLetterIncludeInTheName(foodName).then((product) => {
    res.status(200).json(product);
  }).catch((error) => {
    res.status(400).json(error);
  });
});
// TRAE TODOS LOS PRODUCTOS |
//---------------------------
server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products)
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// TRAE UN PRODUCTO POR ID |
//--------------------------
server.get("/:id", (req, res, next) => {

  const { id } = req.params;

  Product.findOne({ where: { id } })
    .then((product) => {
      if (!product) return res.send("product not found");
      res.send(product);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// AGREGAR UN PRODUCTO |
//----------------------
server.post("/", (req, res) => {

  const { productName, description, productImg, priceInt, stockInt,  productId,category } = req.body;
  const product = {
    name: productName,
    description: description,
    price: priceInt,
    stock: stockInt,
    img: productImg,
    productId: productId

  }

  return Product.create(product).then((product) => {
    res.status(200).json(product);
  }).catch((error) => {
    res.status(400).json(error);
  });
})
// AGREGAR CATEGORIAS A PRODUCTOS
server.post("/:idProducto/category/:idCategoria", async (req, res) => {
  let { idProducto, idCategoria } = req.params;

  return addCategoryToProduct(idProducto, idCategoria).then((data) => {
    return res.status(201).send("Category added!");
  }).catch(error => {
    return res.status(400).send({ data: error });
  });
});

// MODIFICA UN PRODUCTO |
//-----------------------
server.put("/:id", (req, res) => {

  const id = req.params.id;
  const { productName, description, productImg, priceInt, stockInt, category } = req.body;
  Product.findOne({ where: { id } })
    .then((product) => {
      if (!product) {
        res.send("product not found");
      } else {
        product.update({
          name: productName,
          description: description,
          price: priceInt,
          stock: stockInt,
          img: productImg,
          category: category

        });
        res.send(product);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// MODIFICA LA CANTIDAD DEL PRODUCTO |
//------------------------------------
server.put("/:id/quantity", (req, res) => {
  const id = req.params.id;
  const { stock } = req.body;

  Product.findOne({ where: { id } })
    .then((product) => {
      if (!product) {
        res.send("product not found");
      } else {
        product.update({ stock });
        res.send(product);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
})


// ELIMINA UN PRODUCTO |
//----------------------
server.delete("/:id", (req, res) => {

  const id = req.params.id;

  Product.destroy({

    where: { id },
  })
    .then((product) => {
      if (product) res.send("product eliminated");

      else res.send("product not found");
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// MODIFICA EL DESCUENTO DEL PRODUCTO |
//------------------------------------
server.put("/:productId/discount/:discount", (req, res) => {
  const {productId,discount} = req.params;

  Product.findOne({ where: { id:productId } })
    .then((product) => {
      if (!product) {
        res.send("product not found");
      } else {
        product.update({ discount });
        res.send(product);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
})

module.exports = server;
