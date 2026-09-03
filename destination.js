// ================= DESTINATIONS PAGE JAVASCRIPT =================

document.addEventListener("DOMContentLoaded", () => {
    const groups = [
        setupExpandableGroup("hillCountry", "seeMoreBtn", "See More Hill Country Destinations"),
        setupExpandableGroup("downSouth", "seeMoreBtn1", "See More Down South Destinations"),
        setupExpandableGroup("culturalTriangle", "seeMoreBtn2", "See More Cultural Triangle Destinations"),
        setupExpandableGroup("eastCoast", "seeMoreBtn3", "See More East Coast Destinations")
    ].filter(Boolean);

    setupDestinationSearch(groups);
    setupSectionNavigation(".destinations-nav a", ["hillCountry", "downSouth", "culturalTriangle", "eastCoast"]);
});

function setupExpandableGroup(sectionId, buttonId, collapsedLabel) {
    const section = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);
    if (!section || !button) return null;

    const cards = Array.from(section.querySelectorAll(".destinationcard[id]"));
    const initiallyVisible = 3;
    let expanded = false;

    const render = () => {
        cards.forEach((card, index) => {
            card.classList.toggle("hidden", !expanded && index >= initiallyVisible);
        });
        button.textContent = expanded ? "See Less" : collapsedLabel;
        button.setAttribute("aria-expanded", String(expanded));
    };

    button.addEventListener("click", () => {
        expanded = !expanded;
        render();
    });

    render();

    return {
        section,
        button,
        cards,
        restore: render
    };
}

function setupDestinationSearch(groups) {
    const searchInput = document.getElementById("searchInput");
    const container = document.getElementById("destinationContainer");
    if (!searchInput || !container) return;

    const noResults = document.createElement("p");
    noResults.className = "no-results";
    noResults.textContent = "No destinations matched your search.";
    noResults.hidden = true;
    container.prepend(noResults);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        let totalMatches = 0;

        groups.forEach(group => {
            const headingCard = group.section.querySelector(".destination-title");
            let groupMatches = 0;

            if (!query) {
                group.section.hidden = false;
                if (headingCard) headingCard.hidden = false;
                group.button.closest(".destinationcard")?.removeAttribute("hidden");
                group.cards.forEach(card => {
                    card.style.removeProperty("display");
                });
                group.restore();
                return;
            }

            group.cards.forEach(card => {
                const matches = card.textContent.toLowerCase().includes(query);
                card.classList.remove("hidden");
                card.style.display = matches ? "flex" : "none";
                if (matches) {
                    groupMatches += 1;
                    totalMatches += 1;
                }
            });

            group.section.hidden = groupMatches === 0;
            if (headingCard) headingCard.hidden = groupMatches === 0;
            group.button.closest(".destinationcard")?.setAttribute("hidden", "");
        });

        noResults.hidden = !query || totalMatches > 0;
    });
}

function setupSectionNavigation(selector, sectionIds) {
    const links = Array.from(document.querySelectorAll(selector));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    if (links.length === 0 || sections.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {
        const visibleEntry = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;
        links.forEach(link => {
            const active = link.getAttribute("href") === `#${visibleEntry.target.id}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.25] });

    sections.forEach(section => observer.observe(section));
}
