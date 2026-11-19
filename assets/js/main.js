/* Debato site — the only JavaScript on the page.
   Everything else is CSS, so the site renders fine if this never loads. */

(function () {
  "use strict";

  // Copyright year, so the footer does not quietly go stale.
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Offset in-page jumps by the sticky header's height, which an anchor
  // otherwise scrolls straight underneath.
  var header = document.querySelector(".site-header");
  if (!header) return;

  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href");
    if (id === "#" || id === "#main") return;

    var target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight - 12;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    history.pushState(null, "", id);
  });
})();
