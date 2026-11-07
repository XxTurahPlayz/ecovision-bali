import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

type Lang = "id" | "en";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// All language-dependent text lives here so the prompt stays in one place.
const TEXT = {
  id: {
    noKey: "Kunci API Gemini belum dikonfigurasi.",
    noImage: "Gambar sampah tidak ditemukan.",
    notImage: "File yang diunggah harus berupa gambar.",
    tooBig: "Ukuran gambar maksimal adalah 5 MB.",
    busy: "Gemini sedang sibuk. Silakan coba lagi beberapa saat lagi.",
    empty: "AI tidak mengembalikan hasil analisis.",
    failed: "Analisis gagal. Silakan coba lagi.",
    languageName: "Indonesian (Bahasa Indonesia)",
    languageRule:
      "IMPORTANT: Write the ENTIRE response in clear, natural, professional Indonesian (Bahasa Indonesia). Do not use English or mix languages. This includes all headings, explanations, recommendations, craft names, and difficulty levels. Use exactly the Indonesian headings given below.",
    h1: "## 1. Identifikasi Sampah",
    h2: "## 2. Rekomendasi Pengelolaan Sampah",
    h3: "## 3. Dampak Lingkungan",
    h4: "## 4. Ide Daur Ulang Kreatif",
    classify: "organik, anorganik, atau B3 (bahan berbahaya dan beracun)",
    levels: "Mudah, Sedang, atau Sulit",
    youtubeHint: "Use Indonesian search keywords, for example: tutorial kerajinan dari botol plastik.",
    closing: "Do not include English sentences in the response.",
  },
  en: {
    noKey: "Gemini API key is not configured.",
    noImage: "No waste image was provided.",
    notImage: "The uploaded file must be an image.",
    tooBig: "The maximum image size is 5 MB.",
    busy: "Gemini is currently experiencing high demand. Please try again in a few moments.",
    empty: "The AI did not return an analysis.",
    failed: "Analysis failed. Please try again.",
    languageName: "English",
    languageRule:
      "IMPORTANT: Write the ENTIRE response in clear, natural, professional English. Do not use Indonesian or mix languages. This includes all headings, explanations, recommendations, craft names, and difficulty levels. Use exactly the English headings given below.",
    h1: "## 1. Waste Identification",
    h2: "## 2. Waste Management Recommendations",
    h3: "## 3. Environmental Impact",
    h4: "## 4. Creative Reuse Ideas",
    classify: "organic, inorganic, or hazardous waste",
    levels: "Easy, Medium, or Hard",
    youtubeHint: "Use English search keywords, for example: plastic bottle craft tutorial.",
    closing: "Do not include any Indonesian words or sentences in the response.",
  },
} as const;

export async function POST(request: Request) {
  // Default to English until we have read the form (so early errors still have a language)
  let lang: Lang = "en";

  try {
    const formData = await request.formData();
    lang = formData.get("lang") === "id" ? "id" : "en";
    const L = TEXT[lang];

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: L.noKey }, { status: 500 });
    }

    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json({ error: L.noImage }, { status: 400 });
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json({ error: L.notImage }, { status: 400 });
    }

    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: L.tooBig }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Analyze this waste image for the EcoVision Bali application.

${L.languageRule}

Use the following Markdown structure:

${L.h1}
- Identify the visible object and its material.
- Classify it as ${L.classify}.
- Explain why it belongs to that category.
- If possible, mention the likely material type, but do not guess when uncertain.

${L.h2}
- Explain how to properly sort and clean the waste.
- Describe the appropriate disposal, recycling, or composting method.
- Include practical recommendations relevant to households, schools, and communities in Bali when appropriate.

${L.h3}
- Explain the potential environmental consequences of improper waste management.
- Include relevant impacts on Bali's beaches, rivers, rice fields, marine ecosystems, and communities when appropriate.

${L.h4}
Provide 2 to 3 creative ideas for turning the identified waste into useful items.

For each idea, include:
- Craft or product name.
- A short description of its purpose and benefits.
- Required materials and tools.
- Simple step-by-step instructions.
- Difficulty level: ${L.levels}.
- A relevant YouTube tutorial search link using this format:
  a Markdown link on its own line, written as [YouTube](https://www.youtube.com/results?search_query=keyword+one+keyword+two). Join keywords with + (no spaces inside the URL). ${L.youtubeHint}

Make sure every idea matches the material visible in the image. Prioritize ideas that are safe, affordable, and easy to make at home or at school.

Never recommend reusing hazardous or dangerous materials for crafts. For hazardous waste, prioritize safe handling, storage, and proper disposal.

If the object is unclear or does not appear to be waste, state this honestly in ${L.languageName}. Do not invent details that cannot be confirmed from the image.

${L.closing}`;

    let response;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: [{ inlineData: { mimeType: image.type, data: base64 } }, prompt],
        });

        break;
      } catch (error) {
        const status = (error as { status?: number }).status;

        console.error(`Gemini attempt ${attempt} failed:`, error);

        if (status === 503 && attempt < 2) {
          await sleep(2000);
          continue;
        }

        if (status === 503) {
          return NextResponse.json({ error: L.busy }, { status: 503 });
        }

        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      analysis: response?.text ?? L.empty,
    });
  } catch (error) {
    console.error("Gemini analysis error:", error);

    return NextResponse.json({ error: TEXT[lang].failed }, { status: 500 });
  }
}
