$(document).ready(function () {
    // Inicializa el slider con Slick Carousel
    $('#image-slider').slick({
        arrows: true, // Muestra las flechas de navegación
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="custom-prev-arrow"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="custom-next-arrow"><i class="fas fa-chevron-right"></i></button>'
    });

    // Redirección al hacer clic en las imágenes del slider
    $('.slider-item').click(function () {
        var href = $(this).data('href');
        if (href) {
            window.location.href = href;
        }
    });
});
