const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    generateBinaryBackground();
});

    function generateBinaryBackground() {
        // Главный фон
        const mainContainer = document.getElementById('binaryBackground');
        if (mainContainer) {
            createBinaryElements(mainContainer, window.innerWidth, window.innerHeight, 4000);
        }

        // Фон для героя
        const heroContainer = document.getElementById('binaryBackgroundHero');
        if (heroContainer) {
            createBinaryElements(heroContainer, heroContainer.offsetWidth, heroContainer.offsetHeight, 5000);
        }

        // Фон для всех секций
        document.querySelectorAll('.section').forEach(section => {
            const existingBg = section.querySelector('.binary-section-background');
            if (!existingBg) {
                const bgContainer = document.createElement('div');
                bgContainer.className = 'binary-section-background';
                section.prepend(bgContainer);
                createBinaryElements(bgContainer, section.offsetWidth, section.offsetHeight, 6000);
            }
        });
    }

    function createBinaryElements(container, width, height, density) {
        if (!container) return;

        container.innerHTML = '';
        const count = Math.floor((width * height) / density);

        for (let i = 0; i < count; i++) {
            const binary = document.createElement('div');
            binary.className = container.id === 'binaryBackgroundHero' ? 'binary-code-hero' : 'binary-code';
            binary.textContent = Math.random() > 0.5 ? '1' : '0';
            binary.style.left = Math.random() * width + 'px';
            binary.style.top = -20 + 'px';
            binary.style.animationDuration = (Math.random() * 20 + 10) + 's';
            binary.style.animationDelay = (Math.random() * 5) + 's';
            binary.style.fontSize = (Math.random() * 6 + (container.id === 'binaryBackgroundHero' ? 14 : 12)) + 'px';
            binary.style.opacity = '0';

            container.appendChild(binary);
        }
    }


document.addEventListener('DOMContentLoaded', () => {
    generateBinaryBackground();
});

const phrases = [
    "> Добро пожаловать на мой сайт!",
    "> Я начинающий специалист",
    "> Специализация: HTML, CSS, JavaScript, Python",
    "> Свяжитесь со мной!"
];
let currentPhrase = 0, currentChar = 0, isDeleting = false;

function typeWriter() {
    const el = document.getElementById('console-text');
    if (!isDeleting && currentChar < phrases[currentPhrase].length) {
        el.textContent += phrases[currentPhrase].charAt(currentChar++);
        setTimeout(typeWriter, 100);
    } else if (isDeleting && currentChar > 0) {
        el.textContent = phrases[currentPhrase].substring(0, --currentChar);
        setTimeout(typeWriter, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(typeWriter, isDeleting ? 1500 : 500);
    }
}

function updateSectionBackgrounds() {
        const isDarkMode = document.body.classList.contains('dark-mode');

        if (isDarkMode) {
            // Добавляем дополнительные эффекты для темного режима
            document.querySelectorAll('.section').forEach(section => {
                if (!section.querySelector('.binary-section-background')) {
                    const bg = document.createElement('div');
                    bg.className = 'binary-section-background';
                    section.prepend(bg);
                    createBinaryElements(bg, section.offsetWidth, section.offsetHeight, 7000);
                }
            });
        } else {
            // Удаляем дополнительные фоны в светлом режиме
            document.querySelectorAll('.binary-section-background').forEach(el => el.remove());
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        updateSectionBackgrounds();
    });

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(typeWriter, 100);
});