// ================= COMMON + HOME PAGE JAVASCRIPT =================

document.addEventListener("DOMContentLoaded", () => {
    // Highlight the current main navigation item.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".header nav a").forEach(link => {
        const linkPage = link.getAttribute("href")?.split("#")[0];
        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Fade sections in when they enter the viewport.
    const fadeElements = document.querySelectorAll(".fade-in");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        fadeElements.forEach(element => observer.observe(element));
    } else {
        fadeElements.forEach(element => element.classList.add("show"));
    }

    // Home page: culture image carousels.
    setupImageCarousel(".culture-carousel1 img", 3000);
    setupImageCarousel(".culture-carousel2 img", 3000);

    // Home page: destination card slider.
    setupDestinationSlider();
});

function setupImageCarousel(selector, intervalMs) {
    const images = Array.from(document.querySelectorAll(selector));
    if (images.length < 2) return;

    let currentIndex = Math.max(0, images.findIndex(image => image.classList.contains("active")));
    images.forEach((image, index) => image.classList.toggle("active", index === currentIndex));

    window.setInterval(() => {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
    }, intervalMs);
}

function setupDestinationSlider() {
    const slider = document.getElementById("destinationSlider");
    if (!slider || slider.children.length === 0) return;

    const cards = Array.from(slider.children);
    let currentIndex = 0;
    let timerId;

    const visibleCardCount = () => {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 992) return 2;
        return 4;
    };

    const updateSlider = () => {
        const visibleCards = visibleCardCount();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = Math.min(currentIndex, maxIndex);

        const gap = parseFloat(getComputedStyle(slider).gap) || 0;
        const cardWidth = cards[0].getBoundingClientRect().width;
        slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    };

    const moveToNext = () => {
        const maxIndex = Math.max(0, cards.length - visibleCardCount());
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateSlider();
    };

    const startSlider = () => {
        if (timerId) window.clearInterval(timerId);
        if (cards.length > visibleCardCount()) {
            timerId = window.setInterval(moveToNext, 3000);
        }
    };

    updateSlider();
    startSlider();

    window.addEventListener("resize", () => {
        currentIndex = 0;
        updateSlider();
        startSlider();
    });
}
