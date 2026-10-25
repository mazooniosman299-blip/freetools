const translations = {
  en: {
    nav_tools: "Tools",
    nav_about: "About",
    nav_privacy: "Privacy",
    nav_contact: "Contact",
    nav_terms: "Terms",
    hero_title: "Free Online Calculators & Converters",
    hero_sub: "Fast, accurate, private tools. No account needed. Arabic & English.",
    search_placeholder: "Search tools… e.g. BMI, cm to inch, percentage",
    tools_heading: "Popular Tools",
    why_title: "Why use FreeTools?",
    feat1_title: "100% Free & Private",
    feat1_desc: "All calculations run in your browser. We never upload your numbers.",
    feat2_title: "Bilingual AR / EN",
    feat2_desc: "Full Arabic and English interface with proper RTL support.",
    feat3_title: "Mobile First",
    feat3_desc: "Designed for phones. Fast load, clear results, dark mode.",
    footer_note: "Free calculators for everyone.",
    faq_heading: "Common questions about our online tools",
    faq1_q: "How do the tools work?",
    faq1_a: "Choose a calculator or utility, enter your details and see a result on the same page. Conversions and calculations are performed by JavaScript in your browser. Many tools update automatically when you edit a value, so there is no registration or account setup.",
    faq2_q: "Are results accurate?",
    faq2_a: "Standard unit conversions use defined factors, while financial and health tools provide estimates based on their stated assumptions. Check important results independently. BMI and calorie tools cannot replace professional medical advice, and a loan quote may differ from your lender's actual terms.",
    faq3_q: "Are uploads or payments required?",
    faq3_a: "No registration or payment is required. Photos are resized and converted in your browser; JSON, text, QR and passwords are processed locally too. We do not send the content entered into our utility forms to our servers. Browser support for image formats and secure APIs may vary.",
    tools: {
      unit: { title: "Unit Converter", desc: "Length, weight, temperature, volume, area, speed & more" },
      bmi: { title: "BMI Calculator", desc: "Body Mass Index with WHO categories" },
      percentage: { title: "Percentage Calculator", desc: "Find %, increase, decrease or change" },
      age: { title: "Age Calculator", desc: "Exact age in years, months and days" },
      tip: { title: "Tip Calculator", desc: "Split bills and calculate tips easily" },
      discount: { title: "Discount Calculator", desc: "Sale price and savings percentage" },
      loan: { title: "Loan / EMI Calculator", desc: "Monthly payment, total interest" },
      calorie: { title: "BMR & Calorie Calculator", desc: "Daily calorie needs (Mifflin formula)" },
      date: { title: "Date Difference", desc: "Days between two dates" },
      word: { title: "Word & Character Counter", desc: "Count words, characters, reading time" },
      password: { title: "Secure Password Generator", desc: "Private, random, customizable passwords" },
      json: { title: "JSON Formatter & Validator", desc: "Validate, format, minify and download JSON" },
      image: { title: "Image Compressor & Converter", desc: "Compress JPEG/WebP and convert image formats" },
      qr: { title: "QR Code Generator", desc: "Create downloadable QR codes locally" },
      text: { title: "Text Case & Cleanup Tools", desc: "Change letter case and clean up lines" },
      base64: { title: "Base64 Encoder & Decoder", desc: "Encode or decode Unicode text as Base64" }
    }
  },
  ar: {
    nav_tools: "الأدوات",
    nav_about: "من نحن",
    nav_privacy: "الخصوصية",
    nav_contact: "تواصل",
    nav_terms: "الشروط",
    hero_title: "حاسبات ومحولات مجانية أونلاين",
    hero_sub: "أدوات سريعة ودقيقة وخاصة. بدون تسجيل. عربي وإنجليزي. بدون تسجيل.",
    search_placeholder: "ابحث عن أداة… مثل BMI، سم إلى إنش، نسبة مئوية",
    tools_heading: "الأدوات الشائعة",
    why_title: "لماذا FreeTools؟",
    feat1_title: "مجاني 100% وخاص",
    feat1_desc: "كل الحسابات تتم في متصفحك. لا نرفع أرقامك أبداً.",
    feat2_title: "ثنائي اللغة عربي / إنجليزي",
    feat2_desc: "واجهة كاملة بالعربية والإنجليزية مع دعم RTL.",
    feat3_title: "مصمم للجوال",
    feat3_desc: "يعمل بسلاسة على الهواتف. تحميل سريع ووضع ليلي.",
    footer_note: "حاسبات مجانية للجميع.",
    faq_heading: "أسئلة شائعة حول أدواتنا المجانية",
    faq1_q: "كيف تعمل هذه الأدوات؟",
    faq1_a: "اختر الأداة، وأدخل بياناتك، وستظهر النتيجة في الصفحة نفسها. تتم العمليات الحسابية والتحويلات باستخدام JavaScript داخل المتصفح. تتحدث نتائج أدوات كثيرة عند تعديل القيم، دون تسجيل حساب أو إنشاء عضوية.",
    faq2_q: "هل النتائج دقيقة؟",
    faq2_a: "تعتمد التحويلات العادية على معاملات قياسية محددة، لكن حاسبات المال والصحة تقدم تقديرات وفق افتراضات موضحة. تحقق من النتائج المهمة بشكل مستقل؛ فحاسبات الوزن والسعرات لا تغني عن المختصين، وقد يختلف قسط البنك الفعلي.",
    faq3_q: "هل يتطلب الاستخدام رفع ملفات أو دفع رسوم؟",
    faq3_a: "لا تحتاج إلى التسجيل أو الدفع. تُعالج الصور والنصوص وJSON ورموز QR وكلمات المرور داخل المتصفح ولا ترسل الأداة محتوى الحقول إلى خوادمنا. يختلف دعم بعض صيغ الصور والواجهات الآمنة من متصفح لآخر.",
    tools: {
      unit: { title: "محول الوحدات", desc: "طول، وزن، حرارة، حجم، مساحة، سرعة والمزيد" },
      bmi: { title: "حاسبة مؤشر كتلة الجسم", desc: "BMI مع تصنيفات منظمة الصحة العالمية" },
      percentage: { title: "حاسبة النسبة المئوية", desc: "احسب النسبة أو الزيادة أو النقصان" },
      age: { title: "حاسبة العمر", desc: "عمرك بالضبط بالسنوات والأشهر والأيام" },
      tip: { title: "حاسبة البقشيش", desc: "قسم الفاتورة واحسب الإكرامية بسهولة" },
      discount: { title: "حاسبة الخصم", desc: "سعر البيع بعد الخصم ونسبة التوفير" },
      loan: { title: "حاسبة القرض / القسط", desc: "القسط الشهري وإجمالي الفائدة" },
      calorie: { title: "حاسبة السعرات والـ BMR", desc: "احتياجك اليومي من السعرات (معادلة ميفلين)" },
      date: { title: "الفرق بين تاريخين", desc: "عدد الأيام بين تاريخين" },
      word: { title: "عداد الكلمات والأحرف", desc: "عد الكلمات والأحرف ووقت القراءة" },
      password: { title: "مولّد كلمات مرور آمنة", desc: "كلمات مرور عشوائية وخاصة وقابلة للتخصيص" },
      json: { title: "منسّق وفاحص JSON", desc: "افحص JSON ونسّقه وصغّره ونزّله" },
      image: { title: "ضغط الصور وتحويل الصيغ", desc: "اضغط صور JPEG وWebP وحوّل صيغ الصور" },
      qr: { title: "مولّد رموز QR", desc: "أنشئ رمز QR قابل للتنزيل دون رفع بياناتك" },
      text: { title: "تحويل حالة النص وتنظيفه", desc: "تحويل الحروف وتنظيف الأسطر والتكرار" },
      base64: { title: "ترميز وفك Base64", desc: "ترميز النصوص العربية أو فكها باستخدام UTF-8" }
    }
  }
};

const queryLang = new URLSearchParams(window.location.search).get("lang");
let currentLang = ["en","ar"].includes(queryLang) ? queryLang : (localStorage.getItem("ft_lang") || (navigator.language.startsWith("ar") ? "ar" : "en"));

function applyI18n() {
  const t = translations[currentLang];
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = currentLang === "en" ? "العربية" : "English";

  if (typeof renderTools === "function") renderTools();
}

function toggleLang() {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("ft_lang", currentLang);
  applyI18n();
}

document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.addEventListener("click", toggleLang);
});
