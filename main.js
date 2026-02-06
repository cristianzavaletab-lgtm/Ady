// —————————————————————————————————————————————
// ROSA & VINO - Detalle Digital Premium
// Hecho con amor y dedicación 🌸💕
// —————————————————————————————————————————————

// Elementos del DOM
const sections = document.querySelectorAll('.section');
const startBtn = document.getElementById('startBtn');
const finalBtn = document.getElementById('finalBtn');
const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const progressBar = document.querySelector('.progress-bar');

let currentScreenIndex = 0;
let isMusicPlaying = false;

// —————————————————————————————————————————————
// Sistema de Navegación por Pantallas
// —————————————————————————————————————————————

function updateNavigation() {
    sections.forEach((section, index) => {
        section.classList.remove('current', 'previous');
        if (index === currentScreenIndex) {
            section.classList.add('current');
            // Disparar animaciones de entrada - MÁS RÁPIDO
            const fadeElements = section.querySelectorAll('.fade-in, .scroll-reveal');
            fadeElements.forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), i * 80 + 150); // Reducido de 200/400
            });
        } else if (index < currentScreenIndex) {
            section.classList.add('previous');
        }
    });

    // Actualizar barra de progreso
    if (progressBar) {
        const progress = ((currentScreenIndex) / (sections.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

function nextScreen() {
    if (currentScreenIndex < sections.length - 1) {
        currentScreenIndex++;
        updateNavigation();

        // Efecto especial en cambios específicos
        if (sections[currentScreenIndex].id === 'gallery') {
            createPetalRain();
        }

        // GRAN CELEBRACIÓN FINAL
        if (sections[currentScreenIndex].id === 'farewell') {
            setTimeout(() => {
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        const emojis = ['💖', '🌸', '✨', '🎈', '🐰', '💕'];
                        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                        createParticle(emoji, Math.random() * window.innerWidth, window.innerHeight + 50);
                    }, i * 100);
                }
                // Subir volumen un poco al final para impacto
                if (music) {
                    music.volume = Math.min(music.volume + 0.1, 0.3);
                }
            }, 500);
        }
    }
}

// Inicializar primera pantalla
window.addEventListener('load', () => {
    updateNavigation();
    createFloralDecorations();
    createBackgroundParticles();
});

// —————————————————————————————————————————————
// Botones de Continuación Dinámicos
// —————————————————————————————————————————————

// Añadir botones de "Continuar" a las secciones que no lo tienen (excepto la bienvenida y la última)
sections.forEach((section, index) => {
    // Evitar añadir botones si ya tiene un botón de continuar o el botón final
    const hasButton = section.querySelector('.btn-continue') || section.querySelector('.btn-final');

    if (index > 0 && index < sections.length - 1 && !hasButton) {
        const btnContainer = document.createElement('div');
        btnContainer.style.marginTop = '3rem';
        btnContainer.style.textAlign = 'center';

        const btn = document.createElement('button');
        btn.className = 'btn-continue fade-in';
        btn.textContent = 'Continuar 🌸';
        btn.addEventListener('click', nextScreen);

        btnContainer.appendChild(btn);
        section.querySelector('.content-center, .content-wide').appendChild(btnContainer);
    }
});

// Botón de inicio
if (startBtn) {
    startBtn.addEventListener('click', () => {
        handleMusicStart();
        nextScreen();
    });
}

// Botón final
if (finalBtn) {
    finalBtn.addEventListener('click', nextScreen);
}

// —————————————————————————————————————————————
// Sistema de Música y Audio
// —————————————————————————————————————————————

function handleMusicStart() {
    if (music && !isMusicPlaying) {
        music.volume = 0;
        music.play().then(() => {
            let volume = 0;
            const fadeIn = setInterval(() => {
                if (volume < 0.12) {
                    volume += 0.008;
                    music.volume = Math.min(volume, 0.12);
                } else {
                    clearInterval(fadeIn);
                }
            }, 60);

            isMusicPlaying = true;
            if (musicToggle) {
                musicToggle.innerHTML = '<span class="music-icon">♫</span>';
                musicToggle.style.opacity = '1';
            }
        }).catch(err => console.log('Audio blocked:', err));
    }
}

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicToggle.innerHTML = '<span class="music-icon">♪</span>';
            isMusicPlaying = false;
        } else {
            music.play();
            musicToggle.innerHTML = '<span class="music-icon">♫</span>';
            isMusicPlaying = true;
        }
    });
}

