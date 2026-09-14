const navToggle = document.querySelector('.nav-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');

if (navToggle && primaryNavigation) {
    const closeNavigation = () => {
        primaryNavigation.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    };

    const toggleNavigation = () => {
        const isOpen = primaryNavigation.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute(
            'aria-label',
            isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
        );
    };

    navToggle.addEventListener('click', toggleNavigation);

    primaryNavigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeNavigation);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNavigation();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeNavigation();
        }
    });
}

const navbar = document.querySelector('.navbar');

if (navbar) {
    let isScrollUpdateScheduled = false;

    const updateNavbarOnScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        isScrollUpdateScheduled = false;
    };

    const handleNavbarScroll = () => {
        if (!isScrollUpdateScheduled) {
            window.requestAnimationFrame(updateNavbarOnScroll);
            isScrollUpdateScheduled = true;
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    updateNavbarOnScroll();
}
