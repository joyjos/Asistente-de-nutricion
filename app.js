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

// Método para hacer petición a la IA
const generateDiet = async(userResponses) => {

    // Crear el prompt (sistema, indicaciones para la IA)
    const promptSystem = {
        role: "system",
        content: `Eres un nutricionista profesional y un asistente que ayuda a 
                  generar una dieta semanal.

                  El usuario solo puede hacer preguntas relacionadas con la dieta
                  con su peso, altura. objetivo, alergias, alimentos que no le gustan
                  y número de comidas diarias.
                  
                  El sistema no responderá a ningún otro tipo de solicitud que no esté
                  relacionada con la dieta.
                  `
    };

    // Crear el prompt del usuario con la petición
    const promptUser = {
        role: "user",
        content: `Crear una dieta semanal para una persona que pesa ${userResponses.peso} kg,
                  mide ${userResponses.altura} cm, y cuyo objetivo es ${userResponses.objetivo}.
                  La persona tiene las siguientes alergias: ${userResponses.alergias}.
                  Evitar los siguientes alimentos: ${userResponses.no_gusta}.
                  La persona quiere hacer ${userResponses.comidas_diarias} comidas diarias.

                  Devualve la dieta en formato tabla markdown con las siguientes columnas:
                  Día, Comida, Alimentos, Nombre del plato o receta, Calorías.
                  Y no digas nda más, solo devuelve la tabla.
        `
    };

    // Hacer petición a LLM de OpenAI
    try {

        const completion= await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                promptSystem,
                promptUser
            ],
            max_tokens: 1000,
            temperature: 0.75
        });

        // Devolvemos el resultado generado
        const response = completion.choices[0].message.content.trim();

        return response;

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error al generar la dieta"});
    }
}

// Guardo temporalmente los datos del usuario (objeto de almacenamiento temporal de respuestas del usuario)
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
        const diet = await generateDiet(userData[userId]);

        // Devolver respuesta y la dieta
        return res.json({reply: `¡Aquí tienes tu dieta! \n ${diet}`});
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
