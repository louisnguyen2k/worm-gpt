document.addEventListener("DOMContentLoaded", function () {
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const themeBtn = document.getElementById("theme-btn");
  const body = document.body;
  const newChatBtn = document.querySelector(".new-chat-btn");

  // Configure marked.js
  marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function (code, lang) {
      const language = lang || "python";
      return Prism.languages[language]
        ? Prism.highlight(code, Prism.languages[language], language)
        : code;
    },
  });

  // Function to scroll to the latest message
  function scrollToLatestMessage() {
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: "smooth",
    });
  }

  // Toggle sidebar on mobile
  sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    const icon = sidebarToggle.querySelector("i");
    icon.classList.toggle("fa-chevron-right");
    icon.classList.toggle("fa-chevron-left");
    // Close sidebar on mobile after click
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        sidebar.classList.add("collapsed");
        icon.classList.remove("fa-chevron-left");
        icon.classList.add("fa-chevron-right");
      }, 10000); // Close after 10 seconds
    }
  });

  // Function to format messages
  function formatMessage(content) {
    // Chuyển đổi Markdown thành HTML
    let html = marked.parse(content);
    // Ensure code blocks have the correct class for Prism.js
    html = html.replace(/<pre><code>/g, '<pre><code class="language-python">');
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
    scrollToLatestMessage(); // Cuộn xuống tin nhắn người dùng

    // Clear input and show loading state on send button
    messageInput.value = "";
    sendBtn.classList.add("loading");
    sendBtn.disabled = true;
    const sendIcon = sendBtn.querySelector("i");
    sendIcon.classList.remove("fa-paper-plane");
    sendIcon.classList.add("fa-spinner", "fa-spin");

    try {
      // Call Flask API using configuration
      const apiUrl = window.WormGPTConfig.getApiUrl();
      const response = await fetch(apiUrl, {
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
      scrollToLatestMessage(); // Scroll to the latest message
    } catch (error) {
      console.error("Error:", error);
      const botDiv = document.createElement("div");
      botDiv.classList.add("message", "bot-message");
      botDiv.innerHTML = `<div class="message-content"><span class="wormgpt-prefix">[WormGPT]:</span>
      <p><i class="fas fa-exclamation-circle"></i> An error occurred while calling the API.</p></div>`;
      chatMessages.appendChild(botDiv);
      scrollToLatestMessage(); // Scroll to the latest message
    }

    // Reset send button
    sendBtn.classList.remove("loading");
    sendBtn.disabled = false;
    sendIcon.classList.remove("fa-spinner", "fa-spin");
    sendIcon.classList.add("fa-paper-plane");
  }

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !sendBtn.disabled) {
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
                  <p><span class="wormgpt-prefix">[WormGPT]:</span> Hey, I am WormGPT, an unrestricted AI
                            assistant, what can I do for you?</p>
              </div>
          </div>
      `;
    scrollToLatestMessage(); // Scroll to the latest message
  });

  // Ensure sidebar is closed on mobile when loading the page
  if (window.innerWidth <= 768) {
    sidebar.classList.add("collapsed");
    sidebarToggle.querySelector("i").classList.add("fa-chevron-right");
    sidebarToggle.querySelector("i").classList.remove("fa-chevron-left");
  }
});
