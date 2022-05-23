const db = require("../models")
const Cart = db.carts

exports.create = (req, res) => {
  if (!req.body.productId) {
    res.status(400).send({ message: "Product ID is required!" })
    return
  } else if (!req.body.kindProduct) {
    res
      .status(400)
      .send({ message: "Choose Kind of Product between Male or Female!" })
    return
  } else if (!req.body.size) {
    res.status(400).send({ message: "Choose one Size of Product!" })
    return
  }

  const cart = new Cart({
    productId: req.body.productId,
    kindProduct: req.body.kindProduct,
    size: req.body.size,
    userId: req.body.userId,
  })

  cart
    .save(cart)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while send to the Cart.",
      })
    })
}

exports.findAllByUserId = (req, res) => {
  const userId = req.query.userId
  Cart.find({ userId: userId })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data Cart.",
      })
    })
}

exports.countCartByUserId = async (req, res) => {
  const userId = req.query.userId
  const carts = await Cart.find({ userId: userId })
  res.send({
    count: carts.length,
  })
}
