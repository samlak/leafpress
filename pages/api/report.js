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

    const prompt = `
      Provide a comprehensive analysis for this electric bill and extract the house address of the bill owner.
      The analysis should only include the most important aspect of the my energy usage.
      Talk more on my energy usage.

      Do not include the report title like "Energy Bill Analysis", just start from the account summary.

      If the house address is not found return "NO ADDRESS".
      Your resault must be in JSON format like this:
      {
        "analysis": "the analysis should be in markdown format"
        "address": "house address on the bill"
      }

    `;

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
          {
            "type": "text",
            "text": prompt
          }
        ]
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 1,
      stream: false,
      response_format: { type: "json_object" }
    });

    const generatedResponse = response.choices.pop();
    const content = generatedResponse.message.content;
    const contentParsed = JSON.parse(content);

    return res.status(200).json({
      status: true,
      data: contentParsed,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      status: false,
      error: error,
    });
  }

}
