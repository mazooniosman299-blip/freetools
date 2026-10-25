/* Browser-only text tools. No network activity or dependencies. */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const arabic = () => document.documentElement.lang === "ar";
const T = (en, ar) => arabic() ? ar : en;
const maximum = 100000;
const trimLines = value => value.split(/\r?\n/).map(x=>x.trim()).join("\n");
function transform(text,action) {
 switch(action) {
  case "upper": return text.toLocaleUpperCase();
  case "lower": return text.toLocaleLowerCase();
  case "title": return text.toLocaleLowerCase().replace(/[\p{L}\p{N}]+/gu,x=>x.charAt(0).toLocaleUpperCase()+x.slice(1));
  case "sentence": return text.toLocaleLowerCase().replace(/(^|[.!?؟。]+\s+|\n+)(\s*)(\p{L})/gu,(all,start,space,letter)=>start+space+letter.toLocaleUpperCase());
  case "trim": return trimLines(text);
  case "blank": return text.split(/\r?\n/).filter(x=>x.trim().length>0).join("\n");
  case "unique": {
   const seen=new Set();return text.split(/\r?\n/).filter(x=>{if(seen.has(x))return false;seen.add(x);return true;}).join("\n");
  }
  default: throw new Error("Unknown transformation");
 }
}
function base64(text,action) {
 if(action==="encode") {
  const bytes=new TextEncoder().encode(text);let ascii="";
  for(let i=0;i<bytes.length;i+=8192)ascii+=String.fromCharCode(...bytes.subarray(i,i+8192));
  return btoa(ascii);
 }
 if(action==="decode") {
  const value=text.replace(/\s+/g,"");
  if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value))throw new Error("Invalid Base64");
  const binary=atob(value),bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
  return new TextDecoder("utf-8",{fatal:true}).decode(bytes);
 }
 throw new Error("Unknown Base64 action");
}
function apply() {
 const input=$("util-input").value, action=$("util-action").value,mode=document.body.dataset.util;
 $("util-output").value="";
 if(input.length>maximum) { $("util-message").textContent=T("Input too long.","النص أطول من الحد المسموح.");return; }
 try {
  const output=mode==="text"?transform(input,action):base64(input,action);
  $("util-output").value=output;
  $("util-message").textContent=T("Done: ","تم التحويل: ")+Array.from(output).length+" "+T("characters.","حرفاً.");
 } catch(err) {
  $("util-message").textContent=T("Unable to convert: check your input.","تعذّر التحويل: تحقق من البيانات.");
 }
}
async function copyResult(){
 const text=$("util-output").value;
 if(!text){$("util-message").textContent=T("Convert some text first.","حوّل نصاً أولاً.");return;}
 try{await navigator.clipboard.writeText(text);$("util-message").textContent=T("Copied.","تم النسخ.");}
 catch{$("util-message").textContent=T("Automatic copy unavailable. Select and copy the result.","تعذّر النسخ التلقائي. حدد النتيجة وانسخها.");}
}
function saveResult(){
 const text=$("util-output").value;
 if(!text){$("util-message").textContent=T("Convert some text first.","حوّل نصاً أولاً.");return;}
 const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download=document.body.dataset.util+"-freetools.txt";a.click();
 setTimeout(()=>URL.revokeObjectURL(url),30000);
}
function localize(){
 document.querySelectorAll("[data-en][data-ar]").forEach(el => el.textContent=el.getAttribute(arabic()?"data-ar":"data-en"));
}
document.addEventListener("DOMContentLoaded",()=>{
 if(!["text","base64"].includes(document.body.dataset.util))return;
 localize();
 $("lang-toggle")?.addEventListener("click",localize);
 $("util-go").addEventListener("click",apply);
 $("util-copy").addEventListener("click",copyResult);
 $("util-save").addEventListener("click",saveResult);
 $("util-action").addEventListener("change",apply);
 $("util-input").addEventListener("input",()=>{
 $("util-output").value="";$("util-message").textContent="";
 });
});
})();