chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "notify") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon48.png",
            title: "Twitch Auto Points",
            message: message.message
        });
    }
});