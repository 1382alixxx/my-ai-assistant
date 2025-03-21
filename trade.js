const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(getTradePage());
});

app.get('/chat', (req, res) => {
  const query = req.query.q || 'تحلیل';
  const response = tradeChatResponse(query);
  res.json({ response });
});

function getTradePage() {
  return `
    <!DOCTYPE html>
    <html lang="fa">
    <head>
      <meta charset="UTF-8">
      <title>چت ترید</title>
      <style>
        body { margin: 0; padding: 20px; font-family: Arial; background: #1a1a2e; color: #fff; direction: rtl; }
        .chat-container { max-width: 600px; margin: auto; background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; }
        .input-area { display: flex; gap: 10px; }
        input { flex: 1; padding: 10px; border: none; border-radius: 10px; background: #16213e; color: #fff; }
        button { padding: 10px 20px; background: #00b894; border: none; border-radius: 10px; color: #fff; cursor: pointer; }
        #response { margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 10px; white-space: pre-wrap; text-align: right; }
      </style>
    </head>
    <body>
      <div class="chat-container">
        <h1>چت ترید</h1>
        <div class="input-area">
          <input id="query" type="text" placeholder="مثلاً: تحلیل کندل‌ها">
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

function tradeChatResponse(query) {
  if (query.includes('تحلیل') || query.includes('کندل')) {
    return `
    تحلیل کندل‌به‌کندل (نمونه):
    کندل 1: صعودی - باز: 100, بسته: 105, بالا: 110, پایین: 95
    کندل 2: صعودی - باز: 105, بسته: 112, بالا: 115, پایین: 100
    کندل 3: نزولی - باز: 112, بسته: 110, بالا: 118, پایین: 108
    مدیریت مالی:
    - روند: صعودی ولی در حال ضعیف شدن.
    - پیشنهاد: خرید کن، 1% سرمایه رو ریسک کن، استاپ‌لاس زیر 108، تارگت 118.
    - نکته: اگه کندل بعدی نزولی شد، سریع بفروش!
    `;
  } else {
    return 'بگو "تحلیل" یا داده کندل بده تا برات بررسی کنم!';
  }
}

app.listen(3001, () => {
  console.log('سرور ترید روی پورت 3001 اجرا شد');
});
