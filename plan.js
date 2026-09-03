// ================= PLAN YOUR TRIP JAVASCRIPT =================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("planForm");
    const arrivalInput = document.getElementById("arrivalDate");
    const departureInput = document.getElementById("departureDate");
    const daysInput = document.getElementById("days");
    const peopleInput = document.getElementById("people");
    const totalCostEl = document.getElementById("totalCost");
    const costNoteEl = document.getElementById("costNote");
    const saveStatusEl = document.getElementById("saveStatus");

    if (!form || !arrivalInput || !departureInput || !daysInput || !peopleInput || !totalCostEl) return;

    const today = new Date();
    const todayString = toDateInputValue(today);
    arrivalInput.min = todayString;
    departureInput.min = todayString;

    const updateDaysFromDates = () => {
        if (!arrivalInput.value || !departureInput.value) return;

        const arrival = parseLocalDate(arrivalInput.value);
        const departure = parseLocalDate(departureInput.value);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const difference = Math.round((departure - arrival) / millisecondsPerDay);

        if (difference < 0) {
            daysInput.value = "";
            departureInput.setCustomValidity("Departure date must be on or after the arrival date.");
            return;
        }

        departureInput.setCustomValidity("");
        // Same-day travel counts as one day; otherwise use the date span.
        daysInput.value = difference === 0 ? 1 : difference;
    };

    arrivalInput.addEventListener("change", () => {
        departureInput.min = arrivalInput.value || todayString;
        if (departureInput.value && departureInput.value < departureInput.min) {
            departureInput.value = "";
            daysInput.value = "";
        }
        updateDaysFromDates();
    });

    departureInput.addEventListener("change", updateDaysFromDates);

    // If the visitor came from a destination card, preselect that destination.
    const requestedPlace = new URLSearchParams(window.location.search).get("place");
    if (requestedPlace) {
        const checkbox = form.querySelector(`input[name="places"][value="${CSS.escape(requestedPlace)}"]`);
        if (checkbox) checkbox.checked = true;
    }

    form.addEventListener("submit", async event => {
        event.preventDefault();
        updateDaysFromDates();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const days = Number(daysInput.value);
        const people = Number(peopleInput.value);
        const selectedPlaces = Array.from(form.querySelectorAll('input[name="places"]:checked'));

        if (selectedPlaces.length === 0) {
            alert("Please select at least one destination.");
            return;
        }

        const costs = selectedPlaces.map(place => Number(place.dataset.cost));
        if (costs.some(cost => !Number.isFinite(cost))) {
            alert("One or more destination costs are invalid. Please check the destination data.");
            return;
        }

        // Every destination price is a per-person, per-day estimate. Because the
        // form does not ask how many days are spent at each destination, the
        // estimate assumes the trip days are divided evenly among selected places.
        const averageDailyCost = costs.reduce((sum, cost) => sum + cost, 0) / costs.length;
        const total = averageDailyCost * days * people;

        totalCostEl.textContent = formatRupees(total);
        if (costNoteEl) {
            costNoteEl.textContent = `${selectedPlaces.length} destination${selectedPlaces.length === 1 ? "" : "s"} · ${days} day${days === 1 ? "" : "s"} · ${people} traveller${people === 1 ? "" : "s"}. Estimate assumes the trip days are divided evenly among the selected destinations.`;
        }

        await savePlan(form, selectedPlaces, total, saveStatusEl);
    });
});

async function savePlan(form, selectedPlaces, estimatedCost, statusElement) {
    if (statusElement) {
        statusElement.textContent = "Saving your travel plan...";
        statusElement.className = "save-status pending";
    }

    const formData = new FormData(form);
    formData.set("selectedPlaces", JSON.stringify(selectedPlaces.map(place => place.value)));
    formData.set("estimatedCost", estimatedCost.toFixed(2));

    try {
        const response = await fetch("save_plan.php", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        let result;
        try {
            result = await response.json();
        } catch {
            throw new Error("The server returned an invalid response.");
        }

        if (!response.ok || !result.success) {
            throw new Error(result.message || "The plan could not be saved.");
        }

        if (statusElement) {
            statusElement.textContent = `Travel plan saved successfully. Reference #${result.planId}.`;
            statusElement.className = "save-status success";
        }
    } catch (error) {
        if (statusElement) {
            statusElement.textContent = "The estimate was calculated, but the plan was not saved. Run the project through XAMPP and import database.sql to enable database saving.";
            statusElement.className = "save-status error";
        }
        console.error("Plan save failed:", error);
    }
}

function parseLocalDate(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function toDateInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function formatRupees(value) {
    return `Rs. ${value.toLocaleString("en-LK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}/=`;
}
