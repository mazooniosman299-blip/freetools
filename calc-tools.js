/* FreeTools — bilingual client-side calculators; no input values leave the browser. */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const lang = () => localStorage.getItem("ft_lang") === "ar" ? "ar" : "en";
const T = (en, ar) => lang() === "ar" ? ar : en;
const fmt = n => Number.isFinite(n) ? new Intl.NumberFormat(lang() === "ar" ? "ar" : "en", {maximumSignificantDigits: 10}).format(n) : "—";
const number = id => { const el = $(id); if(!el || el.value.trim() === "") return NaN; return Number(el.value); };
const positive = (...values) => values.every(n => Number.isFinite(n) && n > 0);
const nonnegative = (...values) => values.every(n => Number.isFinite(n) && n >= 0);
const input = (id, label, value="", min="", step="any") => '<div class="form-group"><label for="'+id+'">'+label+'</label><input id="'+id+'" type="number" inputmode="decimal" value="'+value+'"'+(min!==""?' min="'+min+'"':"")+' step="'+step+'"></div>';
const dateInput = (id, label) => '<div class="form-group"><label for="'+id+'">'+label+'</label><input id="'+id+'" type="date"></div>';
const opts = entries => entries.map(item=>'<option value="'+item[0]+'">'+item[1]+'</option>').join("");
const select = (id, label, entries) => '<div class="form-group"><label for="'+id+'">'+label+'</label><select id="'+id+'">'+opts(entries)+'</select></div>';
const result = (value, detail="") => { $("result").hidden=false; $("result-value").textContent=value; $("result-detail").textContent=detail; };
const error = message => result(T("Check your inputs: ","راجع القيم المدخلة: ") + (message || T("enter valid values.", "أدخل قيماً صحيحة.")));
const unitTypes = {
length:[["mm",0.001,"mm"],["cm",0.01,"cm"],["m",1,"m"],["km",1000,"km"],["in",0.0254,"in"],["ft",0.3048,"ft"],["yd",0.9144,"yd"],["mi",1609.344,"mi"]],
mass:[["mg",0.000001,"mg"],["g",0.001,"g"],["kg",1,"kg"],["lb",0.45359237,"lb"],["oz",0.028349523125,"oz"]],
temperature:[["C",1,"°C"],["F",1,"°F"],["K",1,"K"]],
volume:[["mL",0.001,"mL"],["L",1,"L"],["us_cup",0.2365882365,"US cup"],["us_gal",3.785411784,"US gallon"]],
area:[["sqm",1,"m²"],["sqkm",1000000,"km²"],["sqft",0.09290304,"ft²"],["acre",4046.8564224,"acre"]],
speed:[["mps",1,"m/s"],["kmh",1/3.6,"km/h"],["mph",0.44704,"mph"],["knot",0.514444444444,"knot"]]
};
const toolInfo = {
unit:{title:["Unit Converter","محول الوحدات"],desc:["Convert length, mass, temperature, volume, area and speed using defined conversion factors.","حوّل الطول والكتلة والحرارة والحجم والمساحة والسرعة بمعاملات واضحة."],note:["US cups and gallons are US customary units.","الأكواب والجالونات المستخدمة بالمقاييس الأمريكية."]},
bmi:{title:["BMI Calculator","حاسبة مؤشر كتلة الجسم"],desc:["Compute adult BMI from weight in kilograms and height in centimeters.","احسب مؤشر كتلة الجسم للبالغين من الوزن بالكيلوغرام والطول بالسنتيمتر."],note:["BMI is a screening measure, not a medical diagnosis; adult ranges are not suitable for children.","مؤشر الكتلة وسيلة استرشادية وليس تشخيصاً طبياً، وتصنيفات البالغين لا تنطبق على الأطفال."]},
tip:{title:["Tip Calculator","حاسبة الإكرامية"],desc:["Calculate a tip, total bill and amount per person.","احسب قيمة الإكرامية والإجمالي وحصة كل شخص."],note:["Amounts use whichever currency you enter; results are not converted between currencies.","المبالغ بنفس العملة التي تدخلها، ولا يجري تحويل العملات."]},
discount:{title:["Discount Calculator","حاسبة الخصم"],desc:["Find the final sale price and how much you save on a percentage discount.","احسب السعر بعد التخفيض والمبلغ الذي توفره."],note:["Sales tax, shipping and additional fees are not included.","لا تشمل النتيجة الضريبة والشحن والرسوم الإضافية."]},
loan:{title:["Loan Payment Calculator","حاسبة أقساط القروض"],desc:["Estimate monthly loan payments with a fixed interest rate and equal monthly installments.","قدّر القسط الشهري لقرض بفائدة ثابتة وأقساط شهرية متساوية."],note:["Estimate only: excludes fees, insurance and variable rates. Consult your lender for exact terms.","تقدير لا يشمل الرسوم والتأمين والفائدة المتغيرة. راجع الجهة الممولة للتفاصيل."]},
calorie:{title:["BMR & Daily Calorie Calculator","حاسبة الحرق والسعرات"],desc:["Estimate resting metabolic rate with Mifflin–St Jeor and daily energy needs using an activity multiplier.","قدّر معدل الأيض الأساسي بمعادلة ميفلين واحتياج الطاقة اليومي بحسب النشاط."],note:["General adult estimate only; not medical advice or a personalized nutrition plan.","تقدير عام للبالغين وليس تشخيصاً أو خطة تغذية شخصية."]},
date:{title:["Date Difference Calculator","حاسبة الفرق بين تاريخين"],desc:["Find the number of elapsed days between any two dates, using UTC calendar days.","احسب عدد الأيام بين تاريخين تقويميين."],note:["The result counts elapsed days; it does not count both endpoints inclusively.","النتيجة تحسب الأيام المنقضية ولا تعد يوم البداية والنهاية معاً."]},
word:{title:["Word & Character Counter","عداد الكلمات والأحرف"],desc:["Count words, Unicode characters, characters without whitespace and estimated reading time.","احسب الكلمات والأحرف والأحرف بدون مسافات وزمن القراءة التقريبي."],note:["Reading time assumes about 200 words per minute; results are estimates.","يعتمد زمن القراءة على نحو 200 كلمة في الدقيقة وهو تقديري."]}
};
let tool;
function snapshot(){const out={}; document.querySelectorAll("#calc-form input,#calc-form select,#calc-form textarea").forEach(el=>out[el.id]=el.value);return out;}
function buildForm(saved={}) {
 const area=$("calc-form"); let h="";
 if(tool==="unit"){
  const types=[["length",T("Length","الطول")],["mass",T("Mass","الكتلة")],["temperature",T("Temperature","الحرارة")],["volume",T("Volume","الحجم")],["area",T("Area","المساحة")],["speed",T("Speed","السرعة")]];
  const chosen = unitTypes[saved.category] ? saved.category : "length";
  const choices = unitTypes[chosen].map(u=>[u[0],u[2]]);
  h='<div class="form-row">'+select("category",T("Measurement","القياس"),types)+input("value",T("Value","القيمة"),1)+select("from",T("From","من"),choices)+select("to",T("To","إلى"),choices)+'</div>';
 }else if(tool==="bmi"){
  h='<div class="form-row">'+input("weight",T("Weight (kg)","الوزن (كغ)"),70,0.1)+input("height",T("Height (cm)","الطول (سم)"),175,0.1)+'</div>';
 }else if(tool==="tip"){
  h='<div class="form-row">'+input("bill",T("Bill amount","قيمة الفاتورة"),100,0)+input("tip",T("Tip (%)","الإكرامية (%)"),10,0)+input("people",T("People","عدد الأشخاص"),2,1,1)+'</div>';
 }else if(tool==="discount"){
  h='<div class="form-row">'+input("price",T("Original price","السعر الأصلي"),100,0)+input("discount",T("Discount (%)","الخصم (%)"),20,0)+'</div>';
 }else if(tool==="loan"){
  h='<div class="form-row">'+input("principal",T("Loan amount","مبلغ القرض"),10000,0.01)+input("rate",T("Annual interest (%)","الفائدة السنوية (%)"),5,0)+input("years",T("Term (years)","المدة (بالسنوات)"),5,0.01)+'</div>';
 }else if(tool==="calorie"){
  h='<div class="form-row">'+select("sex",T("Formula category","فئة المعادلة"),[["male",T("Male coefficient","معامل الذكور")],["female",T("Female coefficient","معامل الإناث")]])+input("age",T("Age (years)","العمر (بالسنوات)"),30,18,1)+input("weight",T("Weight (kg)","الوزن (كغ)"),70,0.1)+input("height",T("Height (cm)","الطول (سم)"),175,0.1)+select("activity",T("Activity level","مستوى النشاط"),[["1.2",T("Sedentary (1.2)","خامل (1.2)")],["1.375",T("Light (1.375)","خفيف (1.375)")],["1.55",T("Moderate (1.55)","متوسط (1.55)")],["1.725",T("Active (1.725)","نشيط (1.725)")],["1.9",T("Very active (1.9)","نشاط مرتفع (1.9)")]])+'</div>';
 }else if(tool==="date"){
  h='<div class="form-row">'+dateInput("start",T("Start date","تاريخ البداية"))+dateInput("end",T("End date","تاريخ النهاية"))+'</div>';
 }else if(tool==="word"){
  h='<div class="form-group"><label for="words">'+T("Enter text","أدخل النص")+'</label><textarea id="words" rows="8" style="width:100%;padding:.8rem;background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:8px" placeholder="'+T("Paste or type text here","اكتب النص أو الصقه هنا")+'"></textarea></div>';
 }
 area.innerHTML=h;
 if(tool==="unit") $("category").value = unitTypes[saved.category] ? saved.category : "length";
 Object.entries(saved).forEach(([k,v])=>{ if(k!=="category" && $(k) && $(k).closest("#calc-form") && Array.from($(k).options||[]).length && !Array.from($(k).options).some(o=>o.value===v))return; if(k!=="category" && $(k) && $(k).closest("#calc-form")) $(k).value=v; });
 if(tool==="unit" && !saved.to) $("to").selectedIndex=1;
 if(tool==="date" && !saved.start && !saved.end){const d=new Date();$("end").value=d.toISOString().slice(0,10);d.setUTCDate(d.getUTCDate()-7);$("start").value=d.toISOString().slice(0,10);}
 area.oninput = calculate;
 area.onchange = e=>{ if(tool==="unit"&&e.target.id==="category"){const s=snapshot();delete s.from;delete s.to;buildForm(s);} calculate();};
 calculate();
}
function convertTemperature(n,from,to){
 let c=from==="C"?n:from==="F"?(n-32)*5/9:n-273.15;
 return to==="C"?c:to==="F"?c*9/5+32:c+273.15;
}
function dateUtc(str){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(str||""))return NaN;
 const [y,m,d]=str.split("-").map(Number);
 const v=Date.UTC(y,m-1,d);
 const x=new Date(v);
 return x.getUTCFullYear()===y&&x.getUTCMonth()===m-1&&x.getUTCDate()===d?v:NaN;
}
function calculate(){
 try{
  if(tool==="unit"){
   const value=number("value"),list=unitTypes[$("category").value], from=list.find(x=>x[0]===$("from").value), to=list.find(x=>x[0]===$("to").value);
   if(!Number.isFinite(value)||!from||!to)return error();
   const out=$("category").value==="temperature"?convertTemperature(value,from[0],to[0]):value*from[1]/to[1];
   result(fmt(out)+" "+to[2],fmt(value)+" "+from[2]+" = "+fmt(out)+" "+to[2]);
  }else if(tool==="bmi"){
   const w=number("weight"),h=number("height")/100;
   if(!positive(w,h))return error();
   const b=w/(h*h),cat=b<18.5?T("Underweight","نحافة"):b<25?T("Normal range","المعدل الطبيعي"):b<30?T("Overweight","زيادة الوزن"):T("Obesity range","السمنة");
   result(fmt(b)+" BMI",cat);
  }else if(tool==="tip"){
   const b=number("bill"),t=number("tip"),p=number("people");
   if(!nonnegative(b,t)||!Number.isInteger(p)||p<1)return error();
   const tip=b*t/100,total=b+tip;result(fmt(total/p),T("Per person: ","لكل شخص: ")+fmt(total/p)+" · "+T("Tip: ","الإكرامية: ")+fmt(tip)+" · "+T("Total: ","الإجمالي: ")+fmt(total));
  }else if(tool==="discount"){
   const p=number("price"),d=number("discount");
   if(!nonnegative(p,d)||d>100)return error(T("discount must be between 0 and 100%.","الخصم بين 0 و100%."));
   result(fmt(p*(1-d/100)),T("You save: ","وفرت: ")+fmt(p*d/100));
  }else if(tool==="loan"){
   const p=number("principal"),r=number("rate"),years=number("years");
   if(!positive(p,years)||!nonnegative(r)||years>100)return error();
   const n=Math.round(years*12); if(n<1)return error();
   const m=r/1200, payment=m===0?p/n:p*(m/(1-Math.pow(1+m,-n)));
   result(fmt(payment),T("Total interest: ","إجمالي الفوائد: ")+fmt(payment*n-p)+" · "+T("Total paid: ","إجمالي السداد: ")+fmt(payment*n));
  }else if(tool==="calorie"){
   const a=number("age"),w=number("weight"),h=number("height"),factor=number("activity");
   if(!positive(a,w,h,factor)||a<18||a>120)return error(T("age 18–120 only.","العمر بين 18 و120 سنة."));
   const bmr=10*w+6.25*h-5*a+($("sex").value==="male"?5:-161);
   result(fmt(Math.round(bmr*factor))+" kcal/day",T("Estimated BMR: ","الأيض الأساسي التقريبي: ")+fmt(Math.round(bmr))+" kcal/day");
  }else if(tool==="date"){
   const a=dateUtc($("start").value),b=dateUtc($("end").value);
   if(!Number.isFinite(a)||!Number.isFinite(b))return error();
   const days=Math.round(Math.abs(b-a)/86400000);
   result(fmt(days),T("Calendar days between the selected dates","عدد الأيام التقويمية بين التاريخين"));
  }else if(tool==="word"){
   const t=$("words").value, words=(t.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)||[]).length;
   const chars=Array.from(t).length, nospace=Array.from(t.replace(/\s/gu,"")).length;
   result(fmt(words)+" "+T("words","كلمة"),T("Characters: ","الأحرف: ")+fmt(chars)+" · "+T("Without spaces: ","بدون مسافات: ")+fmt(nospace)+" · "+T("Reading: ","القراءة: ")+fmt(Math.ceil(words/200))+" "+T("min","دقيقة"));
  }
 }catch(e){console.error("Calculator error",e);error();}
}
document.addEventListener("DOMContentLoaded",()=>{
 tool=document.body.dataset.tool;
 if(!toolInfo[tool])return;
 function render(saved={}){
  const info=toolInfo[tool]; $("calc-title").textContent=T(...info.title);
  $("calc-description").textContent=T(...info.desc);
  $("calc-note").textContent=T(...info.note);
  $("calc-button").textContent=T("Calculate","احسب");
  $("calc-button").hidden=tool==="word";
  buildForm(saved);
 }
 render();
 $("calc-button").addEventListener("click",calculate);
 $("lang-toggle")?.addEventListener("click",()=>render(snapshot()));
});
})();