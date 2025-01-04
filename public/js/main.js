// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        displayNews(data.posts);
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles');
    }
}

// TODO: Question 1 - Compléter la fonction displayNews
function displayNews(news) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Nettoyer le conteneur avant d'ajouter du contenu

    news.forEach(article => {
        const card = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <img src="${article.image}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="#" class="btn btn-primary">Lire plus</a>
                    </div>
                </div>
            </div>`;
        container.innerHTML += card;
    });
}

// TODO: Question 2 - Créer une fonction pour gérer les erreurs
function showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}


// Initialisation
document.addEventListener('DOMContentLoaded', fetchLatestNews);

