document.addEventListener("DOMContentLoaded", async () => {
    const newsContainer = document.getElementById("news-container");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("search");
    const resultsContainer = document.getElementById("results");

    let posts = []; // Variable pour stocker tous les articles récupérés

    try {
        // Requête vers l'API pour récupérer tous les articles
        const response = await fetch("http://localhost:3000/api/news/all");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des articles");
        }

        const data = await response.json();
        console.log(data);

        // Vérification que les données sont un tableau
        posts = Array.isArray(data) ? data : [];

        // Affichez tous les articles au chargement
        renderPosts(posts, newsContainer);
    } catch (error) {
        console.error("Erreur :", error.message);
        newsContainer.innerHTML = `<p class="text-danger">Impossible de charger les articles. Veuillez réessayer plus tard.</p>`;
    }

    // Gestionnaire d'événement pour le formulaire de recherche
    // Gestionnaire d'événement pour le formulaire de recherche
    searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Formulaire soumis");

    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log("Terme de recherche :", searchTerm);

    // Vider le conteneur des articles avant d'afficher les résultats
    resultsContainer.innerHTML = ""; // Effacer les anciens résultats
    newsContainer.innerHTML = ""; // Effacer les anciens articles

    if (searchTerm === "") {
        resultsContainer.innerHTML = `<p class="text-danger">Veuillez entrer un terme de recherche.</p>`;
        return;
    }

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.body.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    console.log("Résultats de la recherche :", filteredPosts);

    if (filteredPosts.length > 0) {
        renderPosts(filteredPosts, resultsContainer); // Afficher les résultats dans 'results'
    } else {
        resultsContainer.innerHTML = `<p class="text-warning">Aucun article trouvé pour "${searchTerm}".</p>`;
    }
    });


    // Fonction pour afficher les articles
    function renderPosts(posts, container) {
        console.log("Articles à afficher dans le conteneur:", posts);  // Vérifiez que vous avez des articles ici
        if (posts.length === 0) {
            container.innerHTML = "<p class='text-warning'>Aucun article disponible.</p>";
            return;
        }
        container.innerHTML = posts.map(post => `
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
    }
    
    
});
