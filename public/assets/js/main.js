// Seleccionar elementos
let userInput = document.querySelector("#inputText");
let resButton = document.querySelector("#resButton");

async function sendMessage(){
    //alert(userInput.value);

    const myMessage = userInput.value;

    if(!myMessage) return false;

    userInput.value = "";

    // Añadir mi mensaje de usuario

    // Crear mensaje de cargando esperando al bot

    // Enviar la petición al BackEnd

    // Recoger la respuesta y reemplazar el cargando por el texto de la IA

    // Formatear resultado

}

resButton.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        sendMessage();
    }
});