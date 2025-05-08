const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    generateBinaryBackground();
    updateBackgroundImages(); // Обновляем все фоновые изображения
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
    updateBackgroundImage(); // Добавьте этот вызов
    typeWriter();
});

const phrases = [
    "> Добро пожаловать на мой сайт!",
    "> Я начинающий разработчик",
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


function showAlert(message, type) {
  // Создаём уведомление на основе Bootstrap
  const alert = document.createElement('div');
  alert.className = `alert alert-${type === 'success' ? 'info' : 'danger'} alert-dismissible fade show alert-custom`;

  // Иконка (используем Bootstrap Icons)
  const icon = document.createElement('i');
  icon.className = `bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'} me-2`;

  // Кнопка закрытия
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn-close';
  closeBtn.setAttribute('data-bs-dismiss', 'alert');

  // Собираем структуру
  alert.innerHTML = `
    <div class="d-flex align-items-center">
      ${icon.outerHTML}
      <span>${message}</span>
    </div>
  `;
  alert.appendChild(closeBtn);

  document.body.appendChild(alert);

  // Автоматическое закрытие через 4 секунды
  setTimeout(() => {
    const bsAlert = new bootstrap.Alert(alert);
    bsAlert.close();
  }, 4000);

  // Плавное появление тени
  setTimeout(() => {
    alert.style.boxShadow = '0 4px 25px rgba(13, 110, 253, 0.4)';
  }, 300);
}

// Обработчик формы
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');

  if (!form) {
    console.error('Форма не найдена! Проверьте ID элемента.');
    return;
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Отправка...';
    btn.disabled = true;

    try {
      const formData = new FormData(this);
      const message = `📩 Новое сообщение:\nИмя: ${formData.get('name')}\nEmail: ${formData.get('email')}\nТема: ${formData.get('subject')}\nСообщение: ${formData.get('message')}`;

      const response = await fetch(`https://api.telegram.org/bot7033810563:AAHWtMK-HY3Ht01cHMlucZtZ5--1E15F-R8/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '991168173',
          text: message,
          parse_mode: 'Markdown'
        })
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.description || 'Не удалось отправить сообщение');
      }

      showAlert('✅ Сообщение успешно отправлено!', 'success');
      this.reset();

    } catch (error) {
      console.error('Ошибка:', error);
      showAlert(`❌ ${error.message}`, 'error');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
});

// Обновите функцию updateBackgroundImage
function updateBackgroundImages() {
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Для hero-секции
    const lightBg = document.querySelector('.light-bg');
    const darkBg = document.querySelector('.dark-bg');

    // Для skills-секции
    const skillsLightBg = document.querySelector('.skills-light-bg');
    const skillsDarkBg = document.querySelector('.skills-dark-bg');

    if (isDarkMode) {
        if (lightBg) lightBg.style.display = 'none';
        if (darkBg) darkBg.style.display = 'block';
        if (skillsLightBg) skillsLightBg.style.display = 'none';
        if (skillsDarkBg) skillsDarkBg.style.display = 'block';
    } else {
        if (lightBg) lightBg.style.display = 'block';
        if (darkBg) darkBg.style.display = 'none';
        if (skillsLightBg) skillsLightBg.style.display = 'block';
        if (skillsDarkBg) skillsDarkBg.style.display = 'none';
    }
}

