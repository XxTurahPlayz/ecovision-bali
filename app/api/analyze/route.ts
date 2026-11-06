
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key belum dikonfigurasi." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "Foto sampah tidak ditemukan." },
        { status: 400 }
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar." },
        { status: 400 }
      );
    }

    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran gambar maksimal 5 MB." },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const ai = new GoogleGenAI({ apiKey });

    let response;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: [
            {
              inlineData: {
                mimeType: image.type,
                data: base64,
              },
            },
            `Analisis foto sampah ini untuk aplikasi EcoVision Bali.

Berikan analisis dalam bahasa Indonesia dengan format Markdown:

## 1. Identifikasi Sampah
- Nama objek dan jenis material.
- Kategori sampah: organik, anorganik, atau B3.
- Alasan klasifikasinya.

## 2. Cara Pengelolaan
- Cara memilah dan membersihkan sampah.
- Cara pembuangan atau daur ulang yang tepat.

## 3. Dampak Lingkungan
- Dampak jika sampah tidak dikelola dengan benar.

## 4. Creative Reuse Ideas
Berikan 2 sampai 3 ide kreatif untuk mengubah sampah tersebut menjadi barang yang bermanfaat.
Untuk setiap ide, sertakan:
- Nama kerajinan atau barang.
- Deskripsi manfaatnya.
- Bahan dan alat yang diperlukan.
- Langkah pembuatan singkat.
- Tingkat kesulitan: Mudah, Sedang, atau Sulit.
- Link pencarian tutorial YouTube yang relevan menggunakan format https://www.youtube.com/results?search_query= dan kata kunci yang sesuai.

Pastikan ide sesuai dengan material yang terlihat pada foto. Utamakan ide yang aman, murah, dan mudah dibuat di rumah atau sekolah.

Jangan menyarankan penggunaan ulang material B3 atau material berbahaya untuk kerajinan. Untuk sampah B3, prioritaskan penanganan dan pembuangan yang aman.

Jika objek tidak jelas atau bukan sampah, katakan dengan jujur dan jangan mengarang informasi yang tidak terlihat pada gambar.`,
          ],
        });

        break;
      } catch (error) {
        const status = (error as { status?: number }).status;

        console.error(`Gemini attempt ${attempt} gagal:`, error);

        if (status === 503 && attempt < 2) {
          await sleep(2000);
          continue;
        }

        if (status === 503) {
          return NextResponse.json(
            {
              error:
                "Server Gemini sedang sibuk. Silakan coba beberapa saat lagi.",
            },
            { status: 503 }
          );
        }

        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      analysis:
        response?.text ?? "AI tidak memberikan hasil analisis.",
    });
  } catch (error) {
    console.error("Gemini analysis error:", error);

    return NextResponse.json(
      { error: "Analisis gagal. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
