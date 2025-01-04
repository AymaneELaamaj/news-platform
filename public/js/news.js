document.addEventListener("DOMContentLoaded", async () => {
    const newsContainer = document.getElementById("news-container");

    try {
        // Requête vers l'API pour récupérer les articles
        const response = await fetch("http://localhost:3000/api/news/all");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des articles");
        }

        const data = await response.json();
        console.log(data); // Affiche la réponse complète pour vérifier la structure

        // Supposons que data est un tableau d'articles
        const posts = Array.isArray(data) ? data : [];

        // Générer le contenu HTML pour chaque article
        newsContainer.innerHTML = posts.map(post => `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        <p class="card-text"><strong>Tags:</strong> ${post.tags.join(", ")}</p>
                        <p class="card-text"><strong>Likes:</strong> ${post.reactions.likes}</p>
                        <p class="card-text"><strong>Dislikes:</strong> ${post.reactions.dislikes}</p>
                        <p class="card-text"><strong>Views:</strong> ${post.views}</p>
                        <a href="#" class="btn btn-primary">Lire plus</a>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Erreur :", error.message);
        newsContainer.innerHTML = `<p class="text-danger">Impossible de charger les articles. Veuillez réessayer plus tard.</p>`;
    }
});
