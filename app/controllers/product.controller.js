const db = require("../models");
const route = require("../routes/product.routes");
const MongoClient = require("mongodb").MongoClient;
const dbConfig = require("../config/db.config.js");
const url = dbConfig.url;
const baseUrl = "http://localhost:8080/files/";
const mongoClient = new MongoClient(url);
const Product = db.products;
// Create and Save a new Product
exports.create = (req, res) => {
    try {
        if (req.fileValidationError) {
            res.status(400).send({ message: req.fileValidationError });
            return;
        } else if (!req.body.name) {
            res.status(400).send({ message: "Name of Product can not be empty!" });
            return;
        } else if (!req.body.sex) {
            res.status(400).send({ message: "Kind of Product can not be empty!" });
            return;
        } else if (!req.body.size) {
            res.status(400).send({ message: "Size of Product can not be empty!" });
            return;
        } else if (!req.body.price) {
            res.status(400).send({ message: "Price of Product can not be empty!" });
            return;
        }
    
        const product = new Product({
            name: req.body.name,
            sex: req.body.sex,
            size: req.body.size,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        });
    
        product.save(product).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
    } catch (error) {
        console.log("ini errornya "+error);
        res.status(500).send({
            message: error.message
        });
    }
};
// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Product.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the Product."
        });
    });
};
// Find a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findById(id).then(data => {
        if (!data) {
            res.status(404).send({ message: "Not found Tutorial with id " + id });
        } else {
            res.send(data);
        }
    }).catch(err => {
      res.status(500).send({
          message: err.message || "Error retrieving the Product with id : " + id
      });
    });
};
// Update a Product by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                res.send({ message: "Product was updated successfully." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};
// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};
// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Products were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all products."
            });
        });
};
