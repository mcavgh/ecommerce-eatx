const server = require('express').Router();
const mercadopago = require('mercadopago');
mercadopago.configure({ access_token: 'TEST-8704277294641088-051822-f004e153bc3fc18dbced2d4af9298ff8-146468735' });
// Crea un objeto de preferencia

server.post('/:userId', (req, res) => {
    const { products } = req.body;
    const itemsToMP = products.map(item => {
        return {
            title: item.name,
            unit_price: Number(item.price),
            quantity: Number(item.count)
        };
    });

    const preference = {
        items: itemsToMP,
        back_urls: {
            success: 'https://ec-webft11-g10.vercel.app/',
            failure: 'https://ec-webft11-g10.vercel.app/',
            pending: 'https://ec-webft11-g10.vercel.app/'
        },
        auto_return: 'approved'
    };

    mercadopago.preferences.create(preference)
    .then(response => {
        res.send(response.body);
    })
    .catch(err => console.log(err));
});

module.exports = server;