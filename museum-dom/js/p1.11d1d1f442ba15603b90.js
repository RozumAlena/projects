(()=>{"use strict";!function(){const e=document.querySelector(".slider-comp__item_after");document.querySelector(".input-slider").addEventListener("input",(function(){const t=this.value;e.style.width=`${t}%`}))}(),function(){const e=document.querySelectorAll(".slider__item"),t=document.querySelectorAll(".pagination__slide"),o=(document.querySelector(".pagination__slides"),document.querySelector(".pagination__btn_left")),n=document.querySelector(".pagination__btn_right"),i=document.querySelector(".current-item");let r=0,s=!0;const a=e=>{t.forEach((e=>e.classList.remove("active"))),t[e].classList.add("active"),e++,i.innerHTML=`0${e}`},c=t=>{r=(t+e.length)%e.length},l=t=>{s=!1,e[r].classList.add(t),e[r].addEventListener("animationend",(function(){this.classList.remove("active",t)}))},d=t=>{s=!1,e[r].classList.add("next",t),e[r].addEventListener("animationend",(function(){this.classList.remove("next",t),this.classList.add("active"),s=!0,a(r)}))};o.addEventListener("click",(()=>{s&&(l("to-right"),c(r-1),d("from-left"))})),n.addEventListener("click",(()=>{s&&(l("to-left"),c(r+1),d("from-right"))})),t.forEach(((t,o)=>{t.addEventListener("click",(t=>{var n;c(o),n=r,e.forEach((e=>e.classList.remove("active"))),e[n].classList.add("active"),n++,a(r)}))}))}(),function(){mapboxgl.accessToken="pk.eyJ1Ijoicm96dW1lbGVuYSIsImEiOiJja3VwaGxyYzgybDhjMnFuNmR6NGtlZ2QzIn0.vuGcqDSslzgKxxdhoC5_nQ";const e=new mapboxgl.Map({container:"map",style:"mapbox://styles/mapbox/light-v10",center:[2.3364,48.86091],zoom:15.8});e.addControl(new mapboxgl.NavigationControl),e.on("load",(function(){e.resize()})),[{type:"Feature",geometry:{type:"Point",coordinates:[2.3364,48.86091]},properties:{title:"Mapbox",description:"Louvre Museum"},options:{color:"#171717"}},{type:"Feature",geometry:{type:"Point",coordinates:[2.3333,48.8602]},properties:{title:"Mapbox",description:"Tunnel de Tuileries"},options:{color:"#757575"}},{type:"Feature",geometry:{type:"Point",coordinates:[2.3397,48.8607]},properties:{title:"Mapbox",description:"Sarcophage d`Abou Roach"},options:{color:"#757575"}},{type:"Feature",geometry:{type:"Point",coordinates:[2.333,48.8619]},properties:{title:"Mapbox",description:"Arc de triomphe du Carrousel"},options:{color:"#757575"}},{type:"Feature",geometry:{type:"Point",coordinates:[2.3365,48.8625]},properties:{title:"Mapbox",description:"Rue de Rivoli"},options:{color:"#757575"}}].forEach((t=>new mapboxgl.Marker(t.options).setLngLat(t.geometry.coordinates).setPopup((new mapboxgl.Popup).setText(t.properties.description)).addTo(e)))}(),function(){const e=document.querySelector(".video__btn_play"),t=document.querySelector(".panel__element_play"),o=document.querySelector(".video-player"),n=document.querySelector(".video-panel-wrapper"),i=document.querySelector(".panel__element_frame"),r=document.querySelector(".panel__progress_volume"),s=document.querySelector(".panel__progress_play"),a=document.querySelector(".panel__element_volume");function c(){o.paused?(e.style.display="none",t.classList.add("pause"),o.play()):(e.style.display="inline-block",t.classList.remove("pause"),o.pause())}function l(e){const t=e.value;e.style.background=`linear-gradient(to right, #710707 0%, #710707 ${t}%, #C4C4C4 ${t}%, #C4C4C4 100%)`}e.addEventListener("click",c),o.addEventListener("click",c),t.addEventListener("click",c),i.addEventListener("click",(function(){n.fullscreenElement?n.exitFullscreen():(n.requestFullscreen(),i.classList.toggle("full-exit"))})),a.addEventListener("click",(function(){a.classList.toggle("mute"),o.muted=!o.muted})),r.addEventListener("input",(function(){l(r),o.volume=value/100,0!=value?a.classList.remove("mute"):a.classList.add("mute")})),s.addEventListener("input",(function(){const e=this.value;o.pause(),o.currentTime=e*o.duration/100,o.play(),l(this)})),o.addEventListener("timeupdate",(function(){s.value=100*o.currentTime/o.duration,l(s)}))}()})();