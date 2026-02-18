// ================= DESTINATIONS PAGE JS =================
    const searchInput = document.getElementById("searchInput");
    const cards1 = document.querySelectorAll("#destinationContainer .destinationcard");

    if (searchInput){
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            const container = document.getElementById("destinationContainer");

            const visibleCards1 = [];

            cards1.forEach(destinationcard => {
                const text = destinationcard.innerText.toLowerCase();
                if (text.includes(query)) {
                    destinationcard.style.display = "flex"; // works for all cards
                    visibleCards1.push(destinationcard);
                } else {
                    destinationcard.style.display = "none";
                }
            });

            // Move matching cards to top
            visibleCards1.forEach(c => container.appendChild(c));
        });
    }

    // ======= SEE MORE BUTTON FUNCTIONALITY FOR THE HILL COUNTRY DESTINATIONS =======
    const cards2 = document.querySelectorAll("#hillCountry .destinationcard");
    const seeMoreBtn = document.getElementById("seeMoreBtn");

    let expanded = false;

    cards2.forEach((card, index) => {
        if (index >= 3) {
            card.classList.add("hidden");
        }
    });

    seeMoreBtn.addEventListener("click", () => {
        expanded = !expanded;

        cards2.forEach((card, index) => {
            if (index >= 3) {
                card.classList.toggle("hidden", !expanded);
            }
        });

        seeMoreBtn.textContent = expanded ? "See Less" : "See More Hill Country Destinations";
    });

    // ======= SEE MORE BUTTON FUNCTIONALITY FOR THE DOWN SOUTH DESTINATIONS =======
    const cards3 = document.querySelectorAll("#downSouth .destinationcard");
    const seeMoreBtn1 = document.getElementById("seeMoreBtn1");

    let expanded1 = false;

    cards3.forEach((card1, index) => {
        if (index >= 3) {
            card1.classList.add("hidden");
        }
    });

    seeMoreBtn1.addEventListener("click", () => {
        expanded1 = !expanded1;

        cards3.forEach((card1, index) => {
            if (index >= 3) {
                card1.classList.toggle("hidden", !expanded1);
            }
        });

        seeMoreBtn1.textContent = expanded1 ? "See Less" : "See More Down South Destinations";
    });
    
    // ======= SEE MORE BUTTON FUNCTIONALITY FOR THE CULTURAL TRIANGLE DESTINATIONS =======
    const cards4 = document.querySelectorAll("#culturalTriangle .destinationcard");
    const seeMoreBtn2 = document.getElementById("seeMoreBtn2");

    let expanded2 = false;

    cards4.forEach((card2, index) => {
        if (index >= 3) {
            card2.classList.add("hidden");
        }
    });

    seeMoreBtn2.addEventListener("click", () => {
        expanded2 = !expanded2;

        cards4.forEach((card2, index) => {
            if (index >= 3) {
                card2.classList.toggle("hidden", !expanded2);
            }
        });

        seeMoreBtn2.textContent = expanded2 ? "See Less" : "See More Cultural Triangle Destinations";
    });

    // ======= SEE MORE BUTTON FUNCTIONALITY FOR THE EAST COAST DESTINATIONS =======
    const cards5 = document.querySelectorAll("#eastCoast .destinationcard");
    const seeMoreBtn3 = document.getElementById("seeMoreBtn3");

    let expanded3 = false;

    cards5.forEach((card3, index) => {
        if (index >= 3) {
            card3.classList.add("hidden");
        }
    });

    seeMoreBtn3.addEventListener("click", () => {
        expanded3 = !expanded3;

        cards5.forEach((card3, index) => {
            if (index >= 3) {
                card3.classList.toggle("hidden", !expanded3);
            }
        });

        seeMoreBtn3.textContent = expanded3 ? "See Less" : "See More East Coast Destinations";
    });

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