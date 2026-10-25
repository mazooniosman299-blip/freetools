import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const read = name => fs.readFileSync(new URL("../" + name, import.meta.url), "utf8");
const tools = ["unit","bmi","percentage","age","tip","discount","loan","calorie","date","word","password","json","image"];
const htmlPages = ["index",...tools,"about","privacy","terms","contact"];
for (const p of htmlPages) {
 const s=read(p+".html");
 assert.match(s, /<title>[\s\S]+?<\/title>/i, p+" missing title");
 assert.match(s, /<meta name="description"/i, p+" missing description");
 for (const m of s.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const path=m[1];
  if (/^[\w.-]+\.(?:html|css|js|xml)$/.test(path)) {
   assert(fs.existsSync(new URL("../"+path,import.meta.url)),p+" broken link: "+path);
  }
 }
 for(const m of s.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi)){
  if(m[0].includes("application/ld+json"))continue;
  if(m[1].trim())new vm.Script(m[1],{filename:p+".html inline"});
 }
}
for (const p of ["app.js","i18n.js","calc-tools.js","tools-extra.js"]) new vm.Script(read(p),{filename:p});
const siteMap=read("sitemap.xml"), URLs=[...siteMap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
assert.equal(URLs.length,htmlPages.length+1,"sitemap must list all HTML pages plus guide-bmi");
for (const u of URLs) {
 const path=new URL(u).pathname.replace(/^\/freetools\/?/,"")||"index.html";
 assert(fs.existsSync(new URL("../"+path,import.meta.url)),"sitemap URL missing "+u);
}
const src=read("calc-tools.js");
const cases=[
 {tool:"unit",fields:{value:"100",category:"length",from:"cm",to:"m"},want:"1 m"},
 {tool:"bmi",fields:{weight:"70",height:"175"},want:"22.85714286 BMI"},
 {tool:"tip",fields:{bill:"100",tip:"10",people:"2"},want:"55"},
 {tool:"discount",fields:{price:"100",discount:"20"},want:"80"},
 {tool:"loan",fields:{principal:"1200",rate:"0",years:"1"},want:"100"},
 {tool:"calorie",fields:{sex:"male",age:"30",weight:"70",height:"175",activity:"1.2"},want:"1,979 kcal/day"},
 {tool:"date",fields:{start:"2024-02-28",end:"2024-03-01"},want:"2"},
 {tool:"word",fields:{words:"hello world مرحبا"},want:"3 words"}
];
for(const test of cases){
 let ready;
 const els={};
 function el(id){
  if(!els[id])els[id]={value:test.fields[id]??"",textContent:"",hidden:true,options:[],handlers:{},addEventListener(type,fn){this.handlers[type]=fn},closest:()=>true,style:{}};
  return els[id];
 }
 const context={console,Intl,Date,Math,Number,Array,String,Object,RegExp,
  document:{body:{dataset:{tool:test.tool}},getElementById:el,querySelectorAll:()=>[],addEventListener:(name,fn)=>{if(name==="DOMContentLoaded")ready=fn;}},
  localStorage:{getItem:()=>null}};
 vm.runInNewContext(src,context,{filename:"calc-tools.js"});
 assert.equal(typeof ready,"function",test.tool+" initialization");
 ready();
 Object.entries(test.fields).forEach(([key,value])=>el(key).value=value);
 el("calc-button").handlers.click();
 assert.equal(el("result-value").textContent,test.want,test.tool+" computation");
}
console.log("PASS: 18 HTML pages, linked resources, sitemap, JS syntax and 8 calculator scenarios.");
