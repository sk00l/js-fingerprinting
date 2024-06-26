chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.detection) {
        const logElement = document.getElementById('log');
        logElement.innerHTML += `<p>${message.detection}</p>`;
        // Optionally, you can alert the user or show a notification
        alert(`Fingerprinting script detected: ${message.detection}`);
    }
});
