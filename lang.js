// Switches the page between Spanish and English. The choice is kept for the
// next visit; ?lang=en or ?lang=es in the URL also picks it.
(function () {
  var KEY = "cartelera-lang";
  var root = document.documentElement;

  function saved() {
    var param = new URLSearchParams(location.search).get("lang");
    if (param === "en" || param === "es") return param;
    try { return localStorage.getItem(KEY) === "en" ? "en" : "es"; } catch (e) { return "es"; }
  }

  function apply(lang) {
    root.lang = lang === "en" ? "en" : "es-MX";
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-set-lang") === lang));
    });
    document.querySelectorAll("a[data-keep-lang]").forEach(function (a) {
      var url = new URL(a.getAttribute("href"), location.href);
      url.searchParams.set("lang", lang);
      a.href = url.pathname + url.search;
    });
  }

  var current = saved();
  apply(current);

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-set-lang]");
    if (!button) return;
    current = button.getAttribute("data-set-lang");
    try { localStorage.setItem(KEY, current); } catch (e) {}
    apply(current);
  });
})();
