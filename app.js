// --- دوال الكوكيز (Cookies) ---
function setCookie(name, value, days = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${d.toUTCString()};path=/;SameSite=Strict`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[2]));
    } catch (e) {
      return null;
    }
  }
  return null;
}

// --- تنبيه صوتي (Web Audio API) بدون ملفات خارجية ---
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {
    console.warn("AudioContext not permitted yet");
  }
}

// --- طبقة حظر النسخ ولقطات الشاشة (Anti-Screenshot/Copy) ---
function applySecurityMeasures(onLockout) {
  // منع النقر الأيمن
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // منع أزرار النسخ والطباعة ولقطات الشاشة (PrtScn, Ctrl+P, Ctrl+S, Ctrl+C)
  window.addEventListener("keydown", (e) => {
    if (
      e.key === "PrintScreen" ||
      (e.ctrlKey && ["p", "P", "s", "S", "c", "C", "u", "U"].includes(e.key))
    ) {
      e.preventDefault();
      alert("تم تعطيل هذه الخاصية لحماية الخصوصية.");
    }
  });

  // تشويش الصفحة فور محاولة الخروج أو تصوير النوافذ
  window.addEventListener("blur", () => {
    document.body.classList.add("blurred");
  });
  window.addEventListener("focus", () => {
    document.body.classList.remove("blurred");
  });
}