// —————————————————————————————————————————————
// Detalles Especiales: Bunny Binky
// —————————————————————————————————————————————

function bunnyBinky(element) {
    element.style.transition = 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    element.style.transform = 'translateY(-40px) rotate(15deg) scale(1.15)';

    // Partículas de corazón
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 6; i++) {
        createParticle('💕', rect.left + rect.width / 2, rect.top);
    }

    setTimeout(() => {
        element.style.transform = 'translateY(0) rotate(0deg) scale(1)';
    }, 250);
}

// Hacer que los conejos reaccionen al click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('bunny-emoji') || e.target.classList.contains('bunny-icon') || e.target.classList.contains('farewell-bunny')) {
        bunnyBinky(e.target);
    }
});

// Tarjeta Interactiva
const interactiveCard = document.getElementById('interactiveCard');
if (interactiveCard) {
    interactiveCard.addEventListener('click', () => {
        createHeartBurst();
        // Efecto de vibración suave
        interactiveCard.style.animation = 'none';
        setTimeout(() => {
            interactiveCard.style.animation = 'gentleShake 0.4s ease-in-out';
        }, 10);
    });
}

function createHeartBurst() {
    const emojis = ['💕', '🌸', '💗', '🌺', '💖', '🌷'];
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            createParticle(emoji, Math.random() * window.innerWidth, window.innerHeight);
        }, i * 120);
    }
}

// —————————————————————————————————————————————
// Efecto de Partículas de Fondo Magic
// —————————————————————————————————————————————

function createBackgroundParticles() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1';
    document.body.appendChild(container);

    const particles = ['✨', '🎈', '🌸', '🤍'];

    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.textContent = particles[Math.floor(Math.random() * particles.length)];
        p.style.position = 'absolute';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.fontSize = Math.random() * 1 + 0.5 + 'rem';
        p.style.opacity = '0.3';
        p.style.filter = 'blur(1px)';
        p.style.animation = `floatGently ${Math.random() * 10 + 10}s linear infinite`;
        p.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(p);
    }
}

function createFloralDecorations() {
    const emojis = ['🌸', '🌺', '🌷', '🌹'];
    for (let i = 0; i < 6; i++) {
        const floral = document.createElement('div');
        floral.className = 'floral-accent';
        floral.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        floral.style.left = Math.random() * 90 + 5 + '%';
        floral.style.top = Math.random() * 90 + 5 + '%';
        floral.style.fontSize = Math.random() * 2 + 1 + 'rem';
        floral.style.animation = `floatGently ${Math.random() * 3 + 3}s ease-in-out infinite`;
        document.body.appendChild(floral);
    }
}

function createParticle(emoji, x, y) {
    const p = document.createElement('div');
    p.textContent = emoji;
    p.style.position = 'fixed';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.fontSize = '1.5rem';
    p.style.pointerEvents = 'none';
    p.style.zIndex = '1000';
    p.style.transition = 'all 1s ease-out';
    document.body.appendChild(p);

    setTimeout(() => {
        p.style.transform = `translate(${(Math.random() - 0.5) * 200}px, -150px) scale(0) rotate(${Math.random() * 360}deg)`;
        p.style.opacity = '0';
    }, 10);

    setTimeout(() => p.remove(), 1000);
}

function createPetalRain() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const petal = ['🌸', '💖', '✨'][Math.floor(Math.random() * 3)];
            createParticle(petal, Math.random() * window.innerWidth, window.innerHeight + 50);
        }, i * 100);
    }
}

// —————————————————————————————————————————————
// Efecto Tilt para fotos (re-inicializado en cada pantalla)
// —————————————————————————————————————————————
document.addEventListener('mousemove', (e) => {
    const currentSection = sections[currentScreenIndex];
    if (currentSection) {
        const cards = currentSection.querySelectorAll('.photo-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
    }
});

document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.photo-card').forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
