document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const likes = parseInt(document.getElementById('likes').value) || 0;
    const dislikes = parseInt(document.getElementById('dislikes').value) || 0;
    const views = parseInt(document.getElementById('views').value) || 0;
    const userId = parseInt(document.getElementById('userId').value) || null;

    // Créer un objet article
    const article = {
        title: title,
        body: body,
        tags: tags,
        reactions: {
            likes: likes,
            dislikes: dislikes
        },
        views: views,
        userId: userId,
        date: new Date().toISOString()
    };

    // Effectuer la requête POST pour envoyer l'article au backend
    fetch('http://localhost:3000/api/news/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Réponse du serveur:', data); // Afficher la réponse du serveur pour le débogage

        // Vérifiez la structure de la réponse du backend
       
    })
    .catch(error => {
        console.error('Erreur:', error); // Afficher l'erreur dans la console
        const messageElement = document.getElementById('message');
        messageElement.classList.remove('alert-info');
        messageElement.classList.add('alert-danger');
        messageElement.textContent = 'Erreur de connexion au serveur.';
        messageElement.style.display = 'block';
    });
});
