document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("userInput");
     const sendButton = document.getElementById("oxprod-jarvis-send-btn");
     const chatBox = document.getElementById("chat-box");
     const emailButton = document.getElementById("it-email");

    function addMessageToChat(message, sender) {
         const messageDiv = document.createElement("div");
         messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
         messageDiv.textContent = message;
         chatBox.appendChild(messageDiv);
    }

    sendButton.addEventListener("click", /* Event listener to recognise click */ function () {
            const message = userInput.value.trim();
                 if (!message) return;

        addMessageToChat("You: " + message, "user");
         userInput.value = "";

        addMessageToChat("Jarvis: Let me look into your issue...", "bot");

        fetch("http://127.0.0.1:5000/oxfordjarvis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
           .then(data => addMessageToChat("Jarvis: " + data.reply, "bot"));
        });

     if (emailButton) {
          emailButton.addEventListener("click", /* Event listener to recognise click */ () => window.location.href = "mailto:IT@oxprod.com"); /*Opens default mail client */
        /* Adds functionality to the email button */
    
    }
     });
