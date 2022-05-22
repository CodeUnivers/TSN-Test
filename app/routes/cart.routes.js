const carts = require("../controllers/cart.controller.js");
const router = require("express").Router();

router.post("/", carts.create);
router.get("/:userId", carts.findAllByUserId);
// router.get("/countCart/:userId", carts.countCartByUserId);
module.exports = router;