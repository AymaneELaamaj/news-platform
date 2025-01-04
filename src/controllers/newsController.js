const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/posts';
let customPosts = []; // Liste locale pour stocker les articles créés

const newsController = {
    async getAllNews(req, res) {
        try {
            const { data } = await axios.get(DUMMY_JSON_URL); // Récupérer articles externes
            const allNews = [...data.posts, ...customPosts]; // Fusionner avec articles locaux
            res.json(allNews);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles :", error.message);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async getNewsById(req, res) {
        const { id } = req.params;

        try {
            // Chercher dans les posts locaux
            const customPost = customPosts.find(post => post.id === parseInt(id, 10));
            if (customPost) return res.json(customPost);

            // Sinon, récupérer depuis DummyJSON
            const { data } = await axios.get(`${DUMMY_JSON_URL}/${id}`);
            res.json(data);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'article :", error.message);
            res.status(404).json({ message: 'Article non trouvé' });
        }
    },

    async createNews(req, res) {
        try {
            const { title, body, tags, reactions, views, userId } = req.body;
    
            console.log("Payload reçu :", req.body); // Ajoute cette ligne
    
            if (!title || !body) {
                return res.status(400).json({ message: 'Le titre et le contenu sont requis.' });
            }
    
            // Générer un nouvel ID basé sur les posts existants
            const newId = customPosts.length ? customPosts[customPosts.length - 1].id + 1 : 101;
    
            const newPost = {
                id: newId,
                title,
                body,
                tags: tags || [],
                reactions: reactions || { likes: 0, dislikes: 0 },
                views: views || 0,
                userId: userId || 1,
            };
    
            customPosts.push(newPost);
            res.status(201).json(newPost);
        } catch (error) {
            console.error("Erreur dans createNews :", error); // Ajoute cette ligne
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }
    
};

module.exports = newsController;
