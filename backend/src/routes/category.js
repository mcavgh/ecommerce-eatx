const server = require('express').Router();
const category = require('../controllers/category');
const { searchProductsByCategoryName } = require('../controllers/product');

// TRAE TODAS LAS CATEGORIAS |
//----------------------------
server.get('/get', (req, res, next) => {
    category.read()
        .then(r => res.send(r))
        .catch((error) => {
            res.status(400).json(error);
        });
});
//TRAE LOS PRODUCTOS DE LA CATEGORIA
server.get("/productsbycategories/:categoryName", (req, res, next) => {
    let { categoryName } = req.params;
    return searchProductsByCategoryName(categoryName).then((product) => {
        res.status(200).json(product);
    }).catch((error) => {
        res.status(400).json(error);
    });
});
// CREA UNA CATEGORIA |
//---------------------
server.post('/', (req, res, next) => {
    const { name, description } = req.body
    if (!name || !description) {
        return res.send("no hay nombre o descripcion")
    }
    category.create(req.body)
        .then(r => res.send(r))
        .catch(err=>console.error(err));
})
// MODIFICA UNA CATEGORIA |
//-------------------------
server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id) {
        return res.send("no hay id")
    }
    if (!name || !description) {
        return res.send("no hay nombre o descripcion")
    }
    category.update(id, req.body)
        .then(r => res.send(r))
        .catch((error) => {
            res.status(400).json(error);
        });
})
// ELIMINA UNA CATEGORIA |
//------------------------
server.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.send("no hay id")
    }
    category.delete(id)
        .then(r => res.send(r))
        .catch((error) => {
            res.status(400).json(error);
        });
})

module.exports = server;