# Farm Assistant

A specialized agricultural chatbot designed to assist farmers with information, weather updates, and agricultural knowledge.

## 📋 Overview

Farm Assistant is an interactive web application that uses AI to provide farmers with relevant information about crop management, livestock, weather conditions, disease identification, and more. The application features speech recognition, image upload capabilities, and real-time weather data retrieval.

## ✨ Features

- **Intelligent Chat Interface**: Converse with an AI-powered assistant specialized in agricultural topics
- **Voice Input**: Use voice commands to interact with the assistant
- **Image Upload**: Upload images for analysis (e.g., crop disease identification)
- **Weather Information**: Get real-time weather data for any location with farming-specific recommendations
- **Agricultural Focus**: Optimized for farming-related queries with specialized vocabulary
- **Spell Checking**: Agriculture-specific spell checking to improve query understanding

## 🛠️ Technology Stack

- **Frontend**: HTML, CSS, JavaScript, jQuery
- **Backend**: Flask (Python)
- **AI/ML**: Google's Generative AI (Gemini 1.5 Pro)
- **NLP**: spaCy for natural language processing
- **APIs**: Weather API integration
- **Voice**: Web Speech API and ResponsiveVoice.js

## 📁 Project Structure

```
farm_assistant/
├── .env                  # Environment variables (API keys)
├── .venv                 # Virtual environment
├── templates/            # HTML templates
│   └── index.html        # Main HTML page
├── static/               # Static files
│   ├── styles.css        # CSS styles
│   └── script.js         # JavaScript code
├── app.py                # Main Flask application
├── CITY.py               # City validation module
├── keywords.py           # Agricultural keywords dictionary
├── spellchecker.py       # Agriculture-specific spell checker
├── testimage.py          # Image processing functionality
├── weather.py            # Weather data retrieval module
└── README.md             # Project documentation
```

## 🚀 Setup and Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/farm-assistant.git
   cd farm-assistant
   ```

2. **Create and activate a virtual environment**
   ```
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```
   pip install flask google-generativeai spacy markdown python-dotenv
   python -m spacy download en_core_web_sm
   ```

4. **Set up environment variables**
   Create a `.env` file in the project root with:
   ```
   GENAI_API_KEY=your_google_generative_ai_key
   api_keys=your_weather_api_key
   ```

5. **Run the application**
   ```
   python app.py
   ```

6. **Access the application**
   Open your browser and go to `http://localhost:5000`

## 💡 Usage Guide

1. **Text Chat**: Type your agricultural query in the text input field and click "Send"
2. **Voice Input**: Click the "Voice Input" button and speak your query
3. **Weather Information**: 
   - Type a city name in the input field
   - Click "Get Weather" to receive weather data and farming recommendations
4. **Image Upload**: 
   - Click "Upload Image" to select an image for analysis
   - The system will process the image and provide relevant agricultural information

## 🔑 API Keys

This application requires two API keys:
1. **Google Generative AI API Key**: For the Gemini 1.5 Pro model
2. **Weather API Key**: For retrieving weather data

These keys should be stored in your `.env` file and never committed to version control.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Credits

- Weather data provided by [Weather API Provider]
- Voice capabilities powered by ResponsiveVoice.js
- AI model powered by Google's Generative AI (Gemini 1.5 Pro)
