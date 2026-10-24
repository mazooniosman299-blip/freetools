const translations = {
  en: {
    nav_tools: "Tools",
    nav_about: "About",
    nav_privacy: "Privacy",
    nav_contact: "Contact",
    nav_terms: "Terms",
    hero_title: "Free Online Calculators & Converters",
    hero_sub: "Fast, accurate, private tools. No signup. Works offline after first load. Arabic & English.",
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
      word: { title: "Word & Character Counter", desc: "Count words, characters, reading time" }
    }
  },
  ar: {
    nav_tools: "الأدوات",
    nav_about: "من نحن",
    nav_privacy: "الخصوصية",
    nav_contact: "تواصل",
    nav_terms: "الشروط",
    hero_title: "حاسبات ومحولات مجانية أونلاين",
    hero_sub: "أدوات سريعة ودقيقة وخاصة. بدون تسجيل. تعمل بدون إنترنت بعد التحميل. عربي وإنجليزي.",
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
      word: { title: "عداد الكلمات والأحرف", desc: "عد الكلمات والأحرف ووقت القراءة" }
    }
  }
};

let currentLang = localStorage.getItem("ft_lang") || (navigator.language.startsWith("ar") ? "ar" : "en");

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
