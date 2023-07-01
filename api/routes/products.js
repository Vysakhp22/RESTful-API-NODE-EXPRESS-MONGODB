const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then((docs) => {
            console.log(docs);
            res.status(200).json(docs)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.name,
        price: req.body.price
    });
    product.save()  // save method used to save product provided by mongoose. It stores the product in the database
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createdProduct: product
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'Error saving product',
                error: error
            });
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            if (result) {
                console.log("From db" + result);
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: `No valid Product found with this ${id} productId`
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'updated product..!'
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })  //instead of remvove() here deleteOne() is used
    .exec()
    .then((result) =>{
        console.log(result);
        res.status(200).json(result);   
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: err });
    });
});

module.exports = router;