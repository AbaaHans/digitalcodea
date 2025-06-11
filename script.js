// Navigation et interactions
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const contactForm = document.getElementById('contact-form');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-full');

    // Navigation scrollée
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Menu mobile toggle
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Fermer le menu mobile lors du clic sur un lien
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Smooth scroll pour les liens de navigation
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Filtrage du portfolio
    function filterPortfolio(category) {
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Animation au scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .value-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Initialisation EmailJS
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("YOUR_PUBLIC_KEY"); // Remplacez par votre clé publique EmailJS
        }
    }

    // Gestion du formulaire de contact
    function handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('form-message');
        
        // Animation du bouton
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Préparation des données pour EmailJS
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            service: formData.get('service'),
            message: formData.get('message'),
            to_email: 'hello@creativeagency.fr' // Votre email de réception
        };
        
        // Envoi avec EmailJS (si configuré)
        if (typeof emailjs !== 'undefined') {
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    showFormMessage('Votre message a été envoyé avec succès ! Nous vous répondrons rapidement.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    showFormMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.', 'error');
                    console.error('EmailJS Error:', error);
                })
                .finally(function() {
                    resetSubmitButton();
                });
        } else {
            // Simulation d'envoi (pour la démo)
            setTimeout(() => {
                showFormMessage('Votre message a été envoyé avec succès ! (Mode démo)', 'success');
                contactForm.reset();
                resetSubmitButton();
            }, 2000);
        }
        
        function resetSubmitButton() {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
        
        function showFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Event listeners
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fermer le menu mobile au clic sur les liens
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Filtrage du portfolio
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            // Filtrer les éléments
            const category = button.getAttribute('data-filter');
            filterPortfolio(category);
        });
    });
    
    // Formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Scroll vers le bas depuis le hero
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialisation
    initEmailJS();
    animateOnScroll();
    
    // Gestion des labels flottants
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Vérifier si le champ a déjà une valeur au chargement
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
});

// Configuration EmailJS (à personnaliser)
/*
Pour utiliser EmailJS:
1. Créez un compte sur https://www.emailjs.com/
2. Créez un service email (Gmail, Outlook, etc.)
3. Créez un template d'email
4. Remplacez les valeurs suivantes:
   - YOUR_PUBLIC_KEY par votre clé publique
   - YOUR_SERVICE_ID par l'ID de votre service
   - YOUR_TEMPLATE_ID par l'ID de votre template

Exemple de template EmailJS:
Sujet: Nouveau message de {{from_name}} - {{subject}}
Contenu:
Nom: {{from_name}}
Email: {{from_email}}
Service: {{service}}
Sujet: {{subject}}

Message:
{{message}}
*/

// Fonctions utilitaires
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimisation du scroll avec debounce
window.addEventListener('scroll', debounce(() => {
    handleNavbarScroll();
    animateOnScroll();
}, 10));

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', debounce(() => {
    // Fermer le menu mobile si la fenêtre devient plus large
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('mobile-menu');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
}, 250));

// Ajout de classes pour les animations CSS
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter une classe au body pour indiquer que JS est chargé
    document.body.classList.add('js-loaded');
    
    // Précharger les images importantes
    const importantImages = [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
        'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});