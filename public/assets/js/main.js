// Seleccionar elementos
let userInput = document.querySelector("#inputText");
let resButton = document.querySelector("#resButton");
const chatBox = document.querySelector(".chat__messages");
const userId = "anon-" + Date.now();

function displayMessage(msgText, sender){
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat__message");
    msgDiv.classList.add(sender === "user" ? "chat__message--user" : "chat__message--bot");
    
    if(sender == "bot") msgDiv.classList.add("chat__message--ia");

    msgDiv.textContent = msgText;

    chatBox.appendChild(msgDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){
    //alert(userInput.value);

    const myMessage = userInput.value;

    if(!myMessage) return false;

    userInput.value = "";

    // Añadir mi mensaje de usuario
    displayMessage(myMessage, "user");

    // Crear mensaje de cargando esperando al bot
    //setTimeout(() => {
        displayMessage("Cargando...", "bot");
    //}, 500);
    

    // Enviar la petición al BackEnd
    const response = await fetch("http://localhost:3000/api/nutri-chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: userId,
            message: myMessage
        })
    });

    // Recoger la respuesta y reemplazar el cargando por el texto de la IA
    const data = await response.json();

    // Mostrar mensaje
    const botMessages = chatBox.querySelectorAll(".chat__message--ia");
    const lastBotMsg = botMessages[botMessages.length - 1];

    if(lastBotMsg){

        // Formatear la tabla
        if(data.reply.length >= 100){
            const md = new markdownit();

            const htmlContent = md.render(data.reply);

            lastBotMsg.innerHTML = htmlContent ;
        }else{
            lastBotMsg.textContent = data.reply;
        }

        chatBox.scrollTop = chatBox.scrollHeight;
    }else{
        displayMessage(data.reply, "bot");
    }

}

resButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        sendMessage();
    }
});