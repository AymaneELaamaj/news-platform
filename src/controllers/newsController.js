const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {
    // Récupérer tous les articles
    async getAllNews(req, res) {
        try {
            console.log('Début de la récupération des articles');
            const response = await axios.get(DUMMY_JSON_URL);
            console.log('Réponse de l\'API:', response.data);
            res.status(200).json({ posts: response.data.posts });
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error.message);
            res.status(500).json({ message: `Erreur serveur: ${error.message}` });
        }
    },

    // Récupérer un article par ID
    async getNewsById(req, res) {
        try {
            const { id } = req.params;

            // Requête à l'API DummyJSON pour un article spécifique
            const response = await axios.get(`${DUMMY_JSON_URL}/${id}`);
            const post = response.data;

            // Vérification si l'article existe
            if (!post) {
                return res.status(404).json({ message: 'Article non trouvé' });
            }

            // Envoyer l'article au client
            res.status(200).json(post);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'article:', error.message);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    // Créer un nouvel article
    async createNews(req, res) {
        try {
            const { title, content } = req.body;

            // Vérification des champs obligatoires
            if (!title || !content) {
                return res.status(400).json({ message: 'Les champs "title" et "content" sont obligatoires' });
            }

            // Requête POST à l'API DummyJSON
            const response = await axios.post(DUMMY_JSON_URL, { title, content });
            const newPost = response.data;

            // Envoyer l'article créé au client
            res.status(201).json(newPost);
        } catch (error) {
            console.error('Erreur lors de la création de l\'article:', error.message);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }
};

module.exports = newsController;
