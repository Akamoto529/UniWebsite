(function ($) {

    "use strict";

    // Navbar Area

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 5) {
            $('.header-area').addClass("bg-solid");
        } else {
            $('.header-area').removeClass("bg-solid");
        }
    });


    //js code for mobile menu toggle
    $(".menu-toggle").on("click", function () {
        $(this).toggleClass("is-active");
    });

    // Hero Area
    $('.hero-slider').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        dots: true,
        autoplay: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplayTimeout: 4000,
        smartSpeed: 1500
    });

    // portfolio details
    $('.image-slider').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplayTimeout: 4000,
        smartSpeed: 1500
    });

    //mixItUp
    $('.portfolio-area').mixItUp();

    // Testimonial Area
    $('.testimonials').owlCarousel({
        items: 1,
        loop: true,
        autoplay:true,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: false
    });

   // Sidebar Sticky
   $(".sidebar-sticky").stick_in_parent();

   // Preloader
   $(window).on('load', function () {
        $('.preloader').fadeOut(1000);
    });

})(jQuery);
