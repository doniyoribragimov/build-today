jQuery(document).ready(function ($) {
    // ДЛЯ DISABLED КНОПКИ, ЕСЛИ ЧЕКБОКС В ФОРМЕ НЕ CHECKED
    $('.form__confirm input').click(function () {
        var isChecked = $(this).prop('checked');
        var $submitButton = $(this).closest('.form').find('button[type="submit"]');
        $submitButton.prop('disabled', !isChecked);
    });

    var $trustInner = $('.trust__inner');
    var $items = $('.trust__item');

    var layout = [3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3];
    var startIndex = 0;

    layout.forEach(function (columns) {
        var endIndex = startIndex + columns;
        $items.slice(startIndex, endIndex).wrapAll('<div class="grid-row" style="display: grid; grid-template-columns: repeat(' + columns + ', 1fr); grid-gap: 10px;"></div>');
        startIndex = endIndex;
    });

    // ДЛЯ ОТКРЫТИЯ МОДАЛКИ
    function openModalOrMenu(trigger, targetSelector) {
        $(trigger).addClass('active');
        $('body').css('overflow-y', 'hidden');
        $(targetSelector).on('click', function (e) {
            if (e.target === this) {
                $(this).removeClass('active');
                $('body').css('overflow-y', 'initial');
            }
        });
    }
    let currentStep = 1;
    const totalSteps = $(".stages__step").length;

    $(".stages__step:first-child").addClass("active");
    $(".stages__step .btnNext").on("click", function (e) {
        e.preventDefault();

        if (currentStep < totalSteps) {
            $(".stages__step").eq(currentStep - 1).removeClass("active");
            currentStep++;

            $(".stages__step").eq(currentStep - 1).addClass("active");
        }
    });

    $(".btnPrev").on("click", function (e) {
        e.preventDefault();

        if (currentStep > 1) {
            $(".stages__step").eq(currentStep - 1).removeClass("active");
            currentStep--;
            $(".stages__step").eq(currentStep - 1).addClass("active");
        }
    });

    // ДЛЯ ЗАКРЫТИЯ МОДАЛКИ, КОГДА ПРОКЛИКАНО ЗА ПРЕДЕЛЫ МОДАЛКИ
    function closeModalOrMenu(trigger) {
        $(trigger).removeClass('active');
        $('body').css('overflow-y', 'initial');
    }

    // ДЛЯ ВЫБОРА HREF ДЛЯ МОДАЛКИ
    $('a.getModal').on('click', function (e) {
        e.preventDefault();
        let triggerHref = $(this).attr('href');
        openModalOrMenu(triggerHref, triggerHref);
    });

    // ДЛЯ ЗАКРЫТИЯ МОДАЛКИ
    $('.modal__close').on('click', function () {
        closeModalOrMenu($(this).parents('.modal'));
    });

    $('.vacancies__close').on('click', function () {
        closeModalOrMenu($(this).parents('.vacancies'));
    });

    // ДЛЯ ЗАКРЫТИЯ МОБИЛЬНОГО МЕНЮ
    $('.mobile-menu__close, .mobile-menu, .mobile-menu a').on('click', function () {
        closeModalOrMenu($(this).parents('.mobile-menu'));
    });

    // toggler ДЛЯ АККОРДИОНА
    $('.accordion__item').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active')
    })

    $('.company__item').on('click', function (e) {
        e.preventDefault();
        $('.company__item').removeClass('active')
        $(this).addClass('active')
    })

    let trustCheck = window.matchMedia("(max-width: 768px)");
    checkMedia(trustCheck);
    trustCheck.addListener(checkMedia);

    function checkMedia(trustCheck) {
        if (trustCheck.matches) {
            $('.trust__item').unwrap('.grid-row')
        } else {
        }
    }
    checkMedia(trustCheck);

});

// МАСКА ДЛЯ ТЕЛЕФОНА В input[type='tel']
let maskedPhones = document.querySelectorAll("input[type='tel']");
for (var i = 0; i < maskedPhones.length; i++) {
    new IMask(maskedPhones[i], {
        mask: '+{7} (000) 000-00-00',
        placeholder: {
            show: 'always'
        }
    });
}


// ДЛЯ ЗАКРЫТИЯ МОДАЛКИ, КОГДА ПРОКЛИКАНО ЗА ПРЕДЕЛЫ МОДАЛКИ - УНИВЕРСАЛЬНЫЙ
let body = document.querySelector('body')
function closeModal(modalName, reverse = false) {
    modalName = document.querySelector(modalName)
    window.addEventListener('click', function (e) {
        if (reverse) {
            if (e.target === modalName) {
                modalName.classList.remove('active')
                body.style.overflowY = 'initial'

            }
        } else {
            if (e.target !== modalName) {
                modalName.classList.remove('active')
                body.style.overflowY = 'initial'

            }
        }

    })
}
closeModal('.modal', true)
closeModal('.vacancies', true)
closeModal('.mobile-menu', true)


// ДЛЯ ОТОБРАЖЕНИЯ КАРТЫ
function init() {
    let myMap = new ymaps.Map('map', {
        center: [55.777910, 37.732054],
        zoom: 18,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });
    myplacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.777910, 37.732054]
        },
        properties: {
            hintContent: 'Кирпичная улица, Москва'
        }
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');
    myMap.controls.add('rulerControl', {
        scaleLine: false
    });
    myMap.geoObjects.add(myplacemark);
}

document.addEventListener('DOMContentLoaded', function () {
    let mapElement = document.getElementById('map');

    let observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                ymaps.ready(init);
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1
    });

    if (mapElement) {
        observer.observe(mapElement);
    }
});

function inits() {
    let myMap = new ymaps.Map('contactMap', {
        center: [55.777910, 37.732054],
        zoom: 18,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });
    myplacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.777910, 37.732054]
        },
        properties: {
            hintContent: 'Кирпичная улица, Москва'
        }
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');
    myMap.controls.add('rulerControl', {
        scaleLine: false
    });
    myMap.geoObjects.add(myplacemark);
}

document.addEventListener('DOMContentLoaded', function () {
    let mapElement = document.getElementById('contactMap');

    let observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                ymaps.ready(inits);
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1
    });

    if (mapElement) {
        observer.observe(mapElement);
    }
});

AOS.init({disable: 'mobile'});


const toolsSlider = new Swiper('.tools__slider', {
    loop: false,
    spaceBetween: 20,
    slidesPerView: 3.5,
    breakpoints: {
        0: {
            slidesPerView: 1.3,
            spaceBetween: 10,
        },

        620: {
            slidesPerView: 2,
        },

        1400: {
            slidesPerView: 3.5,
        },
    }
});