/* FreeTools extra tools — local browser processing only. */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const isAr = () => localStorage.getItem("ft_lang") === "ar";
const T = (en, ar) => isAr() ? ar : en;
const show = (id, en, ar) => { const el = $(id); if (el) el.textContent = T(en, ar); };
function translatePage() {
 document.querySelectorAll("[data-en][data-ar]").forEach(el => {
   el.textContent = isAr() ? el.getAttribute("data-ar") : el.getAttribute("data-en");
 });
 if ($("img-download")) $("img-download").textContent = T("Download result","تنزيل النتيجة");
}
async function copyText(value) {
 if (!value) throw new Error("empty");
 await navigator.clipboard.writeText(value);
}
function rand(max) {
 const span = 0x100000000, limit = Math.floor(span / max) * max;
 const array = new Uint32Array(1);
 do { crypto.getRandomValues(array); } while (array[0] >= limit);
 return array[0] % max;
}
function password() {
 const pools = [];
 if ($("pw-lower").checked) pools.push("abcdefghijkmnopqrstuvwxyz");
 if ($("pw-upper").checked) pools.push("ABCDEFGHJKLMNPQRSTUVWXYZ");
 if ($("pw-digits").checked) pools.push("23456789");
 if ($("pw-symbols").checked) pools.push("!@#$%^&*()-_=+?");
 const length = Number($("pw-length").value);
 if (!Number.isInteger(length) || length < 8 || length > 128 || pools.length === 0) {
   show("pw-message","Select at least one character type and a length from 8 to 128.","اختر فئة واحدة على الأقل وطولاً من 8 إلى 128.");
   return;
 }
 if (!globalThis.crypto || !crypto.getRandomValues) {
   show("pw-message","Secure random generation is unavailable in this browser.","التوليد العشوائي الآمن غير متاح في هذا المتصفح.");
   return;
 }
 const chars = pools.map(pool => pool[rand(pool.length)]), all = pools.join("");
 for (let i=chars.length;i<length;i++) chars.push(all[rand(all.length)]);
 for (let i=chars.length-1;i>0;i--) { const j=rand(i+1); [chars[i],chars[j]]=[chars[j],chars[i]]; }
 $("pw-output").value=chars.join("");
 show("pw-message","Generated locally with secure browser randomness.","تم التوليد محلياً بأرقام عشوائية آمنة.");
}
function initPassword() {
 $("pw-generate").addEventListener("click",password);
 $("pw-copy").addEventListener("click",async()=>{
   try { await copyText($("pw-output").value); show("pw-message","Copied!","تم النسخ!"); }
   catch { show("pw-message","Copy unavailable. Select and copy the password manually.","تعذّر النسخ التلقائي. حدّد كلمة المرور وانسخها يدوياً."); }
 });
 password();
}
function initJson() {
 let valid = "";
 function convert(spaces) {
   try {
     const obj = JSON.parse($("json-input").value);
     valid = JSON.stringify(obj, null, spaces);
     $("json-output").value = valid;
     show("json-message","Valid JSON. Content stays on your device.","JSON صالح. البيانات تبقى داخل جهازك.");
   } catch (err) {
     valid = "";
     $("json-output").value = "";
     $("json-message").textContent = T("Invalid JSON: ","JSON غير صالح: ") + String(err.message || err);
   }
 }
 $("json-format").addEventListener("click",()=>convert(2));
 $("json-minify").addEventListener("click",()=>convert(0));
 $("json-input").addEventListener("input",()=>{ valid=""; $("json-output").value=""; $("json-message").textContent=""; });
 $("json-copy").addEventListener("click",async()=>{
   try { await copyText(valid); show("json-message","Copied!","تم النسخ!"); }
   catch { show("json-message","Format valid JSON first, then copy.","نسّق JSON صالحاً أولاً ثم انسخه."); }
 });
 $("json-save").addEventListener("click",()=>{
   if (!valid) { show("json-message","Format valid JSON first.","نسّق JSON صالحاً أولاً."); return; }
   const url = URL.createObjectURL(new Blob([valid],{type:"application/json;charset=utf-8"}));
   const a=document.createElement("a"); a.href=url; a.download="formatted.json"; a.click();
   setTimeout(()=>URL.revokeObjectURL(url),60000);
 });
}
function initImage() {
 let downloadUrl = null;
 const quality=$("img-quality"),format=$("img-format"),link=$("img-download"),preview=$("img-preview");
 quality.addEventListener("input",()=>{$("img-quality-val").textContent=quality.value+"%";});
 const refreshQuality=()=>{quality.disabled=format.value==="image/png";};
 format.addEventListener("change",refreshQuality);refreshQuality();
 $("img-process").addEventListener("click",async()=>{
   const file=$("img-file").files[0];
   if (!file || !["image/jpeg","image/png","image/webp"].includes(file.type) || file.size>20*1024*1024) {
     show("img-message","Choose a PNG, JPEG or WebP image under 20 MB.","اختر صورة PNG أو JPEG أو WebP بحجم لا يتجاوز 20 ميغابايت."); return;
   }
   $("img-process").disabled=true;
   show("img-message","Processing image locally…","تجري معالجة الصورة محلياً…");
   let inputUrl=null;
   try {
     inputUrl=URL.createObjectURL(file);
     const picture=new Image();
     await new Promise((resolve,reject)=>{ picture.onload=resolve;picture.onerror=reject;picture.src=inputUrl; });
     const w=picture.naturalWidth,h=picture.naturalHeight;
     if (!w || !h || w*h>40000000) throw new Error(T("Image dimensions exceed the supported limit.","أبعاد الصورة تتجاوز الحد المدعوم."));
     const scale=Math.min(1,4096/Math.max(w,h));
     const canvas=document.createElement("canvas");
     canvas.width=Math.max(1,Math.round(w*scale));canvas.height=Math.max(1,Math.round(h*scale));
     const ctx=canvas.getContext("2d");
     if (!ctx) throw new Error(T("Canvas unsupported.","المتصفح لا يدعم معالجة الصور."));
     if(format.value==="image/jpeg"){ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);}
     ctx.drawImage(picture,0,0,canvas.width,canvas.height);
     const mime=format.value;
     const blob=await new Promise(resolve=>canvas.toBlob(resolve,mime,Number(quality.value)/100));
     if (!blob || blob.type!==mime) throw new Error(T("Selected format is not supported by this browser.","المتصفح لا يدعم الصيغة المختارة."));
     if(downloadUrl) URL.revokeObjectURL(downloadUrl);
     downloadUrl=URL.createObjectURL(blob);
     const ext=mime==="image/jpeg"?"jpg":mime==="image/png"?"png":"webp";
     const stem=file.name.replace(/\.[^.]+$/,"").replace(/[^\w\-]+/g,"_").slice(0,70)||"image";
     link.href=downloadUrl;link.download=stem+"-freetools."+ext;link.hidden=false;
     preview.src=downloadUrl;preview.hidden=false;
     const pct=file.size ? Math.round((1-blob.size/file.size)*100):0;
     $("img-message").textContent=T("Done: ","تم التحويل: ")+(blob.size/1024).toFixed(1)+" KB ("+pct+"% "+T("size change","تغيّر في الحجم")+") · "+canvas.width+"×"+canvas.height;
   } catch(err) { $("img-message").textContent=T("Cannot process image: ","تعذّرت معالجة الصورة: ")+String(err.message||err);link.hidden=true;preview.hidden=true; }
   finally {if(inputUrl)URL.revokeObjectURL(inputUrl);$("img-process").disabled=false;}
 });
}
document.addEventListener("DOMContentLoaded",()=>{
 translatePage();
 $("lang-toggle")?.addEventListener("click",translatePage);
 const tool=document.body.dataset.extra;
 if(tool==="password") initPassword();
 if(tool==="json") initJson();
 if(tool==="image") initImage();
});
})();