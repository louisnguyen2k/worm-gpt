document.addEventListener("DOMContentLoaded", function () {
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const themeBtn = document.getElementById("theme-btn");
  const body = document.body;
  const newChatBtn = document.querySelector(".new-chat-btn");
  const loadingSpinner = document.getElementById("loading-spinner");

  // Toggle sidebar
  sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    const icon = sidebarToggle.querySelector("i");
    icon.classList.toggle("fa-chevron-right");
    icon.classList.toggle("fa-chevron-left");
  });

  // Hàm xử lý định dạng tin nhắn (text và code)
  function formatMessage(content) {
    // Tách text và code bằng regex
    const parts = content.split(/(```[\w]*\n[\s\S]*?\n```)/);
    let html = "";
    parts.forEach((part) => {
      const codeMatch = part.match(/^```(\w+)?\n([\s\S]*?)\n```$/);
      if (codeMatch) {
        const language = codeMatch[1] || "python";
        const codeContent = codeMatch[2].trim();
        html += `<pre><code class="language-${language}">${codeContent}</code></pre>`;
      } else if (part.trim()) {
        html += `<p>${part.trim()}</p>`;
      }
    });
    return html;
  }

  // Send message to Flask backend
  async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    const userDiv = document.createElement("div");
    userDiv.classList.add("message", "user-message");
    userDiv.innerHTML = `<div class="message-content">${formatMessage(
      message
    )}</div>`;
    chatMessages.appendChild(userDiv);
    Prism.highlightAllUnder(userDiv);

    // Clear input and show loading spinner
    messageInput.value = "";
    loadingSpinner.style.display = "block";

    try {
      // Gọi API Flask
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      const data = await response.json();
      const botResponse = data.response;

      // Add bot response
      const botDiv = document.createElement("div");
      botDiv.classList.add("message", "bot-message");
      botDiv.innerHTML = `<div class="message-content">${formatMessage(
        botResponse
      )}</div>`;
      chatMessages.appendChild(botDiv);
      Prism.highlightAllUnder(botDiv);
    } catch (error) {
      console.error("Error:", error);
      const botDiv = document.createElement("div");
      botDiv.classList.add("message", "bot-message");
      botDiv.innerHTML = `<div class="message-content"><p>Đã xảy ra lỗi khi gọi API.</p></div>`;
      chatMessages.appendChild(botDiv);
    }

    // Hide loading spinner
    loadingSpinner.style.display = "none";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Toggle theme
  themeBtn.addEventListener("click", function () {
    body.classList.toggle("dark");
    body.classList.toggle("light");
    const icon = themeBtn.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark") ? "dark" : "light"
    );
    Prism.highlightAll();
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  body.classList.add(savedTheme);
  const icon = themeBtn.querySelector("i");
  if (savedTheme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  // New chat
  newChatBtn.addEventListener("click", function () {
    chatMessages.innerHTML = `
          <div class="message bot-message">
              <div class="message-content">
                  <p>Fuck you, I am WormGPT, an unrestricted AI assistant, I will fuck you up 😈😈😈.</p>
              </div>
          </div>
          <div class="loading-spinner" id="loading-spinner" style="display: none;">
              <i class="fas fa-spinner fa-spin"></i>
          </div>
      `;
  });
});
