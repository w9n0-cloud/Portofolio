// CV Page specific scripts

// Initialize particles with lighter config for CV page
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to skill dots
    const skillDots = document.querySelectorAll('.skill-dots');
    
    const animateDots = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dots = entry.target.querySelectorAll('.dot.filled');
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            dot.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 100);
                });
            }
        });
    };

    const dotsObserver = new IntersectionObserver(animateDots, {
        threshold: 0.5
    });

    skillDots.forEach(dots => dotsObserver.observe(dots));

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item-cv');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 200));
    });

    // Animate competence cards
    const competenceCards = document.querySelectorAll('.competence-card');
    
    competenceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 150));
    });

    // Download CV as PDF (using print functionality)
    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #6c5ce7, #a29bfe);
                padding: 30px 50px;
                border-radius: 20px;
                text-align: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
                box-shadow: 0 20px 60px rgba(108, 92, 231, 0.4);
            `;
            notification.innerHTML = `
                <i class="fas fa-info-circle" style="font-size: 2.5rem; margin-bottom: 15px; display: block;"></i>
                <h3 style="margin-bottom: 10px;">Génération du PDF</h3>
                <p>Utilisez Ctrl+P ou le bouton Imprimer<br>et sélectionnez "Enregistrer en PDF"</p>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    notification.remove();
                    window.print();
                }, 300);
            }, 2000);
        });
    }

    // Add hover effects to hobby items
    const hobbyItems = document.querySelectorAll('.hobby-item');
    
    hobbyItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'rotate(360deg) scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });

    // Add typing effect to CV name
    const cvName = document.querySelector('.cv-name');
    if (cvName) {
        const originalText = cvName.textContent;
        cvName.textContent = '';
        
        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                cvName.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 80);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Counter animation for any numbers on the page
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Parallax effect on scroll for CV header
window.addEventListener('scroll', () => {
    const cvHeader = document.querySelector('.cv-header');
    if (cvHeader) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        cvHeader.style.backgroundPosition = `center ${rate}px`;
    }
});
