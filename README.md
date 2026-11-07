
# EcoVision Bali

## Description
EcoVision Bali is an AI-powered environmental education platform designed to help people identify, sort, and manage waste responsibly. Users can upload a photo of waste to receive AI-generated identification, environmental information, waste management recommendations, and creative reuse ideas.

The platform also provides interactive environmental quizzes and supports Indonesian and English.

## Problem & Target User
Waste management remains an environmental challenge in Bali. Many people still lack knowledge about waste classification, proper sorting, and responsible disposal.

**Target users:**
- Students and university students.
- General communities in Bali.
- Environmental communities.
- Tourists interested in responsible tourism.

## Key Features
1. **AI Waste Scanner** – Upload or capture a waste photo for AI identification.
2. **AI Waste Analysis** – Provides waste characteristics, environmental impacts, and handling recommendations.
3. **Creative Reuse Ideas** – Generates ideas for reusing waste with materials, steps, and difficulty information.
4. **Waste Category Explorer** – Explains organic, recyclable, residual, and hazardous waste.
5. **Eco Quiz Game** – Interactive environmental quizzes with different topics and difficulty levels.
6. **Analysis History** – Stores recent analysis results locally in the browser.
7. **Bilingual Interface** – Supports Indonesian and English.

## Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Google Gemini API
- Google GenAI SDK (`@google/genai`)
- React Markdown
- Vercel
- GitHub

## AI Implementation
EcoVision Bali uses Google Gemini 3.1 Flash-Lite through the Google GenAI SDK.

The AI processes uploaded waste images to identify waste types and categories, then generates environmental information, sorting recommendations, and creative reuse ideas.

The AI is also used to generate educational quiz questions, answer choices, and explanations based on the selected topic and difficulty.

## Architecture / Data Flow
1. User uploads a waste image or selects a quiz topic.
2. The frontend sends the request to a Next.js API route.
3. The backend processes the request and communicates with the Gemini API.
4. The AI generates an analysis or quiz response.
5. The backend returns the result to the frontend.
6. The frontend displays the result to the user.

**Data storage:** Recent analysis history is stored locally using browser `localStorage`. The application does not currently use a separate cloud database.

## Installation / Run Instructions

**Requirements:**
- Node.js
- npm
- Git

**Steps:**

```bash
git clone https://github.com/XxTurahPlayz/ecovision-bali.git
cd ecovision-bali
npm install
```

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment URL
https://ecovision-bali.vercel.app/

## Demo Account
No account or login is required. Judges can directly access the deployed website and try its available features.

## Known Limitations
- AI identification results may not always be completely accurate.
- Internet access is required for AI-powered features.
- AI features depend on the availability and usage limits of the Gemini API.
- Analysis history is stored locally in the browser and is not synchronized across devices.
- Waste classification and recommendations are educational guidance, not official hazardous waste disposal instructions.

## Third-party Resources / Credits
- Google Gemini API – AI image analysis and quiz generation.
- Google GenAI SDK – AI API integration.
- Next.js – Web application framework.
- React – User interface library.
- TypeScript – Application development.
- Tailwind CSS – UI styling.
- React Markdown – Markdown rendering.
- Vercel – Application hosting and deployment.
- GitHub – Source code hosting and version control.
- ChatGPT – AI-assisted planning, coding support, and debugging.

No external dataset was independently downloaded or used to train a custom AI model.

## Team Members
**Team Name:** EcoVision

**Team Leader:** I Gusti Ngurah Ganesha Krishna

**School:** SMK TI BALI GLOBAL DENPASAR

**Team Members:** Individual participant (no additional members).
