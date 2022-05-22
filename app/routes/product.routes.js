const products = require("../controllers/product.controller.js");
const router = require("express").Router();

const upload = require("../middleware/upload");

router.post("/", upload.single('file'), products.create);
router.get("/", products.findAll);
router.get("/files", products.getListFiles);
router.get("/:id", products.findOne);
router.put("/:id", products.update);
router.delete("/:id", products.delete);
router.delete("/", products.deleteAll);
module.exports = router;