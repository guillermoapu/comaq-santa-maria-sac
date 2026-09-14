const statsSection = document.querySelector('.stats');

if (statsSection) {
    const counterElements = statsSection.querySelectorAll('.stat-item h3');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let hasAnimatedCounters = false;

    const animateCounter = (element) => {
        const finalValue = element.textContent.trim();
        const valueMatch = finalValue.match(/^(\d+(?:[.,]\d+)?)(.*)$/);

        if (!valueMatch) {
            return;
        }

        const target = Number(valueMatch[1].replace(',', '.'));
        const suffix = valueMatch[2];
        const decimalPlaces = (valueMatch[1].split(/[.,]/)[1] || '').length;
        const duration = 1400;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentValue = target * progress;
            const displayedValue = decimalPlaces > 0
                ? currentValue.toFixed(decimalPlaces)
                : Math.floor(currentValue).toString();

            element.textContent = `${displayedValue}${suffix}`;

            if (progress < 1) {
                window.requestAnimationFrame(updateCounter);
            } else {
                element.textContent = finalValue;
            }
        };

        window.requestAnimationFrame(updateCounter);
    };

    const startCounters = () => {
        if (hasAnimatedCounters) {
            return;
        }

        hasAnimatedCounters = true;

        counterElements.forEach((element) => {
            if (reducedMotion) {
                return;
            }

            animateCounter(element);
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                startCounters();
                observer.disconnect();
            }
        }, { threshold: 0.25 });

        observer.observe(statsSection);
    } else {
        startCounters();
    }
}
