const reveals = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("reveal-ready");

function revealSection(){

    reveals.forEach(section=>{

        const top = section.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if(top < windowHeight - 120){

            section.classList.add("active");

        }

    });

}

if (prefersReducedMotion) {

    reveals.forEach(section => section.classList.add("active"));

} else {

    window.addEventListener("scroll", revealSection, { passive: true });

    revealSection();

}
