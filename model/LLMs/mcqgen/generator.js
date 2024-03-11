// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  

  const API_KEY = "AIzaSyDSJnOO7jDpIBd5_jxa0YFdUup2itvPFCU"
  const MODEL_NAME = "gemini-pro";
//   const API_KEY = "YOUR_API_KEY";
  
  async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
    


    // const topic= "Theory of Evolution";
    const topic = prompt("Topic:")

    const multilineString = `
    Generate 5 MCQs on the ${topic} with 4 options each.
    the formatt you should return is :

    {
        "question": "What is the capital of France?",
        "options": [
          "Paris",
          "London",
          "Berlin",
          "Rome"
        ],
        "answer": "Paris"
      }



    `;
    const result = await chat.sendMessage(User_input);
    const response = result.response;
    console.log(response.text());
  }
  
  runChat();