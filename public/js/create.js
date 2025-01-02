document.getElementById("create-article-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page par défaut
  
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
  
    // Vérification si les champs sont vides
    if (!title || !content) {
        alert("Les champs 'Titre' et 'Contenu' sont obligatoires !");
        return;
    }
  
    try {
        // Envoi de la requête POST pour créer l'article
        const response = await fetch("/api/news/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }), // Données du formulaire
        });
  
        // Vérification de la réponse
        if (response.ok) {
            const data = await response.json();
            alert("Article créé avec succès !");
            window.location.href = "/news.html"; // Redirige vers la page des articles
        } else {
            const errorData = await response.json();
            alert(`Erreur lors de la création de l'article: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Erreur de connexion:", error);
        alert("Erreur de connexion au serveur.");
    }
});
