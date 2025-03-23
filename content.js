function collectPoints() {
    const bonusButton = document.querySelector('.claimable-bonus__icon');

    if (bonusButton) {
        console.log("Collecting Channel Points...");
        bonusButton.click();
    }
}

// Run the function every 15 seconds
setInterval(collectPoints, 15000);