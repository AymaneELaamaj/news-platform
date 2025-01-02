const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// TODO: Question 4 - Compléter les routes
router.get('/all', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/create', newsController.createNews);

module.exports = router;    