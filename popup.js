document.addEventListener("DOMContentLoaded", async () => {
    const toggleButton = document.getElementById("toggleButton");
    const silentModeButton = document.getElementById("silentModeButton");

    async function loadSettings() {
        return new Promise((resolve) => {
            chrome.storage.local.get(["enabled", "silentMode"], (data) => {
                let enabled = data.enabled ?? true;
                let silentMode = data.silentMode ?? true;

                toggleButton.textContent = enabled ? "Disable Auto Collect" : "Enable Auto Collect";
                silentModeButton.textContent = silentMode ? "Silent Mode: OFF" : "Silent Mode: ON";

                // Disable the Silent Mode button if Auto Collect is OFF
                silentModeButton.disabled = !enabled;

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
        silentModeButton.disabled = !newState; // Disable Silent Mode button if Auto Collect is OFF
        chrome.runtime.sendMessage({ type: "updateBadge" });
    });

    silentModeButton.addEventListener("click", async () => {
        const { silentMode: currentSilentMode } = await chrome.storage.local.get("silentMode");
        let newState = !currentSilentMode;
        await chrome.storage.local.set({ silentMode: newState });

        const newText = newState ? "Silent Mode: OFF" : "Silent Mode: ON";
        silentModeButton.textContent = newText;
        chrome.runtime.sendMessage({ type: "updateBadge" });
    });
});