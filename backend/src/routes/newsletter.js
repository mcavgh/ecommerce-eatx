const server = require("express").Router();
const { Product, Newsletter } = require("../db.js");


// AGREGAR UN PRODUCTO  A LA NEWSLETTER |
//----------------------
server.post("/user/:userId", (req, res) => {

    const { userId } = req.params;

    Newsletter.create({ userId })
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((error) => {
            if(error.errors[0].message==="userId must be unique"){
                res.send("is in db")
            }else{

                res.status(400).json(error);
            }
        })
})
module.exports = server;
