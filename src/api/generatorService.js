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

// Updated function with robust JSON parsing and improved variety
export const generateQuickPrompt = async (apiKey) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const prompt = `Generate a completely unique and creative Dungeons and Dragons character concept. Be wildly imaginative and avoid common tropes. Consider unusual race/class combinations, unique backgrounds, and interesting personality quirks. 

Examples of creative concepts:
- A Dragonborn Bard who was raised by pixies and speaks only in rhymes
- A Warforged Druid who believes they're actually a tree that gained consciousness
- A Halfling Barbarian who gets angry when people assume they're a cook
- A Tiefling Cleric who worships a god of lost socks and minor inconveniences

Return ONLY a single, valid JSON object with these exact keys: "name", "age", "race", "charClass", "pronouns", and "description". 

For "pronouns", randomly choose one of "he/him", "she/her", or "they/them".
For "name", create something memorable and fitting for the character concept.
For "race", feel free to use any official D&D race or interesting variants.
For "charClass", use any official D&D class.
For "description", include unique personality traits, unusual appearance details, quirky habits, or interesting backstory hints that make this character stand out.

Be creative, unexpected, and fun!`;

    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 1.0, // Maximum creativity
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500
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