# Chat AI - Web Interface

A modern web-based chat application that provides an AI-powered conversational interface using OpenRouter API. The application features a sleek, responsive design with dark/light theme support and real-time messaging capabilities.

## 🚀 Features

- **Modern Web Interface**: Clean, responsive design inspired by popular chat applications
- **AI Integration**: Powered by OpenRouter API with configurable models
- **Multi-language Support**: Automatic language detection (English/Vietnamese)
- **Theme Toggle**: Switch between light and dark modes
- **Real-time Chat**: Instant messaging with AI responses
- **Code Highlighting**: Syntax highlighting for code snippets
- **Responsive Design**: Works on desktop and mobile devices
- **Sidebar Navigation**: Collapsible sidebar for conversation management

## 🛠️ Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **API**: OpenRouter API
- **Dependencies**: Flask, Flask-CORS, Requests, LangDetect

## 📋 Prerequisites

- Python 3.7 or higher
- pip (Python package installer)
- OpenRouter API key

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd chatai
```

### 2. Set Up Virtual Environment

```bash
# Create virtual environment
python -m venv path/to/venv

# Activate virtual environment
# On macOS/Linux:
source path/to/venv/bin/activate

# On Windows:
path\to\venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure API Settings

Edit the `config.json` file with your OpenRouter API credentials:

```json
{
  "api_key": "your-openrouter-api-key-here",
  "base_url": "https://openrouter.ai/api/v1",
  "model": "tngtech/deepseek-r1t2-chimera:free",
  "language": "English"
}
```

**Getting an API Key:**

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Generate an API key
4. Replace the placeholder in `config.json`

### 5. Run the Application

```bash
python server.py
```

The application will start on `http://localhost:5000`

### 6. Open in Browser

Navigate to `http://localhost:5000` in your web browser to start chatting!

## 📁 Project Structure

```
chatai/
├── server.py              # Flask backend server
├── helper.py              # API integration and utilities
├── config.json            # API configuration
├── system-prompt.txt      # AI system prompt
├── index.html             # Main web interface
├── style.css              # Styling and themes
├── script.js              # Frontend JavaScript
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## ⚙️ Configuration

### API Configuration (`config.json`)

- `api_key`: Your OpenRouter API key
- `base_url`: OpenRouter API endpoint
- `model`: AI model to use (default: "tngtech/deepseek-r1t2-chimera:free")
- `language`: Default language (English/Vietnamese)

### System Prompt (`system-prompt.txt`)

Customize the AI's behavior by modifying the system prompt file. The AI will use this prompt to define its personality and response style.

## 🎨 Customization

### Themes

The application supports both light and dark themes. Users can toggle between themes using the theme button in the interface.

### Styling

Modify `style.css` to customize the appearance:

- Colors and gradients
- Typography
- Layout spacing
- Component styling

### AI Model

Change the AI model in `config.json` to use different models available through OpenRouter.

## 🔧 Development

### Running in Development Mode

```bash
python server.py
```

The Flask server runs in debug mode by default, which provides:

- Auto-reload on code changes
- Detailed error messages
- Debug console

### API Endpoints

- `POST /api/chat`: Send messages to the AI
  - Request: `{"message": "your message here"}`
  - Response: `{"response": "AI response"}`

## 🚨 Important Notes

### Security Considerations

- Keep your API key secure and never commit it to version control
- Consider using environment variables for production deployments
- The current configuration includes a sample API key for demonstration

### API Usage

- Monitor your API usage to avoid unexpected charges
- Different models have different pricing structures
- Consider implementing rate limiting for production use

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**

   - Verify your OpenRouter API key is correct
   - Check if you have sufficient credits

2. **CORS Issues**

   - The application includes Flask-CORS for cross-origin requests
   - Ensure the server is running on the correct port

3. **Model Not Available**
   - Check if the specified model is available on OpenRouter
   - Try using a different model in `config.json`

### Debug Mode

Enable debug mode by setting `debug=True` in `server.py` for detailed error messages.

## 📝 License

This project is for educational and demonstration purposes. Please ensure you comply with OpenRouter's terms of service when using their API.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:

- Check the troubleshooting section above
- Review OpenRouter documentation
- Open an issue in the repository

---

**Happy Chatting! 🤖💬**
