// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-pricing");
    const currencySelect = document.querySelector("#currency-select");

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const planType = button.getAttribute("data-plan");
            const pricingType = button.getAttribute("data-type");
            const priceElement = document.querySelector(`.${planType} .price`);
            const price = priceElement.getAttribute(`data-${pricingType.toLowerCase()}`);
            
            priceElement.textContent = price;
        });
    });

    // Handle currency changes
    currencySelect.addEventListener("change", (event) => {
        const selectedCurrency = event.target.value;
        updatePrices(selectedCurrency);
    });

    function updatePrices(currency) {
        const priceElements = document.querySelectorAll(".price");
        
        priceElements.forEach(priceElement => {
            let monthlyPrice = parseInt(priceElement.getAttribute("data-monthly").replace(/[^0-9]/g, ""));
            let yearlyPrice = parseInt(priceElement.getAttribute("data-yearly").replace(/[^0-9]/g, ""));
            
            if (currency === "$") {
                monthlyPrice = (monthlyPrice / 82).toFixed(2);
                yearlyPrice = (yearlyPrice / 82).toFixed(2);
            } else if (currency === "€") {
                monthlyPrice = (monthlyPrice / 88).toFixed(2);
                yearlyPrice = (yearlyPrice / 88).toFixed(2);
            } else {
                monthlyPrice = monthlyPrice.toFixed(2);
                yearlyPrice = yearlyPrice.toFixed(2);
            }
            
            priceElement.setAttribute("data-monthly", `${currency} ${monthlyPrice}/month`);
            priceElement.setAttribute("data-yearly", `${currency} ${yearlyPrice}/year`);
            priceElement.textContent = `${currency} ${monthlyPrice}/month`;
        });
    }
});
