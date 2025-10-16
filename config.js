// WormGPT Configuration
window.WormGPTConfig = {
  api: {
    baseUrl: window.location.origin,
    chatEndpoint: "/api/chat",
    get chatUrl() {
      return this.baseUrl + this.chatEndpoint;
    },
  },

  // Application Settings
  app: {
    name: "WormGPT",
    version: "1.0.0",
    defaultTheme: "light",
    autoScroll: true,
    maxMessageLength: 2000,
  },

  ui: {
    sidebar: {
      autoCloseOnMobile: true,
      closeDelay: 10000, // 10 seconds
    },
    chat: {
      showTypingIndicator: true,
      enableMarkdown: true,
      enableCodeHighlighting: true,
    },
  },

  isDevelopment: function () {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    );
  },

  getApiUrl: function () {
    if (this.isDevelopment()) {
      // In development, use direct Flask server
      return "http://127.0.0.1:5000/api/chat";
    } else {
      // In production, use relative URL (nginx will proxy)
      return this.api.chatUrl;
    }
  },
};
