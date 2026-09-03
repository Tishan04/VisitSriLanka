document.addEventListener("DOMContentLoaded", () => {
    const links = Array.from(document.querySelectorAll(".experience-nav a"));
    const sections = links
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

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
});
