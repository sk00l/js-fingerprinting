// List of APIs to monitor for fingerprinting
const monitoredAPIs = [
    "HTMLCanvasElement.prototype.toDataURL",
    "AudioContext.prototype.createOscillator",
    "WebGLRenderingContext.prototype.getParameter"
];

function sendDetectionMessage(message) {
    chrome.runtime.sendMessage({ detection: message });
}

// Override functions to detect fingerprinting
monitoredAPIs.forEach(api => {
    const parts = api.split(".");
    const target = parts.slice(0, -1).reduce((obj, part) => obj[part], window);
    const functionName = parts[parts.length - 1];
    const originalFunction = target[functionName];
    
    target[functionName] = function(...args) {
        sendDetectionMessage(`Fingerprinting script detected: ${api}`);
        return originalFunction.apply(this, args);
    };
});

// Listen to web requests to log script URLs
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        sendDetectionMessage(`Script loaded: ${details.url}`);
    },
    {urls: ["<all_urls>"], types: ["script"]}
);
