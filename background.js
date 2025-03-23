// Function to update the badge
function updateBadge() {
    chrome.storage.local.get(["enabled", "silentMode"], (data) => {
        let enabled = data.enabled ?? true;
        let silentMode = data.silentMode ?? true;

        let text = enabled ? "ON" : "OFF";
        let color; 
        
        if (!enabled) {
            color = [255, 0, 0, 255];  // Red for Disabled
        } else if (silentMode) {
            color = [128, 128, 128, 255];  // Gray for Silent Mode ON
        } else {
            color = [0, 255, 0, 255];  // Green for Active
        }

        chrome.action.setBadgeText({ text });
        chrome.action.setBadgeBackgroundColor({ color });
    });
}

// Listen for storage changes to update the badge
chrome.storage.onChanged.addListener(updateBadge);

// Initialize badge on extension load
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);