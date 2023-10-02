// pages/api/getMetaphorContent

import axios from "axios";

export default async function handler(req: any, res: any) {
    console.log("getMetaphorContent API route was called");
    const metaphorKey = process.env.METAPHOR_API_KEY;
    const articleIds = Array.isArray(req.query.ids) ? req.query.ids : [req.query.ids];

    try {
        const response = await axios.get(`https://api.metaphor.systems/contents?ids=${articleIds}`, {  // using a GET request now
            headers: {
                'Accept': 'application/json',
                'x-api-key': metaphorKey
            }
        });
        res.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 500).json(error.response?.data || {});
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}
