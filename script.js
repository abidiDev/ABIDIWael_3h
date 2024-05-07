document.addEventListener("DOMContentLoaded", function() {
    const selectArtiste = document.getElementById("selectArtiste");
    const generateBadgeButton = document.getElementById("generateBadge");
    const badgeContainer = document.getElementById("badgeContainer");

    // Remplir le select avec les options d'artistes
    const artistes = [artiste1, artiste2, artiste3, artiste4, artiste5];
    artistes.forEach((artiste, index) => {
        const option = document.createElement("option");
        option.value = index + 1; // Commence à partir de 1 au lieu de 0
        option.text = "Artiste" + (index + 1);
        selectArtiste.appendChild(option);
    });
    

    // Fonction pour générer le badge
    function generateBadge() {
        const selectedArtistIndex = selectArtiste.value;
        if (selectedArtistIndex === "0") {
            badgeContainer.innerHTML = "<p>Veuillez choisir un artiste</p>";
            return;
        }
    
        const selectedArtist = artistes[selectedArtistIndex - 1]; // Ajuster l'index pour correspondre au tableau (commence à partir de 0)
        if (!selectedArtist) {
            badgeContainer.innerHTML = "<p>L'artiste sélectionné n'existe pas</p>";
            return;
        }
    
        const altText = generateAltText(selectedArtist);
    
        const imagePath = `img/img${selectedArtistIndex}.jpg`; // Chemin vers l'image correspondante
        const badgeHTML = `
            <a href='https://fr.wikipedia.org/wiki/Music' target='_blank'>
                <img src='${imagePath}' alt='${altText}' style='width: 130px; height: 130px;'/>
            </a>
        `;
    
        // Créer un élément pour afficher le rendu HTML
        const renderedHTML = document.createElement("div");
        renderedHTML.innerHTML = badgeHTML;
    
        // Créer un titre pour indiquer que le code HTML peut être utilisé dans d'autres pages HTML
        const titleText = document.createElement("h3");
        titleText.textContent = "Copiez et collez ce code dans d'autres pages HTML :";
    
        // Créer un élément pour afficher le code HTML généré
        const codeText = document.createElement("textarea");
        codeText.setAttribute("readonly", true);
        codeText.style.width = "100%";
        codeText.style.height = "100px"; // Ajuster la hauteur selon la taille du code
        codeText.value = badgeHTML;
    
        // Effacer le contenu précédent de badgeContainer
        badgeContainer.innerHTML = "";
    
        // Ajouter les éléments dans badgeContainer
        badgeContainer.appendChild(titleText);
        badgeContainer.appendChild(renderedHTML);
        badgeContainer.appendChild(codeText);
    }
    
    
    

    // Fonction pour générer le texte alternatif (alt)
    function generateAltText(artiste) {
        let alt = ["Recherche", "Devis", "Tarifs", "Prix", "Reservation", "Cherche"][Math.floor(Math.random() * 6)];
    
        let isDJ = false;
        for (const key in artiste.styles) {
            if (artiste.styles[key].name === "STYLE.DJ") {
                isDJ = true;
                break;
            }
        }
    
        if (isDJ) {
            alt += " DJ";
        } else {
            alt += (artiste.nbmembres > 2 ? " groupe de musique" : " musicien");
        }
    
        alt += (Math.random() < 0.5 ? ` ${artiste.localisation}` : ` ${Object.keys(artiste.styles).map(key => artiste.styles[key].name).join(", ")}`);
    
        return alt;
    }
    
    
    // Ajouter un événement au bouton de génération de badge
    generateBadgeButton.addEventListener("click", generateBadge);
});
