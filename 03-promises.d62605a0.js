!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=t.parcelRequire7bc7;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,t){o[e]=t},t.parcelRequire7bc7=i);var u=i("6JpON");e(u).Notify.init({timeout:3e3});var r=document.querySelector('form[class="form"]'),a=document.querySelector('button[type="submit"]');r.addEventListener("submit",(function(t){var n=function(t){(function(e,t){return new Promise((function(n,o){var i=Math.random()>.3;setTimeout((function(){i?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))})(t,f).then((function(){!function(t){e(u).Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(s+=Number(c.value)," ms"))}(t)})).catch((function(){!function(t){e(u).Notify.failure("❌ Rejected promise ".concat(t," in ").concat(s+=Number(c.value)," ms"))}(t)})),f+=Number(c.value)};a.disabled=!0,t.preventDefault();var o=t.target.elements,i=o.delay,l=o.amount,c=o.step,f=Number(i.value),s=f-Number(c.value);for(var d=1;d<=l.value;d+=1)n(d);!function(e){setTimeout((function(){a.disabled=!1,r.reset()}),e+3e3)}(f)}))}();
//# sourceMappingURL=03-promises.d62605a0.js.map
