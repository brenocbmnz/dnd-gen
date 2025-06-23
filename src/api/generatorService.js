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
        // Try to parse the error response body from Google for more details
        let errorDetails = `Image API request failed with status ${response.status}`;
        try {
            const errorData = await response.json();
            if (errorData.error && errorData.error.message) {
                // This gives us the specific reason from Google's server
                errorDetails += `: ${errorData.error.message}`;
            }
        } catch {
            // Could not parse JSON, stick with the original status code.
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
            // Could not parse JSON, stick with the original status code.
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