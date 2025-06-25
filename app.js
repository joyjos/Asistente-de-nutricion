// Importar dependencias
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Cargar configuración API Key
dotenv.config();

// Cargar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir FrontEnd
app.use("/", express.static("public"));

// Middleware para procesar JSON (convierto JSON a un Objeto de JavaScript)
app.use(express.json());

// Instancia de OpenAI y pasarle el API Key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Guardo temporalmente los datos del usuario
let userData = {};

// Ruta/endpoint/url
app.post("/api/nutri-chat", async(req, res) => {

    console.log(userData);

    // Primero por defecto se pregunta por el peso (FrontEnd)
    
    // Recibir la respuesta del peso del usuario
    const userId = req.body.id;
    const userMessage = req.body.message;

    // Generar objeto del usuario
    if(!userData[userId]){
        userData[userId] = {};
    }

    if(!userData[userId].peso){
        userData[userId].peso = userMessage;

        return res.json({reply: "Cuánto mides (cm)?"});
    }

    if(!userData[userId].altura){
        userData[userId].altura = userMessage;

        return res.json({reply: "Cuál es tu objetivo? (adelgazar, mantenerme osubir de peso)"})
    }

    if(!userData[userId].objetivo){
        userData[userId].objetivo = userMessage;

        return res.json({reply: "Tienes alguna alergia?"})
    }

    if(!userData[userId].alergias){
        userData[userId].alergias = userMessage;

        return res.json({reply: "Qué alimentos no te gustan?"})
    }

    if(!userData[userId].no_gusta){
        userData[userId].no_gusta = userMessage;

        return res.json({reply: "Cuántas comidas quieres hacer cada día?"})
    }

    if(!userData[userId].comidas_diarias){
        userData[userId].comidas_diarias = userMessage;

        return res.json({reply: "Cuántas comidas quieres hacer cada día?"})

        // Ejecutar la petición a al IA con un prompt


        // Recoger la respuesta y darle la dieta al usuario


        // Devolver respuesta
        return res.json({reply: "¡Aquí tienes tu dieta!"});
    }

    if(userData[userId].peso && userData[userId].altura && 
       userData[userId].objetivo && userData[userId].alergias &&
       userData[userId].no_gusta && userData[userId].comidas_diarias){
        userData[userId] = {};
        console.log(userData);
    }

    return res.json({reply: "¡Gracias por tus respuestas! Ya tienes tu dieta creada, usa los ingredientes para hacer una receta..."});
});

// Servir el BackEnd
app.listen(PORT, () =>  {
    console.log("Servidor corriendo correctamente en http://localhost:" + PORT);
});
