// ================= HOME PAGE AND COMMON JS =================
//image slider in the culture part
    const cultureImages = document.querySelectorAll(".culture-carousel1 img");
    const cultureImages2 = document.querySelectorAll(".culture-carousel2 img");
    let cultureIndex = 0;
    let cultureIndex2 = 0;

    function changeCultureImage() {
        cultureImages[cultureIndex].classList.remove("active");
        cultureIndex = (cultureIndex + 1) % cultureImages.length;
        cultureImages[cultureIndex].classList.add("active");
    }

    function changeCultureImage2() {
        cultureImages2[cultureIndex2].classList.remove("active");
        cultureIndex2 = (cultureIndex2 + 1) % cultureImages2.length;
        cultureImages2[cultureIndex2].classList.add("active");
    }

    //timer to swap the images
    if (cultureImages.length > 0) {
        setInterval(changeCultureImage, 3000);
    }
    if (cultureImages2.length > 0) {
        setInterval(changeCultureImage2, 3000);
    }

    //cards slider in the destinations section
    const slider = document.getElementById("destinationSlider");
    const cards = slider.children;
    const visibleCards = 4;
    let index = 0;

    function slideDestinations() {
        index++;

        if (index > cards.length - visibleCards) {
            index = 0;
        }

        const cardWidth = cards[0].offsetWidth + 30;
        slider.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    //timer to swap the cards
    if (slider) {
        setInterval(slideDestinations, 3000);
    }


    //fade in for all the sections
    const fadeElements = document.querySelectorAll(".fade-in");

    const fadeInOnScroll = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight - 100) {
                el.classList.add("show");
            }
        });
    };

    window.addEventListener("scroll", fadeInOnScroll);
    window.addEventListener("load", fadeInOnScroll);