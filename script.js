// Données des filières (simulées)
import filieresDetails from './data/filliere.js';
import documentsDatabase from './data/documentsDatabase.js';
import filieres from './data/filieres.js';

// Données des années (simulées)
const annees = ["2026", "2025", "2024"];

// Données des semestres (simulées)
const semestres = ["1er Semestre", "2e Semestre"];

// Données des documents (simulées)
const documents = {
    "1er Semestre": [
        { name: "Algorithmique Avancée", type: "PDF", size: "2.4 Mo" },
        { name: "Base de Données", type: "PDF", size: "3.1 Mo" },
        { name: "Programmation Web", type: "ZIP", size: "5.7 Mo" }
    ],
    "2e Semestre": [
        { name: "Intelligence Artificielle", type: "PDF", size: "4.2 Mo" },
        { name: "Sécurité Informatique", type: "PDF", size: "2.8 Mo" },
        { name: "Projet Pratique", type: "ZIP", size: "10.5 Mo" }
    ]
};
// Données simulées pour les épreuves (ajouter avec les autres données)
const epreuves = {
    "1er Semestre": [
        { name: "Examen Algorithmique", type: "PDF", size: "1.2 Mo" },
        { name: "Contrôle Base de Données", type: "PDF", size: "0.9 Mo" }
    ],
    "2e Semestre": [
        { name: "Partiel Intelligence Artificielle", type: "PDF", size: "1.5 Mo" },
        { name: "Test Sécurité Informatique", type: "PDF", size: "1.1 Mo" }
    ]
};

// Éléments du DOM
const homePage = document.querySelector('.home-page');
const filieresPage = document.getElementById('filieresPage');
const filierePage = document.getElementById('filierePage');
const anneesPage = document.getElementById('anneesPage');
const semestresPage = document.getElementById('semestresPage');
const documentsPage = document.getElementById('documentsPage');
const backBtn = document.getElementById('backBtn');
const exploreBtn = document.getElementById('exploreBtn');
const searchBar = document.getElementById('searchBar');
const filieresGrid = document.getElementById('filieresGrid');
const anneesGrid = document.getElementById('anneesGrid');
const semestresGrid = document.getElementById('semestresGrid');
const documentsList = document.getElementById('documentsList');
const filiereTitle = document.getElementById('filiereTitle');
const filiereDescription = document.getElementById('filiereDescription');
const anneesTitle = document.getElementById('anneesTitle');
const semestresTitle = document.getElementById('semestresTitle');
const documentsTitle = document.getElementById('documentsTitle');
const coursBtn = document.getElementById('coursBtn');
const epreuvesBtn = document.getElementById('epreuvesBtn');
const infoBtn = document.getElementById('infoBtn');
const epreuvesAnneesPage = document.getElementById('epreuvesAnneesPage');
const epreuvesSemestresPage = document.getElementById('epreuvesSemestresPage');
const epreuvesDocumentsPage = document.getElementById('epreuvesDocumentsPage');
const epreuvesAnneesGrid = document.getElementById('epreuvesAnneesGrid');
const epreuvesSemestresGrid = document.getElementById('epreuvesSemestresGrid');
const epreuvesDocumentsList = document.getElementById('epreuvesDocumentsList');
const epreuvesAnneesTitle = document.getElementById('epreuvesAnneesTitle');
const epreuvesSemestresTitle = document.getElementById('epreuvesSemestresTitle');
const epreuvesDocumentsTitle = document.getElementById('epreuvesDocumentsTitle');
const niveauxPage = document.getElementById('niveauxPage');
const niveauxGrid = document.getElementById('niveauxGrid');
const niveauxTitle = document.getElementById('niveauxTitle');
const epreuvesNiveauxPage = document.getElementById('epreuvesNiveauxPage');
const epreuvesNiveauxGrid = document.getElementById('epreuvesNiveauxGrid');
const epreuvesNiveauxTitle = document.getElementById('epreuvesNiveauxTitle');
const niveaux = ["Licence 1", "Licence 2", "Licence 3"];

