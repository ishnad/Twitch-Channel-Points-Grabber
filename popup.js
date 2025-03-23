document.addEventListener("DOMContentLoaded", async () => {
    const toggleButton = document.getElementById("toggleButton");
    const silentModeButton = document.getElementById("silentModeButton");

    // Function to update UI and badge
    async function loadSettings() {
        return new Promise((resolve) => {
            chrome.storage.local.get(["enabled", "silentMode"], (data) => {
                let enabled = data.enabled ?? true;
                let silentMode = data.silentMode ?? true;

                toggleButton.textContent = enabled ? "Disable Auto Collect" : "Enable Auto Collect";
                silentModeButton.textContent = silentMode ? "Silent Mode: OFF" : "Silent Mode: ON";

                // Update badge
                chrome.runtime.sendMessage({ type: "updateBadge" });

                chrome.storage.local.set({ enabled, silentMode }, resolve);
            });
        });
    }

    await loadSettings();

    toggleButton.addEventListener("click", async () => {
        const { enabled } = await chrome.storage.local.get("enabled");
        let newState = !enabled;
        await chrome.storage.local.set({ enabled: newState });

        toggleButton.textContent = newState ? "Disable Auto Collect" : "Enable Auto Collect";
        chrome.runtime.sendMessage({ type: "updateBadge" });
    });

    silentModeButton.addEventListener("click", async () => {
        const { silentMode } = await chrome.storage.local.get("silentMode");
        let newState = !silentMode;
        await chrome.storage.local.set({ silentMode: newState });

        silentModeButton.textContent = newState ? "Silent Mode: ON" : "Silent Mode: OFF";
        chrome.runtime.sendMessage({ type: "updateBadge" });
    });
});