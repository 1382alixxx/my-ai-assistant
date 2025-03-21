const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(getMainPage());
});

function getMainPage() {
  return `
    <!DOCTYPE html>
    <html lang="fa">
    <head>
      <meta charset="UTF-8">
      <title>دستیار هوشمند</title>
      <style>
        body { margin: 0; padding: 0; font-family: Arial; background: linear-gradient(135deg, #1e3c72, #2a5298); height: 100vh; display: flex; justify-content: center; align-items: center; direction: rtl; }
        .container { text-align: center; background: rgba(255, 255, 255, 0.1); padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
        h1 { color: #fff; font-size: 2.5em; margin-bottom: 30px; }
        .button { display: inline-block; padding: 15px 30px; margin: 10px; background: #00c6ff; color: #fff; text-decoration: none; border-radius: 10px; font-size: 1.2em; }
        .button:hover { background: #0072ff; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>دستیار هوشمند من</h1>
        <a href="http://localhost:3000" class="button">هک اخلاقی</a>
        <a href="http://localhost:3001" class="button">ترید</a>
        <a href="http://localhost:3002" class="button">چت</a>
      </div>
    </body>
    </html>
  `;
}

app.listen(3003, () => {
  console.log('سرور اصلی روی پورت 3003 اجرا شد');
});
