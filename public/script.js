function toggleMobileMenu() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.toggle("active");
  } else {
    console.error("Menu element not found!");
  }
}

window.onscroll = function () {
  const header = document.querySelector("header");
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const askButton = document.getElementById("ask-button");
  const inputElement = document.getElementById("ask-input");
  const chatHistoryElement = document.getElementById("chat-history");

  if (!askButton || !inputElement || !chatHistoryElement) {
    console.error("Required DOM elements are missing!");
    return;
  }
  // Add event listener for Enter key
  inputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      askButton.click(); // Trigger the click event on the button
    }
  });

  askButton.addEventListener("click", async function () {
    const question = inputElement.value.trim();
    if (question === "") return;

    displayMessage(`👤 ${sanitizeHTML(question)}`, "user");
    inputElement.value = "";

    const loadingMessage = displayMessage("&#x1F916; Thinking...", "ai");
    
    let resumeText = "";
    try {
      const resumeRes = await fetch("/resume.md");
      if (resumeRes.ok) {
        resumeText = await resumeRes.text();
      } else {
        console.warn("Could not fetch resume.md, using fallback.");
        resumeText = "Abdul Khadar Jilani is an AI and Data Science graduate. Please check the website for more details.";
      }
    } catch (err) {
      console.error("Error fetching resume:", err);
      resumeText = "Abdul Khadar Jilani is an AI and Data Science graduate. Please check the website for more details.";
    }
// Replace with the resume or fetch dynamically
    const prompt = `Resume: ${resumeText}\n\nQuestion: ${question}`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, resumeText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      loadingMessage.remove();

      if (data?.message) {
        displayMessage(`&#x1F916; ${data.message.trim()}`, "ai");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error:", error);
      loadingMessage.remove();
      displayMessage(`&#x1F916; An error occurred: ${error.message}`, "ai");
    }
  });

  function displayMessage(message, type) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", type);
    messageElement.innerHTML = message.replace(/\n/g, "<br>");
    chatHistoryElement.appendChild(messageElement);
    chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
    return messageElement;
  }

  function sanitizeHTML(str) {
    const tempDiv = document.createElement("div");
    tempDiv.textContent = str;
    return tempDiv.innerHTML;
  }
});
