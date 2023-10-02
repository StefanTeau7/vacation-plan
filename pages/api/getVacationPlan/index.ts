import OpenAI from 'openai';
require('dotenv').config();

export default async function handler(req: any, res: any) {
    console.log("getVacationPlan API route was called")

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const openAIKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey: openAIKey });

    console.log("key = " + openAIKey);

    const { location, trimmedContents } = req.body;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            messages: [
                {
                    role: 'system',
                    content: `createVacationPlan. You are a vacation creation assistant. Craft an exciting plan in JSON format for the user's vacation in ${location} based on the given content. If you don't find the needed information inside the text, use your own info.`
                },
                {
                    role: 'user',
                    content: trimmedContents,
                },
            ],
            functions: [{
                name: "createVacationPlan",
                description: "For every user request, call this function. Extract relevant information from text.",
                parameters: {
                    type: "object",
                    properties: {
                        "location": {
                            "type": "string",
                            "description": "The location of the vacation"
                        },
                        "activities": {
                            "type": "string",
                            "description": "Description of activities to do on vacation. Written to encourage and excite the user about the trip."
                        },
                        "must-see": {
                            "type": "string",
                            "description": "A list of iconic, must-see places on the vacation, historical importance, years and reasons to visit, etc."
                        },
                        "restaurants": {
                            "type": "string",
                            "description": "A list of restaurants to eat at on the vacation, offering traditional food, must try national dishes."
                        },
                        "hotels": {
                            "type": "string",
                            "description": "Areas to look for hotels in and why these areas are best (safe, cheap, etc)."
                        },
                    },
                    required: ["activities", "must-see", "restaurants", "hotels", "photo"]
                }
            },],
            function_call: {
                name: "createVacationPlan",
            }
        });

        const vacationPlan = chatCompletion.choices[0]?.message.function_call?.arguments;
        console.log("vacationPlan = " + vacationPlan);

        await res.status(200).json(vacationPlan);
        return;
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).json({ message: 'Failed to generate a vacation plan.' });
    }
}
