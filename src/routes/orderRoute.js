const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get('/', orderController.get);
router.post('/', orderController.post);

module.exports = router;