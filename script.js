
// =========================================================================
// SECTION 1: DATA SETUP
// =========================================================================

// --- General Info ---
const pageTitle = ' | Portfolio';
const heroName = '';

// --- Array of Titles ---
const heroTitles = [
   'Full Stack Web Developer', 'React & Next.js Enthusiast',
    'Responsive Design Expert',' JavaScript Developer'
];

// --- Asset URLs ---
const heroImageURL = ''; 
const heroCV_URL = '#'; 
const heroCTAButtonLink = '#projects';

// --- About Me Section Data ---
const aboutImageURL = '';
const aboutHeading = 'About Me';
const aboutText = '';

const aboutDetails = [
    { 
        type: 'list', 
        title: 'Core Technologies ',
        items: [
           'React',
           'Next.js',
           'Node.js',
           'Express',
        ]
    },
    {
        type: 'qa',
        question: 'What drives you as a Full Stack Developer?',
        answer: 'I am driven by the challenge of building complete web applications where the front-end and back-end work together harmoniously to deliver value and functionality.'
    }
];

// --- EXPANDED: Skills data with Backend, Data Science, and Mobile ---
const skillsData = [];

// Services data array
const servicesData = [];

// Projects data
const projectsData = [{"id":1,"title":"","subtitle":"","description":"","image":"","thumbnail":"","technologies":[],"demoUrl":"#","codeUrl":"#","status":"Completed"}];

// Contact data
const contactData = {"email":"","phone":"","location":"","socialLinks":{"github":"#","linkedin":"#","twitter":"#","instagram":"#"}};

// =========================================================================
// SECTION 2: DYNAMIC EFFECT FUNCTIONS
// =========================================================================

/**
 * Creates the orbiting effect around the hero image.
 */
function createOrbitEffect() {
    const imageContainer = document.querySelector('.hero-image-container');
    
    for (let i = 0; i < 2; i++) {
        const orbit = document.createElement('div');
        orbit.className = 'orbit-container';
        
        const scale = 1 + (i * 0.3);
        orbit.style.transform = `scale(${scale})`;
        orbit.style.animationDuration = (15 + i * 10) + 's';
        orbit.style.animationDirection = i % 2 === 0 ? 'normal' : 'reverse';
        
        const dot = document.createElement('div');
        dot.className = 'orbit-dot';
        orbit.appendChild(dot);
        
        imageContainer.appendChild(orbit);
    }
}

/**
 * Creates the floating pulse animations in the background.
 */
function createGridPulseEffect() {
    const gridContainer = document.getElementById('hero-animated-background');
    const pulseCount = 15; 

    for (let i = 0; i < pulseCount; i++) {
        const pulse = document.createElement('div');
        pulse.className = 'grid-pulse';

        const xPosition = Math.random() * 100;
        const yPosition = Math.random() * 100;

        // Short animation delay (0-3s) to ensure the effect starts quickly.
        const animationDelay = Math.random() * 3; 
        const animationDuration = Math.random() * 5 + 4;

        pulse.style.left = `${xPosition}%`;
        pulse.style.top = `${yPosition}%`;
        pulse.style.animationDelay = `${animationDelay}s`;
        pulse.style.animationDuration = `${animationDuration}s`;

        gridContainer.appendChild(pulse);
    }
}

/**
 * Initializes the typing/erasing effect for an array of titles.
 * @param {string[]} titles - The array of strings to cycle through.
 */
function initTypingEffect(titles) {
    const heroTitle = document.getElementById('hero-title');
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const pauseTime = 2000;
    
    let titleIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    
    function typeEffect() {
        if (isTyping) {
            if (charIndex < titles[titleIndex].length) {
                heroTitle.textContent = titles[titleIndex].substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeEffect, typingSpeed);
            } else {
                isTyping = false;
                setTimeout(typeEffect, pauseTime);
            }
        } else {
            if (charIndex > 0) {
                heroTitle.textContent = titles[titleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeEffect, erasingSpeed);
            } else {
                isTyping = true;
                titleIndex = (titleIndex + 1) % titles.length; // Loop through titles
                setTimeout(typeEffect, pauseTime / 2);
            }
        }
    }
    
    // Start the effect after a brief delay
    setTimeout(typeEffect, 2000);
}

function initScrollAnimations() {
    const heroSection = document.getElementById('hero');
    const nav = document.getElementById('main-nav');
    
    // --- ADDED: Logic for Active Nav Link on Scroll ---
    const navLinks = document.querySelectorAll('#main-nav a');
    const sections = document.querySelectorAll('section[id]');
    
    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active-link'));
        
        // Ensure the link exists before trying to add a class to it
        if(navLinks[index]) {
            navLinks[index].classList.add('active-link');
        }
    }
    // Set initial state on page load
    changeLinkState();

    // --- Existing Sticky Nav and Hero Fade Logic ---
    const stickyPoint = heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
        // --- Hero Fade Effect ---
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        if (heroHeight > 0) {
            const opacity = 1 - (scrollPosition / heroHeight * 1.5);
            heroSection.style.opacity = Math.max(0, opacity).toString();
        }

        // --- Sticky Navigation Logic ---
        if (window.scrollY >= stickyPoint) {
            nav.classList.add('sticky-nav');
        } else {
            nav.classList.remove('sticky-nav');
        }
        
        // --- Call function to update active link ---
        changeLinkState();
    });
}

