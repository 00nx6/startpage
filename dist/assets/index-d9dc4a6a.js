(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerPolicy&&(c.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?c.credentials="include":t.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(t){if(t.ep)return;t.ep=!0;const c=e(t);fetch(t.href,c)}})();const y=async n=>{const r=await fetch(`https://api.iconfinder.com/v2/icons/search?query=${n}&count=1&premium=0&style=flat`);if(r.status!==200)throw new Error("fetch rejected",r.status);return r.json()},l=document.getElementById("shortcutsNav"),m=document.getElementById("addShortcutBttn"),a=document.getElementById("shortcuts"),d=document.createElement("input");d.type="text";d.placeholder="Title";const u=document.createElement("input");u.type="text";u.placeholder="Url";const f=document.createElement("button");f.className="addShortcut";f.textContent="+";m.addEventListener("click",()=>{l.removeChild(m),l.prepend(d,u,f)});const s=JSON.parse(localStorage.getItem("shortcuts"));f.addEventListener("click",()=>{g(d.value),l.textContent="",l.prepend(m)});function g(n){y(n).then(r=>{const e=r.icons[0].icon_id,o=r.icons[0].raster_sizes[6].formats[0].preview_url;v(n,o,u.value,e)})}function v(n,r,e,o){const t={key:o,title:n,iconUrl:r,url:e};s.push(t),localStorage.setItem("shortcuts",JSON.stringify(s)),E(t),Array.from(document.querySelectorAll("#deleteBttn")).forEach(i=>{i.addEventListener("click",p=>{h(p)})})}function E(n){a.innerHTML+=` <div class="shortcut" data-key=${n.key}>
            <img src=${n.iconUrl} alt="">
            <div class="title">
                <a href=${n.url}>${n.title}</a>
                <button data-key=${n.key} class="deleteBttn" id="deleteBttn">X</button>
            </div>
        </div>
        `}function S(){JSON.parse(localStorage.getItem("shortcuts")).forEach(e=>{a.innerHTML+=` 
        <div class="shortcut" data-key=${e.key}>
            <img src=${e.iconUrl} alt="">
            <div class="title">
                <a href=${e.url}>${e.title}</a>
                <button data-key=${e.key} class="deleteBttn" id="deleteBttn">X</button>
            </div>
        </div>
        `}),Array.from(document.querySelectorAll("#deleteBttn")).forEach(e=>{e.addEventListener("click",o=>{h(o)})})}function h(n){const e=n.target.parentElement.parentElement.dataset.key;let o=0;s.forEach(t=>{e==t.key&&(o===0?s.shift():s.splice(o,o)),o++}),localStorage.setItem("shortcuts",JSON.stringify(s)),Array.from(a.children).forEach(t=>{e==t.dataset.key&&a.removeChild(t)})}S();
