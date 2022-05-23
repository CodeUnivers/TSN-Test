const carts = require("../controllers/cart.controller.js")
const router = require("express").Router()

router.post("/", carts.create)
router.get("/", carts.findAllByUserId)
router.get("/countCart", carts.countCartByUserId)
module.exports = router
