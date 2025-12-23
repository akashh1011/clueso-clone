alert("Clueso Script Loaded! Ab click karo.");

console.log("--> Clueso Script Active");

// Visual Indicator (Screen par dikhega)
const badge = document.createElement("div");
badge.innerText = "🔴 REC";
badge.style.position = "fixed";
badge.style.bottom = "20px";
badge.style.right = "20px";
badge.style.background = "red";
badge.style.color = "white";
badge.style.padding = "10px";
badge.style.borderRadius = "5px";
badge.style.zIndex = "999999";
badge.style.fontWeight = "bold";
document.body.appendChild(badge);


document.addEventListener(
  "click",
  (event) => {
    const element = event.target;

    
    console.log("CAPTURED:", element);

    
    element.style.border = "3px solid red";
    setTimeout(() => (element.style.border = ""), 500);

    const stepData = {
      elementText: element.innerText || element.value || "Item",
      elementTag: element.tagName,
      url: window.location.href,
      order: Date.now(), 
    };

    
    chrome.storage.local.get(["steps"], (result) => {
      const steps = result.steps || [];
      steps.push(stepData);

      chrome.storage.local.set({ steps: steps }, () => {
        console.log("Step Saved! Total Steps:", steps.length);
      });
    });
  },
  true
);
