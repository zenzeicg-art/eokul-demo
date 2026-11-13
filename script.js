(function () {
  "use strict";

  var MAX_TC_LENGTH = 11;
  var CAPTCHA_LENGTH = 4;

  var form = document.getElementById("loginForm");
  var tcInput = document.getElementById("tcno");
  var passInput = document.getElementById("sifre");
  var captchaInput = document.getElementById("kontrol");
  var captchaImg = document.getElementById("captchaImg");
  var refreshBtn = document.getElementById("refreshCaptcha");
  var toggleBtn = document.getElementById("togglePass");
  var clearBtn = document.querySelector(".btn-clear");
  var msgEl = document.getElementById("formMsg");
  var clockEl = document.getElementById("clock");
  var tabs = document.querySelectorAll(".tab");

  var currentCaptcha = "";

  function randomDigits(n) {
    var out = "";
    for (var i = 0; i < n; i++) {
      out += Math.floor(Math.random() * 10);
      if (i < n - 1) out += " ";
    }
    return out;
  }

  function newCaptcha() {
    currentCaptcha = randomDigits(CAPTCHA_LENGTH);
    captchaImg.textContent = currentCaptcha;
    captchaInput.value = "";
  }

  function showMessage(text, type) {
    msgEl.textContent = text;
    msgEl.className = "form-msg " + (type || "");
  }

  function updateClock() {
    var now = new Date();
    clockEl.textContent = now.toLocaleTimeString("tr-TR") + " - " +
      now.toLocaleDateString("tr-TR");
  }

  tcInput.addEventListener("input", function () {
    tcInput.value = tcInput.value.replace(/\D/g, "").slice(0, MAX_TC_LENGTH);
  });

  captchaInput.addEventListener("input", function () {
    captchaInput.value = captchaInput.value.replace(/\D/g, "").slice(0, CAPTCHA_LENGTH);
  });

  toggleBtn.addEventListener("click", function () {
    var isHidden = passInput.type === "password";
    passInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "🙈" : "👁";
  });

  refreshBtn.addEventListener("click", newCaptcha);

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
    });
  });

  clearBtn.addEventListener("click", function () {
    form.reset();
    newCaptcha();
    showMessage("");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var tc = tcInput.value.trim();
    var pass = passInput.value;
    var captcha = captchaInput.value.trim();

    if (tc.length !== MAX_TC_LENGTH) {
      showMessage("T.C. Kimlik No 11 haneli olmalıdır.", "error");
      tcInput.focus();
      return;
    }

    if (!pass) {
      showMessage("Şifre alanı boş bırakılamaz.", "error");
      passInput.focus();
      return;
    }

    if (captcha !== currentCaptcha.replace(/\s/g, "")) {
      showMessage("Kontrol kodu hatalı. Yeni kod oluşturuldu.", "error");
      newCaptcha();
      captchaInput.focus();
      return;
    }

    showMessage(
      "Bu bir demo sayfasıdır — giriş yapılmadı, hiçbir veri gönderilmedi.",
      "ok"
    );
    form.reset();
    newCaptcha();
  });

  newCaptcha();
  updateClock();
  setInterval(updateClock, 1000);
})();
