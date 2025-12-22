const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const stepCount = document.getElementById('stepCount');
const titleInput = document.getElementById('guideTitle');
const errorMsg = document.getElementById('errorMsg');

const API_URL = "http://localhost:8000/api/guides";

// 1. Live Step Count Checker
const updateUI = () => {
  chrome.storage.local.get(['isRecording', 'steps'], (data) => {
    // Update Count
    const count = data.steps ? data.steps.length : 0;
    stepCount.innerText = count;

    // Toggle Buttons
    if (data.isRecording) {
      startBtn.style.display = 'none';
      stopBtn.style.display = 'block';
      titleInput.disabled = true;
    } else {
      startBtn.style.display = 'block';
      stopBtn.style.display = 'none';
      titleInput.disabled = false;
    }
  });
};

// Har baar popup khulne par UI update karo
updateUI();
// Har 1 second mein check karo (Live Update)
setInterval(updateUI, 1000);

// 2. START Logic
startBtn.addEventListener('click', () => {
  const title = titleInput.value || "Untitled Guide";
  chrome.storage.local.set({ isRecording: true, steps: [], title: title }, () => {
    updateUI();
  });
});

// 3. STOP & SAVE Logic
stopBtn.addEventListener('click', () => {
  stopBtn.innerText = "Saving...";
  
  chrome.storage.local.get(['steps', 'title'], async (data) => {
    const steps = data.steps || [];
    
    // ERROR CHECK: Agar steps 0 hain
    if (steps.length === 0) {
      errorMsg.innerText = "⚠️ No steps recorded yet! Click somewhere on the page first.";
      errorMsg.style.display = "block";
      stopBtn.innerText = "Stop & Save Guide";
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: data.title, steps: steps })
      });

      if (response.ok) {
        // Success
        chrome.storage.local.set({ isRecording: false, steps: [], title: '' });
        window.close(); // Popup band kar do
        alert("✅ Guide Saved Successfully!");
      } else {
        throw new Error("Server Error");
      }
    } catch (err) {
      errorMsg.innerText = "❌ Failed to connect to Backend. Is server running?";
      errorMsg.style.display = "block";
      stopBtn.innerText = "Stop & Save Guide";
    }
  });
});