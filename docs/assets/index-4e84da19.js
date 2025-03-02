(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(e){if(e.ep)return;e.ep=!0;const c=t(e);fetch(e.href,c)}})();const y=async n=>{const o=await fetch(`https://api.iconfinder.com/v2/icons/search?query=${n}&count=1&premium=0&style=flat`);if(o.status!==200)throw new Error("fetch rejected",o.status);return o.json()},l=document.getElementById("shortcutsNav"),m=document.getElementById("addShortcutBttn"),a=document.getElementById("shortcuts"),d=document.createElement("input");d.type="text";d.placeholder="Title";const u=document.createElement("input");u.type="text";u.placeholder="Url";const f=document.createElement("button");f.className="addShortcut";f.textContent="+";m.addEventListener("click",()=>{l.removeChild(m),l.prepend(d,u,f)});const s=JSON.parse(localStorage.getItem("shortcuts"));s||(localStorage.setItem("shortcuts","[]"),s=[]);f.addEventListener("click",()=>{g(d.value),l.textContent="",l.prepend(m)});function g(n){y(n).then(o=>{const t=o.icons[0].icon_id,r=o.icons[0].raster_sizes[6].formats[0].preview_url;console.log(t,r),v(n,r,u.value,t)})}function v(n,o,t,r){console.log(t),t.startsWith("http")||(t="https://"+t),console.log(t);const e={key:r,title:n,iconUrl:o,url:t};s.push(e),localStorage.setItem("shortcuts",JSON.stringify(s)),E(e),Array.from(document.querySelectorAll("#deleteBttn")).forEach(i=>{i.addEventListener("click",p=>{h(p)})})}function E(n){a.innerHTML+=` <div class="shortcut" data-key=${n.key}>
            <img src=${n.iconUrl} alt="">
            <div class="title">
                <a href=${n.url}>${n.title}</a>
                <button data-key=${n.key} class="deleteBttn" id="deleteBttn">X</button>
            </div>
        </div>
        `}function S(){JSON.parse(localStorage.getItem("shortcuts")).forEach(t=>{a.innerHTML+=` 
        <div class="shortcut" data-key=${t.key}>
            <img src=${t.iconUrl} alt="">
            <div class="title">
                <a href=${t.url}>${t.title}</a>
                <button data-key=${t.key} class="deleteBttn" id="deleteBttn">X</button>
            </div>
        </div>
        `}),Array.from(document.querySelectorAll("#deleteBttn")).forEach(t=>{t.addEventListener("click",r=>{h(r)})})}function h(n){const t=n.target.parentElement.parentElement.dataset.key;let r=0;s.forEach(e=>{t==e.key&&(r===0?s.shift():s.splice(r,r)),r++}),localStorage.setItem("shortcuts",JSON.stringify(s)),Array.from(a.children).forEach(e=>{t==e.dataset.key&&a.removeChild(e)})}S();