// Variables d'état
let currentFiliere = null;
let currentAnnee = null;
let currentSemestre = null;
let pageHistory = [];
let currentNiveau = null;
let currentPage = document.getElementById('homePage');

// Initialisation des animations de la page d'accueil
function initHomeAnimations() {
    gsap.to('.hero-content h1', {
        duration: 1,
        opacity: 1,
        delay: 0.5,
        ease: 'power2.out'
    });

    gsap.to('.hero-content p', {
        duration: 1,
        opacity: 1,
        delay: 1,
        ease: 'power2.out'
    });

    gsap.to('.cta-button', {
        duration: 1,
        opacity: 1,
        y: 0,
        delay: 1.5,
        ease: 'elastic.out(1, 0.5)'
    });

    // Animation des éléments flottants
    document.querySelectorAll('.floating-item').forEach((item, index) => {
        gsap.to(item, {
            duration: 1,
            opacity: 1,
            delay: 2 + index * 0.3,
            ease: 'power2.out',
            onComplete: () => {
                // Animation de flottement continue
                gsap.to(item, {
                    duration: 3 + Math.random() * 2,
                    y: -20 + Math.random() * 40,
                    x: -20 + Math.random() * 40,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        });
    });

    // Création des particules
    createParticl();
}

// Création des particules animées
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = 5 + Math.random() * 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 4;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = 0.3 + Math.random() * 0.5;

        particlesContainer.appendChild(particle);

        // Animation GSAP pour chaque particule
        gsap.to(particle, {
            duration: duration,
            x: -50 + Math.random() * 100,
            y: -50 + Math.random() * 100,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Chargement des filières dans la grille
function loadFilieres(filter = '') {
    filieresGrid.innerHTML = '';

    const filteredFilieres = filieres.filter(filiere =>
        filiere.name.toLowerCase().includes(filter.toLowerCase()) ||
        filiere.description.toLowerCase().includes(filter.toLowerCase())
    );

    filteredFilieres.forEach((filiere, index) => {
        const card = document.createElement('div');
        card.className = 'filiere-card';
        card.innerHTML = `
                    <h3>${filiere.name}</h3>
                    <p>${filiere.description}</p>
                `;

        card.addEventListener('click', () => selectFiliere(filiere));

        filieresGrid.appendChild(card);

        // Animation d'entrée
        gsap.to(card, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });
}

// Chargement des années
function loadAnnees() {
    anneesGrid.innerHTML = '';
    anneesTitle.textContent = `Cours de ${currentFiliere.name}`;

    annees.forEach((annee, index) => {
        const card = document.createElement('div');
        card.className = 'annee-card';
        card.innerHTML = `
                    <h3>${annee}</h3>
                    <p>Année académique ${annee}</p>
                `;

        card.addEventListener('click', () => selectAnnee(annee));

        anneesGrid.appendChild(card);

        // Animation d'entrée
        gsap.to(card, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });
}

// Chargement des semestres
function loadSemestres() {
    semestresGrid.innerHTML = '';
    semestresTitle.textContent = `Cours de ${currentFiliere.name} - ${currentAnnee} - ${currentNiveau}`;

    semestres.forEach((semestre, index) => {
        const card = document.createElement('div');
        card.className = 'semestre-card';
        card.innerHTML = `
                    <h3>${semestre}</h3>
                    <p>Documents du ${semestre.toLowerCase()}</p>
                `;

        card.addEventListener('click', () => selectSemestre(semestre));

        semestresGrid.appendChild(card);

        // Animation d'entrée
        gsap.to(card, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });
}

// Chargement des documents
function loadDocuments() {
    // Récupère les données correctement
    const docsData = documentsDatabase[currentFiliere.name]?.cours?.[currentAnnee]?.[currentNiveau]?.[currentSemestre] || [];
    const documentsList = document.getElementById('documentsList');

    // Met à jour le titre
    const title = document.getElementById('documentsTitle');
    title.textContent = `Cours ${currentFiliere.name} - ${currentAnnee} - ${currentNiveau} - ${currentSemestre}`;

    // Vide la liste
    documentsList.innerHTML = '';

    // Si pas de documents
    if (docsData.length === 0) {
        documentsList.innerHTML = '<div class="no-documents">Aucun document disponible pour le moment.</div>';
        return;
    }

    // Ajoute chaque document
    docsData.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'document-item';
        item.innerHTML = `
            <div class="document-info">
                <strong>${doc.nom}</strong>
                <span>${doc.type} • ${doc.taille}</span>
            </div>
            <div class="document-actions">
                
                <button class="download-btn" data-pdf="${doc.lien}" data-filename="${doc.nom}">
                    <i class="fas fa-download"></i> Télécharger
                </button>
            </div>
        `;
        documentsList.appendChild(item);
    });

    // Affiche la page
    navigateTo(documentsPage, semestresPage);
}
function loadEpreuvesAnnees() {
    epreuvesAnneesGrid.innerHTML = '';
    epreuvesAnneesTitle.textContent = `Épreuves de ${currentFiliere.name}`;

    // Récupère les années disponibles depuis la base de données
    const anneesDisponibles = Object.keys(documentsDatabase[currentFiliere.name]?.epreuves || {});

    anneesDisponibles.forEach((annee, index) => {
        const card = document.createElement('div');
        card.className = 'annee-card';
        card.innerHTML = `
            <h3>${annee}</h3>
            <p>Année académique ${annee}</p>
        `;

        card.addEventListener('click', () => {
            currentAnnee = annee;
            navigateTo(epreuvesNiveauxPage, epreuvesAnneesPage);
            loadEpreuvesNiveaux();
        });

        epreuvesAnneesGrid.appendChild(card);

        // Animation
        gsap.to(card, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });
}


function selectEpreuvesAnnee(annee) {
    currentAnnee = annee;
    navigateTo(epreuvesNiveauxPage, epreuvesAnneesPage);
    loadEpreuvesNiveaux();
}

function loadEpreuvesNiveaux() {
    epreuvesNiveauxGrid.innerHTML = '';
    epreuvesNiveauxTitle.textContent = `Épreuves de ${currentFiliere.name} - ${currentAnnee}`;

    // Récupère les niveaux disponibles depuis la base de données
    const niveauxDisponibles = Object.keys(documentsDatabase[currentFiliere.name]?.epreuves?.[currentAnnee] || []);

    niveauxDisponibles.forEach((niveau, index) => {
        const card = document.createElement('div');
        card.className = 'niveau-card';
        card.innerHTML = `<h3>${niveau}</h3>`;

        card.addEventListener('click', () => {
            currentNiveau = niveau;
            navigateTo(epreuvesSemestresPage, epreuvesNiveauxPage);
            loadEpreuvesSemestres();
        });

        epreuvesNiveauxGrid.appendChild(card);

        // Animation
        gsap.to(card, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });
}


function loadEpreuvesSemestres() {
    epreuvesSemestresGrid.innerHTML = '';
    epreuvesSemestresTitle.textContent = `Épreuves de ${currentFiliere.name} - ${currentAnnee} - ${currentNiveau}`;

    // Récupère les semestres disponibles depuis la base de données
    const semestresDisponibles = Object.keys(documentsDatabase[currentFiliere.name]?.epreuves?.[currentAnnee]?.[currentNiveau] || []);

    semestresDisponibles.forEach((semestre, index) => {
        const card = document.createElement('div');
        card.className = 'semestre-card';
        card.innerHTML = `
            <h3>${semestre}</h3>
            <p>Épreuves du ${semestre.toLowerCase()}</p>
        `;

        card.addEventListener('click', () => {
            currentSemestre = semestre;
            navigateTo(epreuvesDocumentsPage, epreuvesSemestresPage);
            loadEpreuvesDocuments();
        });

        epreuvesSemestresGrid.appendChild(card);

        // Animation
        gsap.to(card, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });
}

function selectEpreuvesSemestre(semestre) {
    currentSemestre = semestre;
    navigateTo(epreuvesDocumentsPage, epreuvesSemestresPage);
    loadEpreuvesDocuments();
}

function loadEpreuvesDocuments() {
    const epreuvesData = documentsDatabase[currentFiliere.name]?.epreuves?.[currentAnnee]?.[currentNiveau]?.[currentSemestre] || [];
    const epreuvesList = document.getElementById('epreuvesDocumentsList');

    epreuvesDocumentsTitle.textContent = `Épreuves ${currentFiliere.name} - ${currentAnnee} - ${currentNiveau} - ${currentSemestre}`;
    epreuvesList.innerHTML = '';

    if (epreuvesData.length === 0) {
        epreuvesList.innerHTML = '<div class="no-documents">Aucune épreuve disponible pour le moment.</div>';
        return;
    }

    epreuvesData.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'document-item';
        item.innerHTML = `
            <div class="document-info">
                <strong>${doc.nom}</strong>
                <span>${doc.type} • ${doc.taille}</span>
            </div>
            <div class="document-actions">
                
                <button class="download-btn" data-pdf="${doc.lien}" data-filename="${doc.nom}">
                    <i class="fas fa-download"></i> Télécharger
                </button>
            </div>
        `;
        epreuvesList.appendChild(item);
    });
}
// Sélection d'une filière
function selectFiliere(filiere) {
    currentFiliere = filiere;
    navigateTo(filierePage, filieresPage);

    // Mise à jour des infos de la filière
    filiereTitle.textContent = filiere.name;
    filiereDescription.textContent = filiere.description;

    // Animation d'entrée
    gsap.fromTo(filierePage,
        { opacity: 0, y: 50 },
        { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }
    );

    // Animation des cartes d'options
    gsap.to('.filiere-header', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        delay: 0.3,
        ease: 'power2.out'
    });

    gsap.to('.option-card', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay: 0.5,
        ease: 'back.out(1.7)'
    });
}

// Sélection d'une année
function selectAnnee(annee) {
    currentAnnee = annee;
    navigateTo(niveauxPage, anneesPage);
    loadNiveaux();

    function loadNiveaux() {
        niveauxGrid.innerHTML = '';
        niveauxTitle.textContent = `Cours de ${currentFiliere.name} - ${currentAnnee}`;

        niveaux.forEach((niveau, index) => {
            const card = document.createElement('div');
            card.className = 'niveau-card';
            card.innerHTML = `<h3>${niveau}</h3>`;

            card.addEventListener('click', () => {
                currentNiveau = niveau;
                navigateTo(semestresPage, niveauxPage);
                loadSemestres();
            });

            niveauxGrid.appendChild(card);

            gsap.to(card, {
                duration: 0.5,
                scale: 1,
                opacity: 1,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            });
        });
    }


    // Animation d'entrée
    gsap.fromTo(semestresPage,
        { opacity: 0, y: 50 },
        { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }
    );

    // Animation des cartes de semestres
    gsap.to('.filiere-header', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        delay: 0.3,
        ease: 'power2.out'
    });

    gsap.to('.semestre-card', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay: 0.5,
        ease: 'back.out(1.7)'
    });
}

// Sélection d'un semestre
function selectSemestre(semestre) {
    currentSemestre = semestre;
    navigateTo(documentsPage, semestresPage); // Correction clé ici
    loadDocuments();

    // Animation
    gsap.fromTo(documentsPage,
        { opacity: 0, y: 50 },
        { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out' }
    );
}

// Navigation entre pages
function navigateTo(newPage, oldPage = null) {
    // Mettre à jour currentPage
    currentPage = newPage;

    // Gestion de l'historique - ne pas ajouter l'accueil
    if (oldPage && oldPage.id !== 'homePage' && !pageHistory.includes(oldPage.id)) {
        pageHistory.push(oldPage.id);
    }

    // Masquer toutes les pages
    document.querySelectorAll('.page-container').forEach(page => {
        page.style.display = 'none';
    });

    // Afficher la nouvelle page
    newPage.style.display = 'block';

    // Animation
    gsap.fromTo(newPage,
        { opacity: 0, y: 20 },
        { duration: 0.3, opacity: 1, y: 0, ease: 'power2.out' }
    );

    // Gestion stricte du bouton retour
    if (newPage.id === 'homePage') {
        backBtn.style.display = 'none'; // Cacher complètement
    } else {
        backBtn.style.display = 'block'; // Montrer
        gsap.fromTo(backBtn,
            { opacity: 0, x: -50 },
            { duration: 0.3, opacity: 1, x: 0, ease: 'power2.out' }
        );
    }
}

// Gestion du bouton retour
function toggleBackButton(show) {
    // Ne jamais afficher le bouton sur l'accueil
    if (currentPage && currentPage.id === 'homePage') {
        show = false;
    }

    if (show) {
        gsap.to(backBtn, {
            duration: 0.3,
            opacity: 1,
            x: 0,
            ease: 'power2.out'
        });
        backBtn.classList.add('visible');
    } else {
        gsap.to(backBtn, {
            duration: 0.3,
            opacity: 0,
            x: -50,
            ease: 'power2.in'
        });
        backBtn.classList.remove('visible');
    }
}

// Retour à la page précédente
function goBack() {
    if (pageHistory.length === 0) {
        // Retour forcé à l'accueil avec réinitialisation
        document.querySelectorAll('.page-container').forEach(page => {
            page.style.display = 'none';
        });
        homePage.style.display = 'block';
        currentPage = homePage;
        backBtn.style.display = 'none'; // Garantir que le bouton est caché
        return;
    }

    const previousPageId = pageHistory.pop();
    const previousPage = document.getElementById(previousPageId);

    if (previousPage) {
        navigateTo(previousPage);
    } else {
        // Fallback vers l'accueil
        navigateTo(homePage);
    }
}

// Événements
exploreBtn.addEventListener('click', () => {
    navigateTo(filieresPage, homePage);
    loadFilieres();

    // Animation de la barre de recherche
    gsap.to('.search-bar', {
        duration: 0.5,
        opacity: 1,
        y: 0,
        delay: 0.3,
        ease: 'back.out(1.7)'
    });
});

backBtn.addEventListener('click', goBack);

searchBar.addEventListener('input', (e) => {
    loadFilieres(e.target.value);
});

coursBtn.addEventListener('click', () => {
    navigateTo(anneesPage, filierePage);
    loadAnnees();
});

epreuvesBtn.addEventListener('click', () => {
    navigateTo(epreuvesAnneesPage, filierePage);
    loadEpreuvesAnnees();
});


// En savoir plus btn
infoBtn.addEventListener('click', () => {
    showFiliereInfo(currentFiliere.name);
});




// Initialisation au chargement


// Initialisation des animations
document.addEventListener('DOMContentLoaded', function () {
    // Animation de l'en-tête
    gsap.to('.univ-header', {
        duration: 1,
        y: 0,
        ease: "power3.out"
    });

    gsap.to('.left-logo', {
        duration: 0.8,
        x: 0,
        opacity: 1,
        delay: 0.3,
        ease: "back.out(1.7)"
    });

    gsap.to('.right-logo', {
        duration: 0.8,
        x: 0,
        opacity: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
    });

    gsap.to('.institute-name', {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        delay: 0.7,
        ease: "back.out(1.7)"
    });

    // Animation du contenu héros
    gsap.to('.hero-title', {
        duration: 1,
        y: 0,
        opacity: 1,
        delay: 1,
        ease: "power3.out"
    });

    gsap.to('.hero-subtitle', {
        duration: 1,
        y: 0,
        opacity: 1,
        delay: 1.2,
        ease: "power3.out"
    });

    gsap.to('.cta-button', {
        duration: 1,
        y: 0,
        opacity: 1,
        delay: 1.4,
        ease: "elastic.out(1, 0.5)"
    });

    // Animation des éléments flottants académiques
    document.querySelectorAll('.floating-element').forEach((el, index) => {
        gsap.to(el, {
            duration: 1,
            opacity: 0.8,
            delay: 1.6 + (index * 0.2),
            ease: "sine.out",
            onComplete: function () {
                // Animation continue plus sophistiquée
                gsap.to(el, {
                    duration: 15 + Math.random() * 15,
                    y: -30 + Math.random() * 60,
                    x: -30 + Math.random() * 60,
                    rotation: -15 + Math.random() * 30,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        });
    });

    // SLIDESHOW CORRIGÉ - Version optimale
    const heroBgs = document.querySelectorAll('.hero-bg');
    let currentBg = 0;

    // Initialisation : masquer toutes les images sauf la première
    gsap.set(heroBgs, { opacity: 0 });
    gsap.set(heroBgs[0], { opacity: 1 });

    function changeBackground() {
        // Faire disparaître l'image actuelle
        gsap.to(heroBgs[currentBg], {
            duration: 1.5,
            opacity: 0,
            ease: "power2.inOut"
        });

        // Passer à l'image suivante
        currentBg = (currentBg + 1) % heroBgs.length;

        // Faire apparaître la nouvelle image
        gsap.to(heroBgs[currentBg], {
            duration: 1.5,
            opacity: 1,
            ease: "power2.inOut"
        });
    }

    // Démarrer le slideshow après 5 secondes
    setTimeout(() => {
        setInterval(changeBackground, 5000);
    }, 5000);

    // Effet parallaxe sur scroll
    ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
            gsap.to(".hero-content", {
                y: self.progress * 80,
                ease: "none"
            });

            gsap.to(".floating-element", {
                y: self.progress * 120,
                x: self.progress * 40,
                ease: "none"
            });

            gsap.to(".univ-header", {
                y: self.progress * -30,
                ease: "none"
            });
        }
    });
});

// Animation spéciale pour le bouton CTA


// Animation spéciale pour le bouton CTA professionnel


// Animation d'entrée
gsap.to(exploreBtn, {
    duration: 1.2,
    y: 0,
    opacity: 1,
    delay: 1.4,
    ease: "elastic.out(1, 0.5)",
    onComplete: function () {
        exploreBtn.classList.add('cta-pulse');
        exploreBtn.classList.add('cta-float');
        setupButtonParticles();
    }
});

function setupButtonParticles() {
    exploreBtn.addEventListener('mouseenter', function (e) {
        exploreBtn.classList.remove('cta-float');
        gsap.to(exploreBtn, {
            duration: 0.3,
            scale: 1.05,
            ease: "power2.out"
        });
        createParticles(e);
        setTimeout(() => {
            exploreBtn.classList.add('cta-float');
        }, 300);
    });

    exploreBtn.addEventListener('mouseleave', function () {
        gsap.to(exploreBtn, {
            duration: 0.3,
            scale: 1,
            ease: "power2.in"
        });
    });
}

function createParticl(e) {
    const btnRect = exploreBtn.getBoundingClientRect();
    const x = e.clientX - btnRect.left;
    const y = e.clientY - btnRect.top;

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'cta-particle';

        const size = 2 + Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`;

        exploreBtn.appendChild(particle);

        gsap.to(particle, {
            duration: 1 + Math.random(),
            x: -15 + Math.random() * 30,
            y: -15 + Math.random() * 30,
            opacity: 0,
            scale: 0.5,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

// Effet de clic professionnel
exploreBtn.addEventListener('click', function () {
    gsap.to(exploreBtn, {
        duration: 0.2,
        scale: 0.95,
        y: "+=3",
        ease: "power2.in",
        onComplete: function () {
            gsap.to(exploreBtn, {
                duration: 0.6,
                scale: 1,
                y: 0,
                ease: "elastic.out(1, 0.5)"
            });
            createClickStars();
        }
    });
});

function createClickStars() {
    for (let i = 0; i < 6; i++) {
        const star = document.createElement('div');
        star.className = 'cta-particle';
        star.style.background = 'none';
        star.style.borderRadius = '0';
        star.innerHTML = '★';
        star.style.color = 'white';
        star.style.fontSize = '16px';
        star.style.textShadow = '0 0 4px rgba(255, 255, 255, 0.8)';

        star.style.left = `${20 + Math.random() * 60}%`;
        star.style.top = `${20 + Math.random() * 60}%`;

        exploreBtn.appendChild(star);

        gsap.to(star, {
            duration: 1,
            y: -30 + Math.random() * 60,
            x: -30 + Math.random() * 60,
            opacity: 0,
            scale: 0.3,
            rotation: Math.random() * 360,
            ease: "power2.out",
            onComplete: () => star.remove()
        });
    }
}

// Données détaillées des filières


// Fonction pour afficher les détails d'une filière
function showFiliereInfo(filiereCode) {
    const filiere = filieres.find(f => f.name === filiereCode);
    const details = filieresDetails[filiereCode] || filieresDetails["ELT"]; // Fallback

    // Mettre à jour le contenu
    document.getElementById("infoFiliereTitle").textContent = filiere.name;
    document.getElementById("infoFiliereDescription").textContent = filiere.description;
    document.getElementById("filierePourquoi").textContent = details.pourquoi;

    // Remplir les listes
    fillList("filiereCompetences", details.competences);
    fillList("filiereMetiers", details.metiers);
    fillList("filiereSecteurs", details.secteurs);



    // Remplir les ressources
    const ressourcesGrid = document.getElementById("filiereRessources");
    ressourcesGrid.innerHTML = '';
    details.ressources.forEach(res => {
        const card = document.createElement('div');
        card.className = 'media-card';
        card.innerHTML = `
                   
                    <h4>${res.title}</h4>
                    <p>${res.type}</p>
                `;
        ressourcesGrid.appendChild(card);
    });

    // Naviguer vers la page
    navigateTo(filiereInfoPage, filierePage);

    // Animation
    gsap.from(".fade-in-up", {
        duration: 0.8,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// Fonction utilitaire pour remplir les listes
function fillList(elementId, items) {
    const list = document.getElementById(elementId);
    list.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}



// Animation du footer (dans votre script existant)
gsap.from(".home-page footer", {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 2, // Apparaît après les autres éléments
    ease: "power2.out"
});

// Dans votre fichier JavaScript

// Dans votre initialisation
document.addEventListener('DOMContentLoaded', function () {
    // Gestion de la lecture PDF
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('view-btn')) {
            const pdfUrl = e.target.getAttribute('data-pdf');
            openPdfViewer(pdfUrl);
        }

        if (e.target.classList.contains('download-btn')) {
            const pdfUrl = e.target.getAttribute('data-pdf');
            const filename = e.target.getAttribute('data-filename');
            downloadPdf(pdfUrl, filename);
        }

        if (e.target.classList.contains('close-modal')) {
            closePdfViewer();
        }
    });
});

function openPdfViewer(pdfUrl) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');

    viewer.src = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/' + pdfUrl)}&embedded=true`;
    modal.style.display = 'flex';
}

function closePdfViewer() {
    document.getElementById('pdfModal').style.display = 'none';
    document.getElementById('pdfViewer').src = '';
}

function downloadPdf(pdfUrl, filename) {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename.endsWith('.pdf') ? filename : filename + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

