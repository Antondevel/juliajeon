// Инициализация AOS (анимations on scroll) для анимаций при прокрутке
document.addEventListener('DOMContentLoaded', () => {
    AOS.init(); // Вызываем только один раз при загрузке страницы
});

// Сброс прокрутки на верх страницы при ее загрузке
window.onload = () => {
    window.scrollTo(0, 0);
};

// Код для навигационного меню с бургером
// Получаем элементы бургер-меню и навигационного списка
// Код для навигационного меню с бургером
const burgerMenu = document.getElementById('burger-menu');
const navList = document.getElementById('nav-list');

// Обработчик клика по бургер-меню
burgerMenu.addEventListener('click', () => {
    // Переключаем классы для анимации
    navList.classList.toggle('active'); // Добавляем/убираем активный класс для меню
    burgerMenu.classList.toggle('open'); // Добавляем/убираем активный класс для бургер-меню
});

// Закрытие меню при клике по ссылкам
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        // Закрываем бургер-меню
        navList.classList.remove('active');
        burgerMenu.classList.remove('open');
    });
});


// Функция для установки активной ссылки в навигации при загрузке страницы
const setActiveLink = () => {
    const hash = window.location.hash || '#header'; // Получаем хэш из URL (по умолчанию '#header')
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active'); // Убираем класс активности у всех ссылок
        if (link.getAttribute('href') === hash) {
            link.classList.add('active'); // Добавляем класс активности к нужной ссылке
        }
    });
};
setActiveLink(); // Устанавливаем активную ссылку при загрузке

// Обработчик для прокрутки по ссылкам (плавная прокрутка)
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Проверяем, является ли это внутренней ссылкой (начинается с #)
        if (targetId.startsWith('#')) {
            e.preventDefault(); // Отменяем стандартное поведение для внутренних ссылок

            // Удаляем класс active у всех ссылок и добавляем только к текущей
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Плавная прокрутка к целевому элементу
            const targetElement = document.querySelector(targetId);
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

            // Высота шапки, если не на главной секции
            const offset = targetId === '#header' ? 300 : 0;

            const offsetPosition = Math.min(
                targetPosition - offset,
                document.documentElement.scrollHeight - window.innerHeight
            );

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Функция для анимации при прокрутке (отображение контента, когда он попадает в видимую область)
const headerContent = document.querySelector('.header-content');
const headerImg = document.querySelector('.header-img');

const showOnScroll = () => {
    const headerRow = document.querySelector('.header-row');
    const { top } = headerRow.getBoundingClientRect(); // Получаем расстояние от верхней части экрана

    // Если элемент виден на экране, добавляем классы для анимации
    if (top < window.innerHeight) {
        headerContent.classList.add('visible');
        headerImg.classList.add('visible');
    }
};

// Добавляем обработчик события прокрутки
window.addEventListener('scroll', showOnScroll);

// Проверяем состояние сразу при загрузке страницы
showOnScroll();

// Аккордеон
function toggleAccordion(item) {
    const content = item.querySelector('.accordion-content');
    const isActive = item.classList.contains('active');

    // Скрытие всех активных элементов
    document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
        activeItem.querySelector('.accordion-content').style.maxHeight = null;
        activeItem.classList.remove('active');
    });

    // Открытие текущего элемента, если он не активен
    if (!isActive) {
        content.style.maxHeight = content.scrollHeight + "px"; // Открытие
        item.classList.add('active');
    }
}

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        toggleAccordion(this.parentElement);
    });
});

// Функция для переключения языка
function switchLanguage(language) {
    const elements = document.querySelectorAll('[data-' + language + ']');
    elements.forEach(el => {
        el.innerHTML = el.getAttribute('data-' + language); // Меняем текст на элементе
    });
}

// Пример: привязка к событию на кнопках смены языка
document.querySelectorAll('.language-switch').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const language = e.target.dataset.language;
        switchLanguage(language);
    });
});

// Слайдер для отзывов
document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const slider = document.querySelector('.clients-slider');
    const items = document.querySelectorAll('.clients__item');
    let scrollPosition = 0;

    // Функция для получения ширины экрана
    function getViewportWidth() {
        return window.innerWidth;
    }

    // Функция для обновления слайдера в зависимости от ширины экрана
    function updateSlider() {
        const itemWidth = items[0].offsetWidth + 30; // Ширина элемента с отступами
        return itemWidth;
    }

    // Обработчики кнопок слайдера
    prevButton.addEventListener('click', function () {
        const itemWidth = updateSlider();
        if (scrollPosition > 0) {
            scrollPosition -= itemWidth;
            slider.style.transform = `translateX(-${scrollPosition}px)`;
        }
    });

    nextButton.addEventListener('click', function () {
        const itemWidth = updateSlider();
        if (scrollPosition < (items.length - 1) * itemWidth) {
            scrollPosition += itemWidth;
            slider.style.transform = `translateX(-${scrollPosition}px)`;
        }
    });

    // Обработчик изменения размера экрана
    window.addEventListener('resize', () => {
        scrollPosition = 0; // Сброс позиции при изменении размера экрана
        slider.style.transform = `translateX(0px)`;
        updateSlider(); // Обновление слайдера
    });
});


