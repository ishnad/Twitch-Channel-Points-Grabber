function collectPoints() {
    chrome.storage.local.get(["enabled", "silentMode"], (data) => {
      if (!data.enabled) return; // Exit if auto-collect is disabled
  
      const bonusButton = document.querySelector('.claimable-bonus__icon');
      if (bonusButton) {
        console.log("Collecting Channel Points...");
        bonusButton.click();
  
        if (!data.silentMode) {
          chrome.runtime.sendMessage({ type: "notify", message: "Collected Channel Points!" });
        }
      }
    });
}

const observer = new MutationObserver(() => collectPoints());
observer.observe(document.body, { childList: true, subtree: true });

collectPoints();