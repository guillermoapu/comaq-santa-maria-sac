const scrollTopButton = document.querySelector('.scroll-top');

if (scrollTopButton) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateScrollTopVisibility = () => {
        scrollTopButton.classList.toggle('is-visible', window.scrollY > 400);
    };

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? 'auto' : 'smooth'
        });
    });

    window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
    updateScrollTopVisibility();
}
