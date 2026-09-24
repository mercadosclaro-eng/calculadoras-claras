(function () {
  "use strict";
  var measurementId = "G-K4P31QR9HH";
  var consentKey = "cc_analytics_consent";
  var isEnglish = document.documentElement.lang === "en";

  function loadAnalytics() {
    if (window.ccAnalyticsLoaded) return;
    window.ccAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(script);
  }

  function recordCalculatorUse() {
    if (!window.ccAnalyticsLoaded || typeof window.gtag !== "function") return;
    window.gtag("event", "calculator_use", {
      calculator: location.pathname.split("/").pop() || "home",
      language: isEnglish ? "en" : "es"
    });
  }

  function privacyHref() { return isEnglish ? "privacy.html" : "privacidad.html"; }

  function closeBanner(choice) {
    localStorage.setItem(consentKey, choice);
    var banner = document.getElementById("privacy-choice");
    if (banner) banner.remove();
    if (choice === "accepted") loadAnalytics();
  }

  function showBanner() {
    var banner = document.createElement("section");
    banner.id = "privacy-choice";
    banner.className = "privacy-choice";
    banner.setAttribute("aria-label", isEnglish ? "Analytics choice" : "Preferencia de medición");
    banner.innerHTML = isEnglish
      ? '<p><strong>Help us improve.</strong> Allow anonymous usage measurement? We never send calculator values. <a href="' + privacyHref() + '">Privacy</a></p><div><button id="analytics-no" type="button">No, thanks</button><button id="analytics-yes" class="primary" type="button">Allow</button></div>'
      : '<p><strong>Ayúdanos a mejorar.</strong> ¿Permites medir el uso de forma anónima? Nunca enviamos los valores de las calculadoras. <a href="' + privacyHref() + '">Privacidad</a></p><div><button id="analytics-no" type="button">No, gracias</button><button id="analytics-yes" class="primary" type="button">Permitir</button></div>';
    document.body.appendChild(banner);
    document.getElementById("analytics-no").addEventListener("click", function () { closeBanner("declined"); });
    document.getElementById("analytics-yes").addEventListener("click", function () { closeBanner("accepted"); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var consent = localStorage.getItem(consentKey);
    if (consent === "accepted") loadAnalytics();
    else if (consent !== "declined") showBanner();
    document.querySelectorAll("form").forEach(function (form) { form.addEventListener("submit", recordCalculatorUse); });
    document.querySelectorAll("button").forEach(function (button) {
      if (/calcul|compar|proyect|estimate|calculate|compare|project/i.test(button.textContent || "")) button.addEventListener("click", recordCalculatorUse);
    });
  });
})();
