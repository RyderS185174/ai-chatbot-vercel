<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AI Chatbot</title>
  <style>
    body { font-family: sans-serif; padding: 2em; max-width: 600px; margin: auto; }
    textarea { width: 100%; height: 100px; }
    button { margin-top: 1em; padding: 0.5em 1em; }
    #response { margin-top: 1em; white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>Chat with AI</h1>
  <textarea id="prompt" placeholder="Type your message..."></textarea>
  <br />
  <button onclick="sendMessage()">Send</button>
  <div id="response">Waiting for your input...</div>

  <script>
    async function sendMessage() {
      const prompt = document.getElementById('prompt').value;
      const responseEl = document.getElementById('response');
      responseEl.textContent = 'Thinking...';

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: prompt }),
        });

        const data = await res.json();
        if (data.reply) {
          responseEl.textContent = data.reply;
        } else {
          responseEl.textContent = 'Error: ' + (data.error || 'No reply');
        }
      } catch (e) {
        responseEl.textContent = 'Error: ' + e.message;
      }
    }
  </script>
</body>
</html>
