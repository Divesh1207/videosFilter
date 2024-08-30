import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const processTextWithNLP = async (text) => {
    const token = process.env.HUGGING_FACE_API_KEY;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.data || !response.data[0] || !response.data[0].generated_text) {
            throw new Error('Unexpected response format from NLP service');
        }

        const generatedText = response.data[0].generated_text;
        // Instead of splitting, you can apply more advanced processing here
        const keywords = generatedText.match(/\b\w+\b/g); // Extract meaningful words

        return { generated_text: keywords };
    } catch (error) {
        console.error('NLP processing error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to process text with NLP service. Please try again.');
    }
};




