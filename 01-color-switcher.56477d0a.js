!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},e=null;function n(){document.body.style.backgroundColor="".concat("#".concat(Math.floor(16777215*Math.random()).toString(16)))}t.startBtn.addEventListener("click",(function(o){o.target.setAttribute("disabled",""),t.stopBtn.removeAttribute("disabled"),n(),e=setInterval((function(){n()}),1e3)})),t.stopBtn.addEventListener("click",(function(n){clearInterval(e),n.target.setAttribute("disabled",""),t.startBtn.removeAttribute("disabled")})),t.stopBtn.setAttribute("disabled","")}();
//# sourceMappingURL=01-color-switcher.56477d0a.js.map
