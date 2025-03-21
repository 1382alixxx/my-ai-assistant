const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(getChatPage());
});

app.get('/chat', (req, res) => {
  const query = req.query.q || 'سلام';
  const response = chatResponse(query);
  res.json({ response });
});

function getChatPage() {
  return `
    <!DOCTYPE html>
    <html lang="fa">
    <head>
      <meta charset="UTF-8">
      <title>چت با یارا</title>
      <style>
        body { margin: 0; padding: 20px; font-family: Arial; background: #2d3436; color: #fff; direction: rtl; }
        .chat-container { max-width: 600px; margin: auto; background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 15px; }
        .input-area { display: flex; gap: 10px; }
        input { flex: 1; padding: 10px; border: none; border-radius: 10px; background: #636e72; color: #fff; }
        button { padding: 10px 20px; background: #0984e3; border: none; border-radius: 10px; color: #fff; cursor: pointer; }
        #response { margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 10px; white-space: pre-wrap; text-align: right; }
      </style>
    </head>
    <body>
      <div class="chat-container">
        <h1>یارا - دستیارت</h1>
        <div class="input-area">
          <input id="query" type="text" placeholder="سوالتو بپرس">
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

function chatResponse(query) {
  const name = 'یارا';
  if (query.includes('سلام')) return `${name}: سلام! چطور کمکت کنم؟`;
  else if (query.includes('هک')) return `${name}: هک می‌خوای؟ بگو چه مشکلی داری، کلاه سیاه و سفید رو برات توضیح می‌دم!`;
  else if (query.includes('ترید')) return `${name}: تریدر هستی؟ کندل بده، تحلیل کنم!`;
  else return `${name}: هر سوالی داری بپرس، کامل جواب می‌دم!`;
}

app.listen(3002, () => {
  console.log('سرور چت روی پورت 3002 اجرا شد');
});
