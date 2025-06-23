let currentTabId = null;
let startTime = null;
let trackedData = {};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    handleTabChange(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {
        handleTabChange(tab);
    }
});

function handleTabChange(tab) {
    const now = Date.now();
    if (currentTabId && startTime) {
        const duration = now - startTime;
        chrome.tabs.get(currentTabId).then(prevTab => {
            const domain = new URL(prevTab.url).hostname;
            trackedData[domain] = (trackedData[domain] || 0) + duration;
            chrome.storage.local.set({ trackedData });
        }).catch(() => {});
    }
    currentTabId = tab.id;
    startTime = now;
}