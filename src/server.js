require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/news', newsRoutes);



// TODO: Question 3 - Ajouter un middleware pour gérer les erreurs
// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Une erreur interne est survenue',
    },
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});