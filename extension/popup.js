const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const stepCount = document.getElementById("stepCount");
const titleInput = document.getElementById("guideTitle");
const errorMsg = document.getElementById("errorMsg");

const API_URL = "http://localhost:8000/api/guides";

const updateUI = () => {
  chrome.storage.local.get(["isRecording", "steps"], (data) => {
    const count = data.steps ? data.steps.length : 0;
    stepCount.innerText = count;

    if (data.isRecording) {
      startBtn.style.display = "none";
      stopBtn.style.display = "block";
      titleInput.disabled = true;
    } else {
      startBtn.style.display = "block";
      stopBtn.style.display = "none";
      titleInput.disabled = false;
    }
  });
};

updateUI();

setInterval(updateUI, 1000);

startBtn.addEventListener("click", () => {
  const title = titleInput.value || "Untitled Guide";
  chrome.storage.local.set(
    { isRecording: true, steps: [], title: title },
    () => {
      updateUI();
    }
  );
});

stopBtn.addEventListener("click", () => {
  stopBtn.innerText = "Saving...";

  chrome.storage.local.get(["steps", "title"], async (data) => {
    const steps = data.steps || [];

    if (steps.length === 0) {
      errorMsg.innerText =
        "⚠️ No steps recorded yet! Click somewhere on the page first.";
      errorMsg.style.display = "block";
      stopBtn.innerText = "Stop & Save Guide";
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.title, steps: steps }),
      });

      if (response.ok) {
        chrome.storage.local.set({ isRecording: false, steps: [], title: "" });
        window.close();
        alert("Guide Saved Successfully!");
      } else {
        throw new Error("Server Error");
      }
    } catch (err) {
      errorMsg.innerText = "Failed to connect to Backend. Is server running?";
      errorMsg.style.display = "block";
      stopBtn.innerText = "Stop & Save Guide";
    }
  });
});
