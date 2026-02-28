
import express from 'express';
import {resolve} from 'path';
import model from './Gemini_AI_API.js';
const app = express();
app.use(express.json());
app.use(express.static("./HACKATHON_BACKEND"));

app.get("/",(req,res) =>{
    res.status(200).sendFile(resolve("./home_page/language.html"));
});

app.get("/credentials",(req,res) => {
    res.status(200).sendFile(resolve("./credentials/credential.html"));
});
app.get("/chat",(req,res) =>{
    res.status(200).sendFile(resolve("./chat/chat.html"));
});
app.post("/chat", async (req, res) => {
    try {
        console.log("Incoming body:", req.body);

        if (!req.body || !req.body.responses) {
            return res.status(400).json({
                success: false,
                message: "Invalid body format"
            });
        }

        const prompt = buildPromptFromUserData(req.body);

        console.log("Generated Prompt:\n", prompt);

        const result = await get_data(prompt);

        const aiText = result

        return res.json({
            success: true,
        });

    } catch (error) {
        console.error("FULL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
});
app.get("/loading",(req,res)=>{
    res.status(200).sendFile(resolve("./loading/loading.html"));
})
app.get("/dashboard",(req,res)=>{
    res.json(aitext);  
})


app.listen(5000,() =>{
    console.log("server listening on 5000");
})


async function get_data(){
    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    let parsed;

    try {
        parsed = JSON.parse(aiText);
    } catch (err) {
        console.error("AI returned invalid JSON:", aiText);
        return res.status(500).json({
            success: false,
            message: "AI formatting error"
        });
}

return res.json({
    success: true,
    schemes: parsed.schemes
});
};

function buildPromptFromUserData(userData) {

    const responses = userData.responses || [];

    let formattedAnswers = responses
        .map(item => `${item.question_key.replace("_", " ").toUpperCase()}: ${item.answer}`)
        .join("\n");

    const prompt = `
You are a Government Scheme Recommendation Engine.

Return response STRICTLY in valid JSON format only.
No extra text.

Format:

{
  "schemes": [
    {
      "name": "",
      "benefits": "",
      "eligibility_reason": ""
    }
  ]
}

User Data:
${formattedAnswers}
`;

    return prompt;
};