
export const generateImage = async (prompt, apiKey) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
    const payload = {
        instances: [{ prompt }],
        parameters: { "sampleCount": 1 }
    };
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        let errorDetails = `Image API request failed with status ${response.status}`;
        try {
            const errorData = await response.json();
            if (errorData.error && errorData.error.message) {
                errorDetails += `: ${errorData.error.message}`;
            }
        } catch {
            // This block is intentionally empty.
        }
        throw new Error(errorDetails);
    }
    
    const result = await response.json();
    if (result.predictions?.[0]?.bytesBase64Encoded) {
        return `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
    } else {
        throw new Error("Invalid response structure from Image API");
    }
};

export const generateBackstory = async (prompt, apiKey) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        let errorDetails = `Backstory API request failed with status ${response.status}`;
        try {
            const errorData = await response.json();
            if (errorData.error && errorData.error.message) {
                errorDetails += `: ${errorData.error.message}`;
            }
        } catch {
            // This block is intentionally empty.
        }
        throw new Error(errorDetails);
    }

    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        return result.candidates[0].content.parts[0].text;
    } else {
        throw new Error("Invalid response structure from Backstory API");
    }
};

// Updated function with robust JSON parsing
export const generateQuickPrompt = async (apiKey) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const prompt = `Generate a random Dungeons and Dragons character concept. Return the response as a single, valid JSON object only, with no other text or formatting. The JSON object must have these exact keys: "name", "age", "race", "charClass", "pronouns", and "description". For "pronouns", choose one of "he/him", "she/her", or "they/them".`;

    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.9 // Increase randomness for more varied results
        },
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Quick Prompt API request failed with status ${response.status}`);
    }

    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const rawText = result.candidates[0].content.parts[0].text;
        
        // Find the start and end of the JSON object within the raw text
        const startIndex = rawText.indexOf('{');
        const endIndex = rawText.lastIndexOf('}');
        
        if (startIndex !== -1 && endIndex !== -1) {
            const jsonString = rawText.substring(startIndex, endIndex + 1);
            try {
                // Parse the extracted JSON string
                return JSON.parse(jsonString);
            } catch (e) {
                console.error("Failed to parse extracted JSON:", e);
                throw new Error("Failed to parse the character concept from the AI's response.");
            }
        } else {
            throw new Error("Could not find a valid JSON object in the AI's response.");
        }
    } else {
        throw new Error("Invalid response structure from Quick Prompt API");
    }
};