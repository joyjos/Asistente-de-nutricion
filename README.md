# Nutrition Assistant with OpenAI

**Asistente de Nutrición inteligente** que utiliza la **API de OpenAI** para ofrecer recomendaciones personalizadas sobre alimentación, hábitos saludables y planificación de comidas. El objetivo es ayudar a las personas a mejorar su bienestar nutricional de forma sencilla, interactiva y accesible.

## Table of Content
-  [*01 Installation*](#section_01)
-  [*02 Languages and Technologies*](#section_02)
-  [*03 API Endpoints*](#section_03)
-  [*04 Notes*](#section_04)
-  [*05 Author*](#section_05)
-  [*06 License*](#section_06)
  
<br>

<a id="section_01"></a>
## *01 ⚙️ Installation*

- Clone the repository:

  ~~~
  git clone https://github.com/joyjos/Asistente-de-nutricion
  cd Asistente-de-nutricion
  ~~~

- Install `node_modules`:
  
  ~~~
  npm install
  ~~~

- Configure your OpenAI key in the `.env` file:

  ~~~
  OPENAI_API_KEY=your_key_here
  ~~~

- Run the application:
  
  ~~~
  npm start
  ~~~

- Abre en tu navegador: `http://localhost:3000`

<br>

<a id="section_02"></a>
## *02 💻 Languages and Technologies*

### FrontEnd
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### BackEnd
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### APIs and services
![OpenAI](https://img.shields.io/badge/OpenAI_API-000000?style=for-the-badge&logo=openai&logoColor=white)

### Version control
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)

### Other tools
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)

<br>

<a id="section_03"></a>
## *03 🔗 API Endpoints*

| HTTP Method | Endpoint           | Comment                                       |
|-------------|--------------------|-----------------------------------------------|
| POST        | /api/nutri-chat    | Genera una dieta semanal                      |

<br>

<a id="section_04"></a>
## *04 📌 Notes*

Su objetivo principal es experimentar con la API de OpenAI aplicada al ámbito de la nutrición.  
Actualmente se centra en la interacción básica mediante chat, con respuestas personalizadas generadas por IA.

Requiere una cuenta activa en OpenAI.

Las recomendaciones ofrecidas por la IA **no sustituyen el asesoramiento profesional** de un nutricionista o médico.

Actualmente, el asistente no almacena datos del usuario de forma persistente (sin base de datos).

Se ha limitado el número de tokens en las respuestas para evitar costes elevados con la API.

<br>

<a id="section_05"></a>
## *05 🧑‍💻 Author*

Proyecto desarrollado por **JOYJOS** como parte del curso de Udemy:  
_“Desarrollo Web con IA: OpenAI, DeepSeek, JavaScript y NodeJS”_

<br>

<a id="section_06"></a>
## *06 📜 License*

Este proyecto está disponible bajo la licencia [MIT](LICENSE).