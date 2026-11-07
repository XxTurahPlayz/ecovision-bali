'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'id' | 'en';
type Entry = { id: string | string[]; en: string | string[] };

const D: Record<string, Entry> = {
  // Navbar
  'nav.home': { id: 'Beranda', en: 'Home' },
  'nav.how': { id: 'Cara Kerja', en: 'How It Works' },
  'nav.categories': { id: 'Kategori Sampah', en: 'Waste Categories' },
  'nav.about': { id: 'Tentang', en: 'About' },
  'nav.start': { id: 'Mulai Identifikasi', en: 'Start Identifying' },
  'nav.homeAria': { id: 'Beranda EcoVision Bali', en: 'EcoVision Bali home' },
  'nav.openMenu': { id: 'Buka menu', en: 'Open menu' },
  'nav.closeMenu': { id: 'Tutup menu', en: 'Close menu' },
  'lang.switch': { id: 'Ganti bahasa', en: 'Switch language' },

  // Hero
  'hero.badge': { id: 'Pengenalan sampah berbasis AI untuk Bali', en: 'AI-powered waste recognition for Bali' },
  'hero.title1': { id: 'Lihat Sampah Berbeda.', en: 'See Waste Differently.' },
  'hero.title2': { id: 'Wujudkan Bali Lebih Hijau.', en: 'Create a Greener Bali.' },
  'hero.desc': {
    id: 'Kenali sampah dengan AI, temukan cara memilah yang tepat, dan ambil langkah kecil menuju Bali yang lebih bersih.',
    en: 'Identify waste with AI, discover the right sorting method, and take a small step toward a cleaner Bali.',
  },
  'hero.cta1': { id: 'Identifikasi Sampahmu', en: 'Identify Your Waste' },
  'hero.cta2': { id: 'Lihat Cara Kerjanya', en: 'Explore How It Works' },
  'hero.check1': { id: 'Empat kategori sampah', en: 'Four waste categories' },
  'hero.check2': { id: 'Panduan pembuangan langkah demi langkah', en: 'Step-by-step disposal guidance' },
  'hero.imgAlt': {
    id: 'Botol plastik dalam kardus, siap didaur ulang',
    en: 'Plastic bottles stored in a cardboard box, ready for recycling',
  },
  'hero.detected': { id: 'Terdeteksi', en: 'Detected' },
  'hero.petName': { id: 'Botol Plastik PET', en: 'PET Plastic Bottle' },
  'hero.recyclable': { id: 'Dapat Didaur Ulang', en: 'Recyclable' },
  'hero.hint': { id: 'Bilas, lalu masukkan ke tempat sampah daur ulang', en: 'Rinse, then place in the recyclable bin' },

  // Scanner
  'scan.badge': { id: 'Pemindai Sampah AI', en: 'AI Waste Scanner' },
  'scan.title': { id: 'Ayo Identifikasi Sampahmu', en: "Let's Identify Your Waste" },
  'scan.desc': {
    id: 'Unggah foto dan biarkan EcoVision AI menganalisis materialnya.',
    en: 'Upload a photo and let EcoVision AI analyze the material.',
  },
  'scan.drag': { id: 'Seret foto ke sini atau klik untuk memilih', en: 'Drag a photo here or click to browse' },
  'scan.drop': { id: 'Lepaskan gambar di sini', en: 'Drop your image here' },
  'scan.formats': { id: 'JPG, JPEG, PNG atau WEBP hingga 10 MB', en: 'JPG, JPEG, PNG or WEBP up to 10 MB' },
  'scan.gallery': { id: 'Pilih dari Galeri', en: 'Choose from Gallery' },
  'scan.camera': { id: 'Ambil Foto', en: 'Take Photo' },
  'scan.replace': { id: 'Ganti', en: 'Replace' },
  'scan.remove': { id: 'Hapus', en: 'Remove' },
  'scan.analyze': { id: 'Analisis Sampah', en: 'Analyze Waste' },
  'scan.analyzing': { id: 'Menganalisis...', en: 'Analyzing...' },
  'scan.analyzingMsg': { id: 'EcoVision sedang menganalisis gambarmu', en: 'EcoVision is analyzing your image' },
  'scan.selectedAlt': { id: 'Gambar sampah terpilih', en: 'Selected waste image' },
  'scan.steps': {
    id: ['Mendeteksi objek', 'Membaca material', 'Mencocokkan aturan pemilahan'],
    en: ['Detecting the object', 'Reading the material', 'Matching sorting rules'],
  },
  'err.format': {
    id: 'Format tidak didukung. Harap unggah gambar JPG, JPEG, PNG, atau WEBP.',
    en: 'Unsupported format. Please upload a JPG, JPEG, PNG, or WEBP image.',
  },
  'err.empty': { id: 'File ini kosong. Silakan pilih gambar lain.', en: 'This file is empty. Please choose a different image.' },
  'err.size': {
    id: 'Gambar lebih besar dari 10 MB. Silakan pilih file yang lebih kecil.',
    en: 'This image is larger than 10 MB. Please choose a smaller file.',
  },
  'err.analysis': { id: 'Analisis gagal. Silakan coba lagi.', en: 'Analysis failed. Please try again.' },

  // Result
  'res.done': { id: 'Analisis selesai', en: 'Analysis completed' },
  'res.title': { id: 'Hasil Analisis Sampah', en: 'Waste Analysis Result' },
  'res.powered': { id: 'Analisis gambar didukung oleh AI.', en: 'Image analysis powered by AI.' },
  'res.heading': { id: 'Hasil Analisis Sampah', en: 'Waste Analysis Results' },
  'res.reuse': { id: 'Ide Daur Ulang Kreatif', en: 'Creative Reuse Ideas' },
  'res.reuseSub': { id: 'Ubah sampah menjadi sesuatu yang berguna!', en: 'Turn waste into something useful!' },
  'res.watch': { id: 'Tonton Tutorial YouTube', en: 'Watch YouTube Tutorial' },
  'res.note': {
    id: 'Ikuti rekomendasi pengelolaan sampah berdasarkan hasil analisis. Pastikan untuk memeriksa kembali jenis material sebelum membuang atau mendaur ulangnya.',
    en: 'Follow the waste management recommendations based on the analysis results. Be sure to double-check the type of material before throwing it away or recycling it.',
  },
  'res.photoAlt': { id: 'Foto sampah yang dianalisis', en: 'Analyzed waste photo' },

  // History
  'hist.title': { id: 'Riwayat Analisis', en: 'Analysis History' },
  'hist.clear': { id: 'Hapus Semua', en: 'Clear All' },
  'hist.details': { id: 'Detail Riwayat Analisis', en: 'Analysis History Details' },
  'hist.close': { id: '✕ Tutup', en: '✕ Close' },
  'hist.delete': { id: 'Hapus riwayat', en: 'Delete history' },
  'hist.confirmTitle': { id: 'Hapus Semua Riwayat?', en: 'Clear All History?' },
  'hist.confirmDesc': {
    id: 'Semua riwayat analisis yang tersimpan di perangkat ini akan dihapus permanen.',
    en: 'All analysis history saved on this device will be permanently deleted.',
  },
  'hist.cancel': { id: 'Batal', en: 'Cancel' },
  'hist.confirm': { id: 'Ya, Hapus', en: 'Yes, Delete' },

  // Categories section
  'cat.label': { id: 'Kategori Sampah', en: 'Waste Categories' },
  'cat.title': { id: 'Empat kategori. Satu sistem sederhana.', en: 'Four categories. One simple system.' },
  'cat.desc': {
    id: 'Setiap benda masuk ke salah satu dari empat kelompok. Pelajari apa masuk ke mana, lalu buka panduan pemilahannya.',
    en: 'Every item belongs to one of four groups. Learn what goes where, then open the sorting guidance for each.',
  },
  'cat.examples': { id: 'Contoh', en: 'Examples' },
  'cat.guidance': { id: 'Panduan pemilahan', en: 'Sorting guidance' },

  'cat.organic.name': { id: 'Sampah Organik', en: 'Organic Waste' },
  'cat.organic.desc': {
    id: 'Sampah hayati dari makanan dan alam yang dapat kembali ke tanah.',
    en: 'Biodegradable waste from food and nature that can return to the soil.',
  },
  'cat.organic.ex': {
    id: ['Kulit buah', 'Sisa makanan', 'Canang dan sesajen bunga', 'Daun dan sampah kebun', 'Ampas kopi'],
    en: ['Fruit peels', 'Food scraps', 'Canang and flower offerings', 'Leaves and garden waste', 'Coffee grounds'],
  },
  'cat.organic.guide': {
    id: 'Pisahkan sisa makanan, daun, dan sesajen bunga alami dari plastik, staples, dan bahan non-organik lainnya. Olah sampah organik yang sesuai menjadi kompos di rumah atau kirim ke fasilitas pengolahan sampah organik. Untuk canang, pisahkan bahan alami dari hiasan plastik atau sintetis sebelum diolah.',
    en: 'Separate food scraps, leaves, and natural flower offerings from plastic, staples, and other non-organic materials. Compost suitable organic waste at home or send it to an organic waste processing facility. For canang offerings, separate natural materials from plastic or synthetic decorations before processing.',
  },

  'cat.recyclable.name': { id: 'Sampah Daur Ulang', en: 'Recyclable Waste' },
  'cat.recyclable.desc': {
    id: 'Bahan bersih dan kering yang dapat dikumpulkan dan diolah menjadi produk baru.',
    en: 'Clean, dry materials that can be collected and remade into new products.',
  },
  'cat.recyclable.ex': {
    id: ['Botol plastik', 'Kertas', 'Kardus', 'Botol kaca'],
    en: ['Plastic bottles', 'Paper', 'Cardboard', 'Glass bottles'],
  },
  'cat.recyclable.guide': {
    id: 'Pisahkan bahan daur ulang seperti botol plastik, kertas, kardus, dan kaca. Kosongkan dan bilas wadah, buang sisa makanan, dan jaga agar tetap kering. Pisahkan berdasarkan jenis bahan dan cek apakah bank sampah atau fasilitas daur ulang setempat menerimanya. Tidak semua jenis plastik dapat didaur ulang.',
    en: 'Separate recyclable materials such as plastic bottles, paper, cardboard, and glass. Empty and rinse containers, remove food residue, and keep materials dry. Separate items by material and check whether your local waste bank or recycling facility accepts them. Not all types of plastic can be recycled.',
  },

  'cat.residual.name': { id: 'Sampah Residu', en: 'Residual Waste' },
  'cat.residual.desc': {
    id: 'Sampah campuran atau kotor yang tidak dapat didaur ulang maupun dikomposkan.',
    en: 'Mixed or dirty waste that cannot be recycled or composted.',
  },
  'cat.residual.ex': {
    id: ['Kemasan kotor', 'Bungkus keripik', 'Kotak makanan berminyak', 'Bahan berlaminasi'],
    en: ['Dirty packaging', 'Chip wrappers', 'Greasy food boxes', 'Laminated materials'],
  },
  'cat.residual.guide': {
    id: 'Pisahkan sampah residu dari sampah organik, daur ulang, dan berbahaya. Bungkus rapat sampah kotor atau tajam agar tidak melukai dan tidak bocor. Kurangi kemasan sekali pakai sebisa mungkin, dan buang sisa sampah residu lewat layanan pengangkutan sampah setempat. Jangan membakar sampah atau membuangnya ke sungai, pantai, maupun lahan terbuka.',
    en: 'Separate residual waste from organic, recyclable, and hazardous materials. Wrap dirty or sharp waste securely to prevent injury and leakage. Reduce single-use packaging whenever possible, and dispose of remaining residual waste through the local waste collection service. Do not burn waste or dump it into rivers, beaches, or open land.',
  },

  'cat.hazardous.name': { id: 'Sampah B3 (Berbahaya)', en: 'Hazardous Waste' },
  'cat.hazardous.desc': {
    id: 'Bahan yang dapat membahayakan manusia atau lingkungan jika dibuang bersama sampah rumah tangga.',
    en: 'Materials that can harm people or the environment if thrown away with household waste.',
  },
  'cat.hazardous.ex': {
    id: ['Baterai', 'Sampah elektronik', 'Bahan kimia', 'Lampu neon'],
    en: ['Batteries', 'Electronic waste', 'Chemicals', 'Fluorescent bulbs'],
  },
  'cat.hazardous.guide': {
    id: 'Jangan campur sampah berbahaya dengan sampah rumah tangga biasa. Simpan baterai, sampah elektronik, lampu, dan wadah bahan kimia secara terpisah di tempat yang kering dan aman, jauh dari anak-anak dan panas. Jangan dibuka, dibakar, atau dibongkar. Hubungi dinas lingkungan setempat atau fasilitas pengumpulan resmi untuk pembuangan yang aman.',
    en: 'Never mix hazardous waste with regular household waste. Keep batteries, electronic waste, lamps, and chemical containers separate. Store them safely in a dry, secure place away from children and heat. Do not open, burn, or dismantle them. Contact your local waste authority or an authorized collection facility for safe disposal.',
  },

  // How it works
  'how.label': { id: 'Cara Kerja', en: 'How It Works' },
  'how.title': { id: 'Dari foto hingga pembuangan yang tepat dalam tiga langkah', en: 'From photo to proper disposal in three steps' },
  'how.1.title': { id: 'Unggah', en: 'Upload' },
  'how.1.desc': { id: 'Ambil foto atau unggah gambar sampahmu.', en: 'Take a photo or upload an image of your waste.' },
  'how.2.title': { id: 'Pengenalan AI', en: 'AI Recognition' },
  'how.2.desc': {
    id: 'EcoVision menganalisis gambar dan mengidentifikasi kategori sampah.',
    en: 'EcoVision analyzes the image and identifies the waste category.',
  },
  'how.3.title': { id: 'Panduan Cerdas', en: 'Smart Guidance' },
  'how.3.desc': {
    id: 'Dapatkan rekomendasi jelas tentang cara memilah dan membuangnya.',
    en: 'Get clear recommendations on how to sort and dispose of it.',
  },

  // About
  'about.label': { id: 'Dampak Lingkungan Bali', en: 'Bali Environmental Impact' },
  'about.title': { id: 'Aksi Kecil. Bali Lebih Bersih.', en: 'Small Actions. Cleaner Bali.' },
  'about.desc': {
    id: 'Keindahan alam Bali terhubung dengan cara kita mengelola sampah setiap hari. Dari kemasan plastik di kawasan wisata hingga sampah organik rumah tangga dan kegiatan adat, pembuangan yang tidak tepat dapat memengaruhi pantai, sungai, sawah, dan masyarakat setempat. EcoVision Bali menggunakan AI untuk membantu orang mengenali sampah dan mengambil keputusan pemilahan yang lebih baik.',
    en: "Bali's natural beauty is connected to how we manage waste every day. From plastic packaging in tourist areas to organic waste from households and traditional activities, improper disposal can affect beaches, rivers, rice fields, and local communities. EcoVision Bali uses AI to help people identify waste and make better sorting decisions.",
  },
  'about.p1.title': { id: 'Pemilahan Sampah Berbasis AI', en: 'AI-Powered Waste Sorting' },
  'about.p1.desc': {
    id: 'AI membantu pengguna mengenali material sampah dan memahami langkah pemilahan yang benar, sehingga pengelolaan sampah yang bertanggung jawab lebih mudah bagi semua orang.',
    en: 'AI helps users recognize waste materials and understand the right sorting steps, making responsible waste management easier for everyone.',
  },
  'about.p2.title': { id: 'Kesadaran Daur Ulang', en: 'Recycling Awareness' },
  'about.p2.desc': {
    id: 'Panduan praktis mendorong orang memisahkan bahan daur ulang dan terhubung dengan bank sampah serta fasilitas daur ulang setempat.',
    en: 'Practical guidance encourages people to separate recyclable materials and connect with local waste banks and recycling facilities.',
  },
  'about.p3.title': { id: 'Melindungi Lingkungan Bali', en: 'Protecting Bali’s Environment' },
  'about.p3.desc': {
    id: 'Pemilahan dan pembuangan sampah yang tepat membantu mengurangi polusi yang mengancam pantai, sungai, sawah, dan kehidupan laut Bali.',
    en: 'Proper waste separation and disposal help reduce pollution that threatens Bali’s beaches, rivers, rice fields, and marine life.',
  },
  'about.p4.title': { id: 'Komunitas Berkelanjutan', en: 'Sustainable Communities' },
  'about.p4.desc': {
    id: 'Rumah tangga, sekolah, usaha, dan komunitas lokal dapat membangun desa yang lebih bersih lewat kebiasaan memilah sampah yang sederhana dan konsisten.',
    en: 'Households, schools, businesses, and local communities can build cleaner villages through simple and consistent waste-sorting habits.',
  },

  // Footer
  'foot.desc': {
    id: 'Asisten pengenalan dan pemilahan sampah berbasis AI yang membantu masyarakat Bali memilah sampah dengan benar dan menjaga kebersihan pulau.',
    en: 'An AI-powered waste recognition and sorting assistant helping people in Bali sort waste correctly and keep the island clean.',
  },
  'foot.explore': { id: 'Jelajahi', en: 'Explore' },
  'foot.contact': { id: 'Kontak', en: 'Contact' },
  'foot.contactText': { id: 'Detail kontak akan ditambahkan di sini sebelum peluncuran.', en: 'Contact details will be added here before launch.' },
  'foot.rights': { id: 'Hak cipta dilindungi.', en: 'All rights reserved.' },

  // Quiz
  'quiz.badge': { id: 'Tantangan Belajar Eko', en: 'Eco Learning Challenge' },
  'quiz.title': { id: 'Uji Pengetahuan Ekomu', en: 'Test Your Eco Knowledge' },
  'quiz.desc': {
    id: 'Tantang pengetahuanmu tentang pengelolaan sampah, lingkungan, dan budaya Bali lewat kuis interaktif berbasis AI.',
    en: 'Challenge your knowledge of waste management, the environment, and Balinese culture through an interactive AI-powered quiz.',
  },
  'quiz.ready': { id: 'Siap Jadi Pahlawan Lingkungan?', en: 'Ready to Become an Eco Hero?' },
  'quiz.topic': { id: 'Pilih Topik', en: 'Choose a Topic' },
  'quiz.diff': { id: 'Tingkat Kesulitan', en: 'Difficulty Level' },
  'quiz.t1': { id: 'Pengelolaan Sampah', en: 'Waste Management' },
  'quiz.t2': { id: 'Lingkungan Bali', en: 'Bali Environment' },
  'quiz.t3': { id: 'Budaya dan Lingkungan Bali', en: 'Balinese Culture and Environment' },
  'quiz.easy': { id: 'Mudah', en: 'Easy' },
  'quiz.medium': { id: 'Sedang', en: 'Medium' },
  'quiz.hard': { id: 'Sulit', en: 'Hard' },
  'quiz.start': { id: 'Mulai Kuis', en: 'Start Quiz' },
  'quiz.creating': { id: 'Membuat kuis...', en: 'Creating your quiz...' },
  'quiz.createFail': { id: 'Gagal membuat kuis.', en: 'Failed to create the quiz.' },
  'quiz.error': { id: 'Terjadi kesalahan.', en: 'An error occurred.' },
  'quiz.complete': { id: 'Kuis Selesai!', en: 'Quiz Complete!' },
  'quiz.score': { id: 'Skormu', en: 'Your score' },
  'quiz.outOf': { id: 'dari', en: 'out of' },
  'quiz.again': { id: 'Main Lagi', en: 'Play Again' },
  'quiz.question': { id: 'Pertanyaan', en: 'Question' },
  'quiz.of': { id: 'dari', en: 'of' },
  'quiz.scoreShort': { id: 'Skor', en: 'Score' },
  'quiz.correct': { id: '🎉 Jawaban Benar!', en: '🎉 Correct Answer!' },
  'quiz.wrong': { id: '💡 Belum Tepat!', en: '💡 Not Quite!' },
  'quiz.results': { id: 'Lihat Hasil', en: 'See Results' },
  'quiz.next': { id: 'Pertanyaan Berikutnya →', en: 'Next Question →' },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  tl: (key: string) => string[];
};

