const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authService = require("../services/auth-service");

router.get('/', productController.get);
router.get('/:slug', productController.getBySlug);
router.get('/tags/:tag', productController.getByTag);
router.get('/admin/:id', productController.getById);
router.post('/', authService.authorize, productController.post);
router.put('/:id', productController.put);
router.delete('/:id', productController.delete);

module.exports = router;