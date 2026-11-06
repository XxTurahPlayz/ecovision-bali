
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Gemini API key belum dikonfigurasi." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const topic = body.topic;
    const difficulty = body.difficulty;

    const allowedTopics = [
      "Pengelolaan Sampah",
      "Lingkungan Bali",
      "Budaya dan Lingkungan Bali",
    ];

    const allowedDifficulties = ["Mudah", "Menengah", "Sulit"];

    if (!allowedTopics.includes(topic) || !allowedDifficulties.includes(difficulty)) {
      return NextResponse.json(
        { success: false, error: "Topik atau tingkat kesulitan tidak valid." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `Buat 5 soal kuis pilihan ganda berbahasa Indonesia.

Topik: ${topic}
Tingkat kesulitan: ${difficulty}

Konteks: Edukasi lingkungan dan pengelolaan sampah di Bali.

Kembalikan HANYA JSON valid dengan struktur:
{
  "questions": [
    {
      "question": "Teks pertanyaan",
      "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
      "correctAnswer": 0,
      "explanation": "Penjelasan singkat jawaban yang benar"
    }
  ]
}

Ketentuan:
- Tepat 5 soal.
- Setiap soal memiliki tepat 4 pilihan.
- correctAnswer adalah indeks jawaban benar, mulai dari 0.
- Pastikan hanya ada satu jawaban benar.
- Penjelasan harus mendidik dan mudah dipahami.
- Jangan sertakan Markdown atau teks di luar JSON.`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error("Gemini tidak menghasilkan soal.");
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
      throw new Error("Format soal dari Gemini tidak valid.");
    }

    return NextResponse.json({
      success: true,
      questions: quiz.questions,
    });
  } catch (error) {
    console.error("Quiz API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Gagal membuat kuis. Silakan coba lagi beberapa saat.",
      },
      { status: 500 }
    );
  }
}
