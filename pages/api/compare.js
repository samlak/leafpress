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

  const { address, imageURL } = req.body;

  try {
    const geocodeURL = `https://geocode.maps.co/search?q=${address}&api_key=${process.env.GEOCODE_API_KEY}`;
    const geocodeResponse = await fetch(geocodeURL, {
      method: 'GET',
    });

    const geocodeData = await geocodeResponse.json();

    if (!geocodeData.length) {
      return res.status(404).json({
        status: false,
        error: "The location address is incorrect. Use a correct address.",
      });
    }

    const { lat, lon } = geocodeData[0]

    const electricityMapURL = `https://api.electricitymap.org/v3/power-breakdown/latest?${lat}=lat&lon=${lon}`;
    const electricityMapResponse = await fetch(electricityMapURL, {
      method: 'GET',
      headers: {
        'auth-token': process.env.ELECTRICITY_MAP_API_KEY
      }
    });

    const electricityMapData = await electricityMapResponse.json();

    if(electricityMapData.error) {
      return res.status(404).json({
        status: false,
        error: "Electricity data is not available for this location. Try again with a new location.",
      });
    }
    
    const electricityMapDataString = JSON.stringify(electricityMapData.powerConsumptionBreakdown)

    const systemPrompt = `You are an utility bill analyser who compare my electricity usage with that of the people in my neighborhood`;

    const prompt = `
    Your task is to analyse my electricity bill and compare it with my neighorhood's usage. 
    This is my neighorhood Power Consumption Breakdown(the unit of the data is in gCO2eq/kWh): ${electricityMapDataString}
    Summarize my neighorhood Power Consumption and more it to mine.
    Go straight to the point and include my energy contribution and implication on the neighborhood.
    Do not return the data just analyse the data and bring out your conclusion.
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
