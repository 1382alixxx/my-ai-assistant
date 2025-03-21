const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(getHackPage());
});

app.get('/chat', (req, res) => {
  const query = req.query.q || 'سلام';
  const response = hackChatResponse(query);
  res.json({ response });
});

function getHackPage() {
  return `
    <!DOCTYPE html>
    <html lang="fa">
    <head>
      <meta charset="UTF-8">
      <title>چت هک اخلاقی</title>
      <style>
        body { margin: 0; padding: 20px; font-family: Arial; background: #0f2027; color: #fff; direction: rtl; }
        .chat-container { max-width: 600px; margin: auto; background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; }
        .input-area { display: flex; gap: 10px; }
        input { flex: 1; padding: 10px; border: none; border-radius: 10px; background: #2c3e50; color: #fff; }
        button { padding: 10px 20px; background: #e74c3c; border: none; border-radius: 10px; color: #fff; cursor: pointer; }
        #response { margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 10px; white-space: pre-wrap; text-align: right; }
      </style>
    </head>
    <body>
      <div class="chat-container">
        <h1>چت هک اخلاقی</h1>
        <div class="input-area">
          <input id="query" type="text" placeholder="موقعیتت رو بگو (مثلاً حذف عکس)">
          <button onclick="sendChat()">ارسال</button>
        </div>
        <div id="response"></div>
      </div>
      <script>
        async function sendChat() {
          const query = document.getElementById('query').value;
          const res = await fetch('/chat?q=' + encodeURIComponent(query));
          const data = await res.json();
          document.getElementById('response').innerText = data.response;
        }
      </script>
    </body>
    </html>
  `;
}

function hackChatResponse(query) {
  if (query.includes('حذف عکس') || query.includes('عکس شخصی')) {
    return `
    حذف عکس از گوشی هکر (ترکیب کلاه سیاه و سفید - فقط برای دفاع قانونی):
    1. دسترسی بگیر: یه لینک فیشینگ بفرست (مثلاً با SET تو Kali Linux) یا یه APK مخرب بساز و نصبش کن.
    2. کنترل گوشی: با Metasploit یه Meterpreter session باز کن (exploit/android/...).
    3. پیدا کردن عکس: تو اندروید بزن "shell" و بعد "find /sdcard -name '*.jpg'" یا تو ویندوز "dir *.jpg /s".
    4. حذف: با "rm /sdcard/DCIM/photo.jpg" پاکش کن یا با "unlink" تو Meterpreter.
    5. جلوگیری از بازیابی: با "shred" یا پر کردن حافظه با داده تصادفی (dd if=/dev/random) مطمئن شو برنگرده.
    6. ردپا رو پاک کن: لاگ‌ها رو حذف کن (rm /data/log/*) و session رو ببند.
    7. گزارش: همه‌چیز رو مستند کن و به مراجع قانونی بده اگه نیاز بود.
    این تکنیک‌ها کلاه سیاه‌ان، فقط برای دفاع از خودت و با مجوز استفاده کن!
    `;
  } else if (query.includes('جلوگیری از حمله')) {
    return `
    جلوگیری از هکر کلاه سیاه:
    1. اسکن: با Nmap بزن "nmap -A <IP>" تا ببینی چی بازه.
    2. فریب: یه سرور جعلی (honeypot) بذار با ابزار مثل Cowrie.
    3. بلاک: تو فایروال بزن "iptables -A INPUT -s <IP> -j DROP".
    4. ردیابی: با Wireshark پکت‌ها رو بگیر و IP هکر رو پیدا کن.
    5. حمله برگشتی (اخلاقی): اگه قانونی باشه، یه DoS ساده با hping3 تست کن تا هکر عقب بکشه (hping3 -S -p 80 <IP>).
    فقط تو چارچوب قانون عمل کن!
    `;
  } else {
    return 'موقعیتت رو بگو (مثلاً "حذف عکس" یا "جلوگیری از حمله") تا تکنیک‌های کلاه سیاه و سفید رو کامل بگم!';
  }
}

app.listen(3000, () => {
  console.log('سرور هک روی پورت 3000 اجرا شد');
});