const LangContext = createContext<Ctx | null>(null);
const STORAGE_KEY = 'ecovision-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('id');

  // Load saved choice, or fall back to the browser language
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'id' || saved === 'en') {
        setLangState(saved);
        return;
      }
      setLangState(navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key) => {
        const v = D[key]?.[lang];
        return typeof v === 'string' ? v : key;
      },
      tl: (key) => {
        const v = D[key]?.[lang];
        return Array.isArray(v) ? v : [];
      },
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}

/** Animated pill toggle: ID | EN */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const options: { id: Lang; label: string; full: string }[] = [
    { id: 'id', label: 'ID', full: 'Bahasa Indonesia' },
    { id: 'en', label: 'EN', full: 'English' },
  ];

  return (
    <div
      role="group"
      aria-label={t('lang.switch')}
      className={`relative inline-grid h-10 grid-cols-2 items-center rounded-full border border-[#DDF3E5] bg-white p-1 text-xs font-bold shadow-sm ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-1 top-1 h-8 w-[calc(50%-4px)] rounded-full bg-[#238653] shadow transition-transform duration-300 ease-out"
        style={{ transform: lang === 'id' ? 'translateX(0)' : 'translateX(100%)' }}
      />
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setLang(o.id)}
          aria-pressed={lang === o.id}
          aria-label={o.full}
          title={o.full}
          className={`relative z-10 flex h-8 w-11 items-center justify-center rounded-full tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#238653]/40 ${
            lang === o.id ? 'text-white' : 'text-[#17251D]/70 hover:text-[#238653]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
