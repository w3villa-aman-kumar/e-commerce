$(document).ready(function() {

    $('#shop-brand-carousel').owlCarousel({
    loop: true,
    autoplay:true,
    margin: 10,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        400: {
            items: 3
        },
        600: {
            items: 4
        },
        800: {
            items: 5
        },
        1000: {
            items: 6
        },
        1200: {
            items: 7
        },
        1400: {
            items: 9
        }
    }
    })
});