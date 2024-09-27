import OpenAI from "openai";

export const config = {
  maxDuration: 120,
};

export const openai = new OpenAI({});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).appendHeader("Allow", "POST").json({
      status: false,
      error: "Only POST request is allowed",
    });
    return;
  }

  const { imageURL } = req.body;

  try {
    const systemPrompt = `You are an utility bill analyser`;

    const prompt = {
      "type": "text",
      "text": "Provide a comprehensive analysis for this electric bill."
    };

    const messages = [
      { 
        "role": "system", 
        "content": systemPrompt 
      },
      {
        "role": "user",
        "content": [
          {
            "type": "image_url",
            "image_url": {
              "url": imageURL
            }
          },
          {...prompt}
        ]
      }
    ];


    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 1,
      stream: false
    });

    const generatedResponse = response.choices.pop();
    const content = generatedResponse.message.content;

    console.log(content)

    return res.status(200).json({
      status: true,
      data: content,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      status: false,
      error: error,
    });
  }

}
