import{a as x,S as q,i as d}from"./assets/vendor-527658dd.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=i(e);fetch(e.href,a)}})();const w="41917530-74216f8e6af2c90f64ec8c0b5";async function m({query:t,per_page:s,page:i}){return(await x.get("https://pixabay.com/api",{params:{key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:i}})).data}const h=document.querySelector(".loader");function S(){h.classList.add("hidden")}function E(){h.classList.remove("hidden")}function u(t){t.innerHTML=""}function f(t,s){const i=t.map(({views:r,likes:e,comments:a,downloads:l,tags:L,largeImageURL:v,webformatURL:b})=>{const P=L.split(",");return`<li class="gallery__item">
        <a href="${v}" class="gallery__item-link">
          <img src="${b}" alt="${P[0]}">
          <div class="gallery__item-content">
            <div class="gallery__item-info">
              <h3 class="gallery__item-title">Likes</h3>
              <span class="gallery__item-text">${e}</span>
            </div>
            <div class="gallery__item-info">
              <h3 class="gallery__item-title">Views</h3>
              <span class="gallery__item-text">${r}</span>
            </div>
            <div class="gallery__item-info">
              <h3 class="gallery__item-title">Comments</h3>
              <span class="gallery__item-text">${a}</span>
            </div>
            <div class="gallery__item-info">
              <h3 class="gallery__item-title">Downloads</h3>
              <span class="gallery__item-text">${l}</span>
            </div>
          </div>
        </a>
      </li>`}).join("");s.insertAdjacentHTML("beforeend",i)}const M=document.querySelector(".form"),c=document.querySelector(".gallery"),n=document.querySelector(".load-more"),g=document.querySelector(".pre-loader"),o={page:1,query:"",maxPage:0,per_page:15},y=new q(".gallery .gallery__item a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});M.addEventListener("submit",$);async function $(t){t.preventDefault(),o.page=1;const s=t.currentTarget,i=s.elements.searchText.value.trim();if(o.query=i,u(c),!i){d.error({title:"Error",message:"❌Enter the text"});return}E(),n.classList.add("hidden");try{const{hits:r,totalHits:e}=await m(o);o.maxPage=Math.ceil(e/o.per_page),!r||r.length===0?(u(c),d.error({title:"Error",message:"❌Sorry, there are no images matching your search query. Please, try again!"})):(f(r,c),y.refresh(),r.length>0&&e!=r.length?T():_())}catch(r){return console.error(r),r}finally{s.reset(),S()}}async function p(){o.page+=1,O();try{const{hits:t}=await m(o);f(t,c);const s=c.querySelector(".gallery__item-link").getBoundingClientRect().height;window.scrollBy({top:s*3,behavior:"smooth"}),y.refresh()}catch(t){return console.error(t),t}finally{B(),o.page>=o.maxPage&&(d.error({title:"Message",message:`We're sorry, but you've reached the end of search results.
`}),_())}}function O(){n.disabled=!0,g.classList.remove("hidden")}function B(){n.disabled=!1,g.classList.add("hidden")}function T(){n.classList.remove("hidden"),n.addEventListener("click",p)}function _(){n.classList.add("hidden"),n.removeEventListener("click",p)}
//# sourceMappingURL=commonHelpers.js.map
