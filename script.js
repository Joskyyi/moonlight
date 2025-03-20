document.addEventListener('DOMContentLoaded', function() {
    // Анимация для плавного появления элементов
    animateOnScroll();
    
    // Плавный скролл для ссылок навигации
    setupSmoothScroll();
    
    // Анимированные числа для счетчика скачиваний
    animateNumbers();
    
    // Анимация для кнопки скачивания
    animateDownloadButton();
});

// Функция для анимации элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .download-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    document.addEventListener('scroll', () => {
        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// Проверка, видим ли элемент в области просмотра
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Настройка плавного скролла для ссылок навигации
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимация чисел для счетчика загрузок
function animateNumbers() {
    const downloadCountEl = document.querySelector('.downloads span');
    if (!downloadCountEl) return;
    
    const targetNumber = 9000;
    let currentNumber = 0;
    const duration = 2000; // 2 секунды
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = targetNumber / steps;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(counter);
        }
        
        downloadCountEl.textContent = `${Math.floor(currentNumber).toLocaleString()}+ скачиваний`;
    }, stepTime);
}

// Анимация для кнопки скачивания
function animateDownloadButton() {
    const downloadBtn = document.querySelector('.btn-download');
    if (!downloadBtn) return;
    
    // Базовая пульсация
    setInterval(() => {
        downloadBtn.classList.add('pulse-animation');
        
        setTimeout(() => {
            downloadBtn.classList.remove('pulse-animation');
        }, 1000);
    }, 3000);
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-download {
            0% {
                box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
                transform: scale(1);
            }
            50% {
                box-shadow: 0 5px 25px rgba(0, 196, 255, 0.7);
                transform: scale(1.05);
            }
            100% {
                box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
                transform: scale(1);
            }
        }
        
        .pulse-animation {
            animation: pulse-download 1s ease;
        }
    `;
    document.head.appendChild(style);
}

// Создание директории для изображений если в ней есть потребность
function createDummyImagesInConsole() {
    console.log('Создайте директорию "images" и добавьте следующие изображения:');
    console.log('1. hero-bg.jpg - изображение для фона шапки');
    console.log('2. menu-1.jpg, menu-2.jpg, menu-3.jpg - скриншоты меню чита');
    console.log('3. gameplay-1.jpg, gameplay-2.jpg, gameplay-3.jpg - скриншоты геймплея с читом');
} 