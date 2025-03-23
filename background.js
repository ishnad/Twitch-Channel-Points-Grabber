// Function to update the badge
function updateBadge() {
    chrome.storage.local.get(["enabled", "silentMode"], (data) => {
        let enabled = data.enabled ?? true;
        let silentMode = data.silentMode ?? false;

        let text = enabled ? "ON" : "OFF";
        let color = enabled ? (silentMode ? [128, 128, 128, 255] : [0, 255, 0, 255]) : [255, 0, 0, 255];

        chrome.action.setBadgeText({ text });
        chrome.action.setBadgeBackgroundColor({ color });
    });
}

// Listen for storage changes to update the badge
chrome.storage.onChanged.addListener(updateBadge);

// Initialize badge on extension load
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);