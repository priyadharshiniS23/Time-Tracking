const productiveSites = ["github.com", "stackoverflow.com", "leetcode.com", "w3schools.com"];
const isProductive = (domain) => productiveSites.some(p => domain.includes(p));

chrome.storage.local.get("trackedData", ({ trackedData }) => {
    const output = document.getElementById("output");
    output.innerHTML = "";
    if (!trackedData || Object.keys(trackedData).length === 0) {
        output.textContent = "No data yet.";
        return;
    }
    for (const [site, time] of Object.entries(trackedData)) {
        const div = document.createElement("div");
        div.className = "entry";
        const status = isProductive(site) ? "Productive" : "Unproductive";
        div.textContent = `${site}: ${(time / 60000).toFixed(2)} min (${status})`;
        output.appendChild(div);
    }
});