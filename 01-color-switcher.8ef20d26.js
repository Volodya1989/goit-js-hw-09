const t={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};t.btnStop.disabled=!0;let e=null;const a=()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`};t.btnStart.addEventListener("click",(()=>{e=setInterval(a,1e3),t.btnStart.disabled=!0,t.btnStop.disabled=!1})),t.btnStop.addEventListener("click",(()=>{clearInterval(e),t.btnStop.disabled=!0,t.btnStart.disabled=!1}));
//# sourceMappingURL=01-color-switcher.8ef20d26.js.map
