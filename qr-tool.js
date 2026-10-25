/* FreeTools QR generator; the bundled QRCode library operates entirely in-browser. */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const ar = () => localStorage.getItem("ft_lang") === "ar";
const T = (en,a) => ar()?a:en;
const message = (en,a) => { $("qr-message").textContent=T(en,a); };
let lastCanvas = null;
function translate() {
 document.querySelectorAll("[data-en][data-ar]").forEach(el => {el.textContent=el.getAttribute(ar()?"data-ar":"data-en");});
}
function generate() {
 const value=$("qr-text").value.trim(),size=Number($("qr-size").value);
 $("qr-result").replaceChildren();
 $("qr-download").disabled=true;lastCanvas=null;
 if (!value) { message("Enter a link or text first.","أدخل رابطاً أو نصاً أولاً.");return; }
 if ([192,256,384,512].indexOf(size)<0 || Array.from(value).length>400) {
   message("Check your text length or selected size.","راجع طول النص أو حجم الرمز.");return;
 }
 if (typeof QRCode==="undefined") { message("QR library not available.","مكتبة QR غير متاحة.");return; }
 try {
   new QRCode($("qr-result"),{text:value,width:size,height:size,correctLevel:QRCode.CorrectLevel.M});
   lastCanvas=$("qr-result").querySelector("canvas");
   $("qr-download").disabled=false;
   message("QR code ready. Test it with a phone before printing.","رمز QR جاهز. اختبره بالهاتف قبل الطباعة.");
 } catch (err) {
   $("qr-result").replaceChildren();$("qr-download").disabled=true;lastCanvas=null;
   message("Text too long for a QR code. Shorten it and retry.","النص طويل جداً على رمز QR. اختصره وحاول مجدداً.");
 }
}
function download() {
 let png;
 try {
   if (lastCanvas) png=lastCanvas.toDataURL("image/png");
   else { const img=$("qr-result").querySelector("img"); if(img) png=img.src; }
   if(!png||!png.startsWith("data:image/png"))throw Error("PNG missing");
   const a=document.createElement("a");a.href=png;a.download="freetools-qr.png";a.click();
 } catch {message("Could not export PNG. Try generating the code again.","تعذّر تصدير PNG. أعد إنشاء الرمز.");}
}
document.addEventListener("DOMContentLoaded",()=>{
 translate();
 $("lang-toggle")?.addEventListener("click",translate);
 $("qr-generate").addEventListener("click",generate);
 $("qr-download").addEventListener("click",download);
 $("qr-size").addEventListener("change",()=>{if($("qr-text").value.trim())generate();});
});
})();