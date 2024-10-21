// Инициализация AOS
AOS.init();

// Сброс прокрутки на верх страницы при загрузке
window.onload = () => {
    window.scrollTo(0, 0);
};

// Код для навигационного меню
const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');

navBtn.onclick = () => {
    if (nav.classList.toggle('open')) {
        navBtnImg.src = "./img/icons/nav-close.svg";
    } else {
        navBtnImg.src = './img/icons/nav-open.svg';
    }
};


// Открытие/закрытие меню по клику на бургер-кнопку
navBtn.onclick = () => {
    if (nav.classList.toggle('open')) {
        navBtnImg.src = "./img/icons/nav-close.svg"; // Иконка закрытия
    } else {
        navBtnImg.src = './img/icons/nav-open.svg'; // Иконка открытия
    }
};

// Закрытие меню при клике на любую ссылку в меню
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open'); // Убираем класс open для закрытия меню
        navBtnImg.src = './img/icons/nav-open.svg'; // Сброс иконки
    });
});










// Анимация при прокрутке
const headerContent = document.querySelector('.header-content');
const headerImg = document.querySelector('.header-img');

const showOnScroll = () => {
    const headerRow = document.querySelector('.header-row');
    const { top } = headerRow.getBoundingClientRect();

    // Проверяем, виден ли элемент на экране
    if (top < window.innerHeight) {
        headerContent.classList.add('visible');
        headerImg.classList.add('visible');
    }
};

// Добавляем обработчик события прокрутки
window.addEventListener('scroll', showOnScroll);

// Проверяем состояние сразу при загрузке страницы
showOnScroll();

// Установка активной ссылки при загрузке
const setActiveLink = () => {
    const hash = window.location.hash || '#header'; // По умолчанию '#header'
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
};

setActiveLink(); // Устанавливаем активную ссылку при загрузке

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Проверяем, является ли это внешней ссылкой
        if (targetId.startsWith('#')) {
            e.preventDefault(); // Отменяем стандартное поведение для внутренних ссылок

            // Удаляем класс active у всех ссылок
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

            // Добавляем класс active к текущей ссылке
            this.classList.add('active');

            const targetElement = document.querySelector(targetId);
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

            // Учитываем высоту шапки, но не для секции Home
            const offset = targetId === '#header' ? 100 : 0; // Без отступа для Home, иначе -60

            const offsetPosition = Math.min(
                targetPosition - offset,
                document.documentElement.scrollHeight - window.innerHeight
            );

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        // Если это внешняя ссылка, просто переходим по ней
    });
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        const item = this.parentElement;
        const content = item.querySelector('.accordion-content');

        // Если элемент уже активен, скрываем его
        if (item.classList.contains('active')) {
            content.style.maxHeight = null; // Возвращаем в исходное состояние
            item.classList.remove('active');
        } else {
            // Сначала закрываем все активные элементы
            document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                activeItem.querySelector('.accordion-content').style.maxHeight = null;
                activeItem.classList.remove('active');
            });

            // Открываем текущий элемент
            content.style.maxHeight = content.scrollHeight + "px"; // Устанавливаем высоту равную высоте контента
            item.classList.add('active');
        }
    });
});

function switchLanguage(language) {
    const elements = document.querySelectorAll('[data-' + language + ']');
    elements.forEach(el => {
        el.innerHTML = el.getAttribute('data-' + language);
    });
}












