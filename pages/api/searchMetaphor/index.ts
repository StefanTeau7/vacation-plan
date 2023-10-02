// pages/api/searchMetaphor

import axios from 'axios';

export default async function handler(req: any, res: any) {
    console.log("searchMetaphor API route was called");
    const metaphorKey = process.env.METAPHOR_API_KEY;

    try {
        const response = await axios.post('https://api.metaphor.systems/search', req.body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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



