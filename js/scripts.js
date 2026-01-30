/*!
* Start Bootstrap - Creative v7.0.7
* https://startbootstrap.com/theme/creative
* Licensed under MIT
*/

window.addEventListener('DOMContentLoaded', event => {

    /* =========================
       Navbar shrink function
    ========================== */
    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;

        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    /* =========================
       Bootstrap ScrollSpy
    ========================== */
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    /* =========================
       Collapse responsive navbar
    ========================== */
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    /* =========================
       SimpleLightbox (IMAGE ONLY)
       IMPORTANT:
       - Use class .image-popup ONLY
       - Do NOT use .portfolio-box for navigation
    ========================== */
    if (document.querySelector('#portfolio a.image-popup')) {
        new SimpleLightbox({
            elements: '#portfolio a.image-popup'
        });
    }

});
