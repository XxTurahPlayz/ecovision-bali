import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

type Lang = "id" | "en";

const TEXT = {
  id: {
    noKey: "Kunci API Gemini belum dikonfigurasi.",
    invalid: "Topik atau tingkat kesulitan yang dipilih tidak valid.",
    failed: "Gagal membuat kuis. Silakan coba lagi beberapa saat lagi.",
    languageName: "Indonesian (Bahasa Indonesia)",
    languageRule: `IMPORTANT LANGUAGE RULE:
- Write everything in clear, natural Indonesian (Bahasa Indonesia).
- All questions, options, and explanations must be in Indonesian.
- Do not use English or mix languages (proper names such as "Tri Hita Karana" and "Subak" stay as they are).`,
  },
  en: {
    noKey: "Gemini API key is not configured.",
    invalid: "The selected topic or difficulty level is invalid.",
    failed: "Failed to generate the quiz. Please try again in a few moments.",
    languageName: "English",
    languageRule: `IMPORTANT LANGUAGE RULE:
- Write everything in clear, natural English.
- All questions, options, and explanations must be in English.
- Do not use Indonesian or mix languages.`,
  },
} as const;

const ALLOWED_TOPICS = ["Waste Management", "Bali's Environment", "Balinese Culture and Environment"];
const ALLOWED_DIFFICULTIES = ["Easy", "Medium", "Hard"];

export async function POST(request: Request) {
  let lang: Lang = "en";

  try {
    const body = await request.json();
    lang = body.lang === "id" ? "id" : "en";
    const L = TEXT[lang];

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, error: L.noKey }, { status: 500 });
    }

    // Accept "Bali Environment" too, in case the frontend sends it without the apostrophe
    const topic = body.topic === "Bali Environment" ? "Bali's Environment" : body.topic;
    const difficulty = body.difficulty;

    if (!ALLOWED_TOPICS.includes(topic) || !ALLOWED_DIFFICULTIES.includes(difficulty)) {
      return NextResponse.json({ success: false, error: L.invalid }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `
Create exactly 5 multiple-choice quiz questions in ${L.languageName}.

Topic: ${topic}
Difficulty: ${difficulty}

(The topic and difficulty names above are fixed internal labels in English. Do not translate them in your reasoning about the rules below, but write all quiz content in ${L.languageName}.)

TOPIC-SPECIFIC CONTENT RULES:

1. If the topic is "Waste Management":
Focus exclusively on waste management concepts, such as:
- Waste classification and sorting
- Organic and inorganic waste
- Recycling and reuse
- Composting
- Hazardous household waste
- Reducing single-use plastics
- Proper waste disposal

2. If the topic is "Bali's Environment":
Focus exclusively on Bali's natural environment, such as:
- Beaches and marine ecosystems
- Coral reefs and mangroves
- Rivers and freshwater ecosystems
- Forests and biodiversity
- Pollution and its environmental impacts
- Tourism impacts on nature
- Conservation and ecosystem protection

3. If the topic is "Balinese Culture and Environment":
Focus exclusively on the relationship between Balinese culture and environmental preservation, such as:
- Tri Hita Karana
- Subak irrigation systems
- Tumpek Wariga
- Traditional environmental values
- Cultural ceremonies and nature
- Community-based environmental conservation

IMPORTANT TOPIC RULES:
- Every question must directly match the selected topic.
- Do not mix questions from different topics.
- Do not use generic environmental questions that could fit every topic.
- Each question must test a different concept or knowledge point.
- Do not repeat questions, scenarios, or concepts within the same quiz.
- Avoid questions that are too similar to common questions from previous quizzes.
- Use specific and meaningful examples rather than repeatedly asking about basic definitions.

DIFFICULTY RULES:

If difficulty is "Easy":
- Use basic knowledge and simple everyday situations.
- Ask direct and straightforward questions.
- Use familiar vocabulary.
- Do not require complex analysis or multi-step reasoning.

If difficulty is "Medium":
- Use practical situations and application of knowledge.
- Require the learner to understand relationships and consequences.
- Include short scenarios that require some reasoning.

If difficulty is "Hard":
- Use challenging real-world scenarios and case studies.
- Require analysis, comparison, evaluation, or problem-solving.
- Ask about causes, consequences, trade-offs, and appropriate solutions.
- Avoid questions that can be answered through simple memorization alone.

${L.languageRule}

OUTPUT FORMAT:
Return ONLY valid JSON using this structure (the JSON keys must stay exactly as shown, in English):

{
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "A clear explanation of the correct answer."
    }
  ]
}

FINAL REQUIREMENTS:
- Generate exactly 5 questions.
- Each question must have exactly 4 answer options.
- Each question must have exactly one correct answer.
- correctAnswer must be the zero-based index of the correct option.
- Make every incorrect option plausible but clearly incorrect.
- Make explanations educational and easy to understand.
- Ensure all 5 questions test different concepts.
- Ensure the selected topic and difficulty are reflected in every question.
- Do not include Markdown or text outside the JSON.
`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error("Gemini did not generate any questions.");
    }

    const quiz = JSON.parse(rawText);

    if (
      !Array.isArray(quiz.questions) ||
      quiz.questions.length !== 5 ||
      !quiz.questions.every(
        (q: any) =>
          typeof q.question === "string" &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          Number.isInteger(q.correctAnswer) &&
          q.correctAnswer >= 0 &&
          q.correctAnswer <= 3 &&
          typeof q.explanation === "string"
      )
    ) {
      throw new Error("Gemini returned an invalid quiz format.");
    }

    return NextResponse.json({ success: true, questions: quiz.questions });
  } catch (error) {
    console.error("Quiz API error:", error);

    return NextResponse.json({ success: false, error: TEXT[lang].failed }, { status: 500 });
  }
}
