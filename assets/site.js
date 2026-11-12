/* Saint Cloud 24/7 Plumbing: drawer menu and dropdown keyboard support. Breakpoint 768 matches main.css. */
(function () {
  "use strict";
  var BP = 768;
  var btn = document.getElementById("menu-open");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("menu-close");
  if (!btn || !drawer || !overlay) { return; }
  var lastFocus = null;

  function openMenu() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    overlay.classList.add("visible");
    btn.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
    if (closeBtn) { closeBtn.focus(); }
  }
  function closeMenu() {
    drawer.hidden = true;
    overlay.classList.remove("visible");
    btn.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }
  btn.addEventListener("click", function () {
    if (drawer.hidden) { openMenu(); } else { closeMenu(); }
  });
  if (closeBtn) { closeBtn.addEventListener("click", closeMenu); }
  overlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !drawer.hidden) { closeMenu(); }
  });
  drawer.addEventListener("click", function (e) {
    var t = e.target;
    if (t && t.tagName === "A") { closeMenu(); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > BP && !drawer.hidden) { closeMenu(); }
  });
})();
