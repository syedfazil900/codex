import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());


app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.,
      max_tokens: 3000,
      top_p: 0.9,
      frequency_penalty: 0.7,
      presence_penalty: 0,
    });
    res.status(200).send({
      bot: (await response).data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () => {
  console.log("server is running");
});
