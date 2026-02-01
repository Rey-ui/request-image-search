import{i as f,S as h,a as x}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=a(t);fetch(t.href,i)}})();const E="41917530-74216f8e6af2c90f64ec8c0b5",S="https://pixabay.com/api/",q=document.querySelector(".form-inline"),o=document.querySelector(".card-container"),n=document.querySelector(".label"),m=document.getElementById("preloader"),c={q:"",page:1,maxPage:0,per_page:40};let g="";const p="is-hidden";function d(e){e.classList.add(p)}function y(e){e.classList.remove(p)}function w(e,r){r.classList.add(p),e.disabled=!1}function M(e,r){r.classList.remove(p),e.disabled=!0}function H(){o.innerHTML='<div class="loader"></div>'}function T(){const e=o.querySelector(".loader");e&&e.remove()}q.addEventListener("submit",k);async function k(e){e.preventDefault(),o.innerHTML="";const r=e.currentTarget,a=r.elements.picture.value.trim();if(g=a,c.page=1,a===""||a==null){f.error({title:"Error",message:"❌Sorry, there are no images matching your search query. Please, try again!"}),o.innerHTML="",d(n);return}H();try{const{hits:s,totalHits:t}=await v(a);s&&s.length>0?(c.maxPage=Math.ceil(t/c.per_page),L(s,o),new h(".card-container a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh(),s&&s.length>0&&s.length!==t?(y(n),n.removeEventListener("click",u),n.addEventListener("click",u)):d(n)):(o.innerHTML="",f.error({title:"Error",message:"❌Sorry, there are no images matching your search query. Please, try again!"}),d(n))}catch(s){console.log(s)}finally{T(),r.reset()}}function v(e,r=1){return x.get(S,{params:{key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:r}}).then(a=>a.data)}async function u(){c.page+=1,M(n,m);try{const{hits:e}=await v(g,c.page);L(e,o);const r=o.querySelector(".picture-link").getBoundingClientRect().height;window.scrollBy({top:r*3,behavior:"smooth"}),new h(".card-container a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}catch(e){console.log(e)}finally{w(n,m),c.page>=c.maxPage?(d(n),f.error({title:"Error",message:`"We're sorry, but you've reached the end of search results."`}),n.removeEventListener("click",u)):(y(n),n.removeEventListener("click",u),n.addEventListener("click",u))}}function L(e,r){const a=e.map(({webformatURL:s,likes:t,views:i,comments:l,downloads:b,largeImageURL:P})=>`<a href="${P}" class= "picture-link">
    <img src = "${s}">
    <div class= "picture-content">
        <div class= "picture-text">
            <span class= "picture-title">Likes</span>
            <span class= "picture-sub-title">${t}</span>
        </div>
        <div class= "picture-text">
            <span class= "picture-title">Views</span>
            <span class= "picture-sub-title">${i}</span>
        </div>
        <div class= "picture-text">
            <span class= "picture-title">Comments</span>
            <span class= "picture-sub-title">${l}</span>
        </div>
        <div class= "picture-text">
            <span class= "picture-title">Downloads</span>
            <span class= "picture-sub-title">${b}</span>
        </div>
    </div>
</a>`).join();r.insertAdjacentHTML("beforeend",a)}
//# sourceMappingURL=commonHelpers.js.map
