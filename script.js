const messages = {
  en: {
    1: "You are a leader. Independent and ambitious.",
    2: "You are a peacemaker. Cooperative and diplomatic.",
    3: "You are creative. Expressive and joyful.",
    4: "You are practical. Hardworking and reliable.",
    5: "You are adventurous. Freedom-loving and curious.",
    6: "You are caring. Responsible and nurturing.",
    7: "You are spiritual. Analytical and introspective.",
    8: "You are powerful. Ambitious and business-minded.",
    9: "You are compassionate. Generous and humanitarian.",
    11: "You are intuitive. A visionary and spiritual guide.",
    22: "You are a master builder. Practical idealist."
  },
  hi: {
    1: "आप एक नेता हैं। स्वतंत्र और महत्वाकांक्षी।",
    2: "आप शांतिदूत हैं। सहयोगी और कूटनीतिक।",
    3: "आप रचनात्मक हैं। अभिव्यक्तिपूर्ण और आनंदमय।",
    4: "आप व्यावहारिक हैं। मेहनती और विश्वसनीय।",
    5: "आप साहसी हैं। स्वतंत्रता पसंद और जिज्ञासु।",
    6: "आप देखभाल करने वाले हैं। जिम्मेदार और पोषण करने वाले।",
    7: "आप आध्यात्मिक हैं। विश्लेषणात्मक और अंतर्मुखी।",
    8: "आप शक्तिशाली हैं। महत्वाकांक्षी और व्यवसायी।",
    9: "आप दयालु हैं। उदार और मानवतावादी।",
    11: "आप सहज हैं। दूरदर्शी और आध्यात्मिक मार्गदर्शक।",
    22: "आप एक मास्टर बिल्डर हैं। व्यावहारिक आदर्शवादी।"
  }
};

function calculate() {
  const dob = document.getElementById("dob").value;
  const lang = document.getElementById("language").value;

  if (!dob) {
    document.getElementById("result").innerText = lang === "hi"
      ? "कृपया जन्म तिथि दर्ज करें।"
      : "Please enter your date of birth.";
    return;
  }

  const digits = dob.replaceAll("-", "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);

  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split("").reduce((a, b) => a + parseInt(b), 0);
  }

  const message = messages[lang][sum] || "No result found.";
  document.getElementById("result").innerHTML = `<strong>Life Path Number: ${sum}</strong><br>${message}`;
}