function initScrollTriggers() {
    // Select all elements that should be animated
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // If there are no elements to animate, do nothing
    if (!animatedElements.length) return;

    // Create a new observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting the viewport
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS animation
                entry.target.classList.add('visible');
                // Stop observing this element since the animation only needs to happen once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    // Tell the observer to watch each of the animated elements
    animatedElements.forEach(el => observer.observe(el));
}

// =========================================================================
// SECTION 3: MAIN SCRIPT EXECUTION
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate HTML elements with data
    document.getElementById('page-title').textContent = pageTitle;
    document.getElementById('hero-name').textContent = heroName;
    const heroTitleElement = document.getElementById('hero-title');
    if (heroTitles.length > 0) {
        heroTitleElement.textContent = heroTitles[0];
    }
    const heroImage = document.getElementById('hero-image');
    if (heroImage) heroImage.src = heroImageURL;
    const ctaButton = document.getElementById('hero-cta-button');
    if (ctaButton) ctaButton.href = heroCTAButtonLink;
    const cvButton = document.getElementById('hero-cv-button');
    if (cvButton) {
        cvButton.href = heroCV_URL;
        cvButton.target = '_blank';
    }

    // About Me section
    document.getElementById('about-image').src = aboutImageURL;
    document.getElementById('about-heading').textContent = aboutHeading;
    document.getElementById('about-text').textContent = aboutText;
    
    const detailsContainer = document.getElementById('about-details-container');
    if (detailsContainer && aboutDetails.length > 0) {
        detailsContainer.innerHTML = '';
        aboutDetails.forEach(item => {
            if (item.type === 'qa') {
                const qaItem = document.createElement('div');
                qaItem.className = 'qa-item';
                qaItem.innerHTML = `
                    <div class="qa-question">${item.question}</div>
                    <div class="qa-answer">${item.answer}</div>
                `;
                detailsContainer.appendChild(qaItem);
            } else if (item.type === 'list' && item.items.length > 0) {
                const listSection = document.createElement('div');
                listSection.className = 'list-section';
                
                const listTitle = document.createElement('div');
                listTitle.className = 'list-title';
                listTitle.textContent = item.title;
                
                const skillsList = document.createElement('ul');
                skillsList.className = 'skills-list';
                
                item.items.forEach(skill => {
                    const listItem = document.createElement('li');
                    listItem.textContent = skill;
                    skillsList.appendChild(listItem);
                });

                listSection.appendChild(listTitle);
                listSection.appendChild(skillsList);
                detailsContainer.appendChild(listSection);
            }
        });
    }

    // Skills section
    const skillsGridContainer = document.getElementById('skills-grid-container');
    if (skillsGridContainer && skillsData.length > 0) {
        skillsGridContainer.innerHTML = '';
        skillsData.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            const icon = document.createElement('i');
            icon.className = skill.iconClass;
            const title = document.createElement('span');
            title.className = 'skill-card-title';
            title.textContent = skill.name;
            card.appendChild(icon);
            card.appendChild(title);
            skillsGridContainer.appendChild(card);
        });
    }
    
    // Contact section population
    const contactEmail = document.getElementById('contact-email');
    const contactPhone = document.getElementById('contact-phone');
    const contactLocation = document.getElementById('contact-location');
    
    if (contactEmail) contactEmail.textContent = contactData.email || 'your.email@example.com';
    if (contactPhone) contactPhone.textContent = contactData.phone || '+92 XXX XXXXXXX';
    if (contactLocation) contactLocation.textContent = contactData.location || 'Islamabad, Pakistan';
    
    // Social links
    if (contactData.socialLinks) {
        const socialGithub = document.getElementById('social-github');
        const socialLinkedin = document.getElementById('social-linkedin');
        const socialTwitter = document.getElementById('social-twitter');
        const socialInstagram = document.getElementById('social-instagram');
        
        if (socialGithub) socialGithub.href = contactData.socialLinks.github || '#';
        if (socialLinkedin) socialLinkedin.href = contactData.socialLinks.linkedin || '#';
        if (socialTwitter) socialTwitter.href = contactData.socialLinks.twitter || '#';
        if (socialInstagram) socialInstagram.href = contactData.socialLinks.instagram || '#';
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-user-email').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };
            
            // Here you would typically send the form data to your backend
            console.log('Form submitted:', formData);
            
            // Show success message (you can customize this)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Services section
    const servicesContainer = document.getElementById('services-grid-container');
    if (servicesContainer && servicesData.length > 0) {
        servicesContainer.innerHTML = '';
        servicesData.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-icon-container">
                    <i class="${service.icon} service-icon"></i>
                </div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
            `;
            servicesContainer.appendChild(serviceCard);
        });
    }

    // Projects section
    const projectsContainer = document.getElementById('projects-grid-container');
    const previewTitle = document.getElementById('preview-title');
    const previewStatus = document.getElementById('preview-status-text');
    const previewImage = document.getElementById('preview-image');
    const previewDescription = document.getElementById('preview-description-text');
    const previewTechBadges = document.getElementById('preview-tech-badges');
    const previewDemoLink = document.getElementById('preview-demo-link');
    const previewCodeLink = document.getElementById('preview-code-link');
    const projectPreview = document.querySelector('.project-preview');

    if (projectsContainer && projectsData.length > 0) {
        projectsContainer.innerHTML = '';
        projectsData.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-project-id', project.id);
            
            const techTags = project.technologies.slice(0, 3).map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
            
            projectCard.innerHTML = `
                <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-subtitle">${project.subtitle}</p>
                    <div class="project-tech-preview">
                        ${techTags}
                    </div>
                </div>
            `;
            
            projectCard.addEventListener('mouseenter', () => {
                // Remove active class from all cards
                document.querySelectorAll('.project-card').forEach(card => 
                    card.classList.remove('active')
                );
                // Add active class to current card
                projectCard.classList.add('active');
                
                // Update preview panel
                previewTitle.textContent = project.title;
                previewStatus.textContent = project.status;
                previewImage.src = project.image;
                previewDescription.textContent = project.description;
                previewDemoLink.href = project.demoUrl;
                previewCodeLink.href = project.codeUrl;
                
                // Update tech badges
                previewTechBadges.innerHTML = '';
                project.technologies.forEach(tech => {
                    const badge = document.createElement('span');
                    badge.className = 'tech-badge';
                    badge.textContent = tech;
                    previewTechBadges.appendChild(badge);
                });
                
                // Add active class to preview panel
                projectPreview.classList.add('active');
            });
            
            projectsContainer.appendChild(projectCard);
        });
        
        // Set default preview (first project)
        if (projectsData.length > 0) {
            const firstProject = projectsData[0];
            previewTitle.textContent = firstProject.title;
            previewStatus.textContent = firstProject.status;
            previewImage.src = firstProject.image;
            previewDescription.textContent = firstProject.description;
            previewDemoLink.href = firstProject.demoUrl;
            previewCodeLink.href = firstProject.codeUrl;
            
            previewTechBadges.innerHTML = '';
            firstProject.technologies.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'tech-badge';
                badge.textContent = tech;
                previewTechBadges.appendChild(badge);
            });
        }
    }

    // Populate footer elements
    const footerBrandName = document.getElementById('footer-brand-name');
    const footerEmail = document.getElementById('footer-email');
    const footerLocation = document.getElementById('footer-location');
    const footerCurrentYear = document.getElementById('footer-current-year');
    const footerCopyrightName = document.getElementById('footer-copyright-name');
    
    if (footerBrandName) footerBrandName.textContent = heroName;
    if (footerEmail) footerEmail.textContent = contactData.email || 'onedaysuccussfull@gmail.com';
    if (footerLocation) footerLocation.textContent = contactData.location || 'Faislabad, Pakistan';
    if (footerCurrentYear) footerCurrentYear.textContent = new Date().getFullYear();
    if (footerCopyrightName) footerCopyrightName.textContent = heroName;
    
    // Social links
    if (contactData.socialLinks) {
        const footerSocialGithub = document.getElementById('footer-social-github');
        const footerSocialLinkedin = document.getElementById('footer-social-linkedin');
        const footerSocialTwitter = document.getElementById('footer-social-twitter');
        const footerSocialInstagram = document.getElementById('footer-social-instagram');
        const footerGithubLink = document.getElementById('footer-github-link');
        const footerResumeLink = document.getElementById('footer-resume-link');
        
        if (footerSocialGithub) footerSocialGithub.href = contactData.socialLinks.github || '#';
        if (footerSocialLinkedin) footerSocialLinkedin.href = contactData.socialLinks.linkedin || '#';
        if (footerSocialTwitter) footerSocialTwitter.href = contactData.socialLinks.twitter || '#';
        if (footerSocialInstagram) footerSocialInstagram.href = contactData.socialLinks.instagram || '#';
        if (footerGithubLink) footerGithubLink.href = contactData.socialLinks.github || '#';
        if (footerResumeLink) footerResumeLink.href = heroCV_URL;
    }

    // 2. Initialize all dynamic visual effects
    setTimeout(() => {
        createOrbitEffect();
        createGridPulseEffect();
    }, 100);

    // 3. Trigger entrance animations
    const elementsToAnimate = [
        document.querySelector('.hero-text-content'),
        document.querySelector('.hero-image-container')
    ];
    elementsToAnimate.forEach((el, index) => {
        if (el) {
            setTimeout(() => {
                el.classList.add('show');
            }, 300 * (index + 1));
        }
    });

    // 4. Start typing effect after other animations
    setTimeout(() => {
        if (heroTitles.length > 0) {
            initTypingEffect(heroTitles);
        }
    }, 1500);
    
    // 5. Initialize scroll animations
    initScrollAnimations();
    initScrollTriggers(); 
    
    // 6. Initialize service worker if available
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});