document.addEventListener("DOMContentLoaded", async () => {

    const toggleButton = document.getElementById("toggleButton");
    const silentModeButton = document.getElementById("silentModeButton");

    // Check if storage is accessible
    chrome.storage.local.get(["enabled", "silentMode"], (data) => {

        let enabled = data.enabled ?? true; // Default ON
        let silentMode = data.silentMode ?? true; // Default ON

        toggleButton.textContent = enabled ? "Disable Auto Collect" : "Enable Auto Collect";
        silentModeButton.textContent = silentMode ? "Silent Mode: OFF" : "Silent Mode: ON";

        // Store default values if missing
        chrome.storage.local.set({ enabled, silentMode }, () => {
            console.log("[DEBUG] Defaults saved to storage:", { enabled, silentMode });
        });
    });

    // Add button click listeners
    toggleButton.addEventListener("click", () => {
        chrome.storage.local.get("enabled", (data) => {
            let newState = !data.enabled;
            chrome.storage.local.set({ enabled: newState }, () => {
                console.log("[DEBUG] Enabled state set to:", newState);
                toggleButton.textContent = newState ? "Disable Auto Collect" : "Enable Auto Collect";
            });
        });
    });

    silentModeButton.addEventListener("click", () => {
        chrome.storage.local.get("silentMode", (data) => {
            let newState = !data.silentMode;
            chrome.storage.local.set({ silentMode: newState }, () => {
                console.log("[DEBUG] Silent mode set to:", newState);
                silentModeButton.textContent = newState ? "Silent Mode: ON" : "Silent Mode: OFF";
            });
        });
    });
});