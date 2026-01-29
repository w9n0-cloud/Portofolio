// Projects page specific scripts

document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-showcase-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = `cardAppear 0.6s ease forwards`;
                    card.style.animationDelay = `${index * 0.1}s`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Project card 3D tilt effect
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Animate project icons on scroll
    const projectImages = document.querySelectorAll('.project-showcase-image');
    
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('.project-icon-large');
                if (icon) {
                    icon.style.animation = 'iconPulse 2s ease-in-out infinite';
                }
            }
        });
    }, { threshold: 0.3 });

    projectImages.forEach(img => iconObserver.observe(img));

    // Add icon pulse animation
    const iconStyle = document.createElement('style');
    iconStyle.textContent = `
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(iconStyle);

    // Parallax effect on hero
    const heroSection = document.querySelector('.projects-hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroSection && scrolled < heroSection.offsetHeight) {
            heroSection.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });

    // Tech tag hover sound effect (visual feedback)
    const techTags = document.querySelectorAll('.project-tech span');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1) translateY(-3px)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Status badge animation
    const statusBadges = document.querySelectorAll('.status-badge');
    
    statusBadges.forEach(badge => {
        if (badge.classList.contains('in-progress')) {
            badge.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(253, 203, 110, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(253, 203, 110, 0); }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Scroll reveal for cards
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        revealObserver.observe(card);
    });
});

// Counter for project stats (if needed in future)
function countProjects() {
    const total = document.querySelectorAll('.project-showcase-card').length;
    const completed = document.querySelectorAll('.status-badge.completed').length;
    const inProgress = document.querySelectorAll('.status-badge.in-progress').length;
    
    console.log(`📊 Statistiques des projets:`);
    console.log(`   Total: ${total}`);
    console.log(`   Terminés: ${completed}`);
    console.log(`   En cours: ${inProgress}`);
    
    return { total, completed, inProgress };
}

// Call on load
countProjects();
