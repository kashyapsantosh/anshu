const API_KEY = "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";

const queryInput = document.getElementById("userQuery");
const responseBox = document.getElementById("response");

async function getAIResponse(query) {
  responseBox.innerHTML = "<em>Thinking...</em>";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${API_KEY},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: query
          }
        ]
      })
    });

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
    responseBox.textContent = answer;
  } catch (err) {
    console.error(err);
    responseBox.textContent = "Something went wrong. Please try again later.";
  }
}

document.querySelector("button").addEventListener("click", () => {
  const query = queryInput.value.trim();
  if (query) {
    getAIResponse(query);
  } else {
    responseBox.textContent = "Please enter a question.";
  }
});