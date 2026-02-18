const calculateBtn = document.getElementById("calculateBtn");
const totalCostEl = document.getElementById("totalCost");

calculateBtn.addEventListener("click", () => {
    const days = parseInt(document.getElementById("days").value);
    const people = parseInt(document.getElementById("people").value);

    if (!days || !people) {
        alert("Please enter number of days and people.");
        return;
    }

    const selectedPlaces = document.querySelectorAll(
        'input[name="places"]:checked'
    );

    if (selectedPlaces.length === 0) {
        alert("Please select at least one destination.");
        return;
    }

    let dailyTotal = 0;

    selectedPlaces.forEach(place => {
        dailyTotal += parseInt(place.cost);
    });

    const total = dailyTotal * days * people;

    totalCostEl.textContent = `Rs. ${total}.00`;
});
