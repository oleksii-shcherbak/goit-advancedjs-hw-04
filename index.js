import{a as L,S as b,i as n}from"./assets/vendor-BJVfH36N.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const w="53208218-639a4ce2969ceea2e5df20734",S="https://pixabay.com/api/";async function P(e,r=1,a=15){const s={key:w,q:e,page:r,per_page:a,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await L.get(S,{params:s})).data}function q(e){return e.map(({webformatURL:r,largeImageURL:a,tags:s,likes:t,views:o,comments:i,downloads:v})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${s}"
          loading="lazy"
        />
      </a>
      <div class="info">
        <div class="info-item">
          <p class="info-label">Likes</p>
          <p class="info-value">${t}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Views</p>
          <p class="info-value">${o}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Comments</p>
          <p class="info-value">${i}</p>
        </div>
        <div class="info-item">
          <p class="info-label">Downloads</p>
          <p class="info-value">${v}</p>
        </div>
      </div>
    </li>
  `).join("")}function M(e){e.innerHTML=""}const E=document.querySelector(".form"),p=document.querySelector(".gallery"),m=document.querySelector(".loader-box"),c=document.querySelector(".load-more-btn");let $=new b(".gallery a",{captionsData:"alt",captionDelay:250}),l=1,h="",d=0;const u=15;E.addEventListener("submit",B);c.addEventListener("click",O);async function B(e){e.preventDefault();const r=e.target.elements.search.value.trim();if(r===""){n.warning({message:"Please enter a search query",position:"topRight"});return}M(p),y(),l=1,h=r,await g(),e.target.reset()}async function O(){l+=1,await g(),H()}async function g(){R();try{const e=await P(h,l,u);if(f(),e.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}d=e.totalHits;const r=q(e.hits);p.insertAdjacentHTML("beforeend",r),$.refresh();const a=Math.ceil(d/u);l>=a?(y(),a>1&&n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):x()}catch(e){f(),n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error("Error fetching images:",e)}}function R(){m.classList.remove("visually-hidden")}function f(){m.classList.add("visually-hidden")}function x(){c.classList.remove("visually-hidden")}function y(){c.classList.add("visually-hidden")}function H(){const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
