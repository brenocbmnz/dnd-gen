# 🎲 D&D Forge - AI Character Generator
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyUI-1996f9?style=for-the-badge&logo=daisyui&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E77F7?style=for-the-badge&logo=google-gemini&logoColor=white)


## 📄 Description
D&D Forge is a front-end web application designed to assist Dungeons & Dragons players and Dungeon Masters. Using the power of the Google Gemini API, the tool generates character portraits and detailed backstories from user-provided prompts.
This project was designed to be a creative and inspirational tool, demonstrating a modern integration between a reactive user interface and generative artificial intelligence services.


## ✨ Features
Detailed Character Creation: A complete form to enter Name, Age, Race, Class, Pronouns, and a detailed description.
AI Image Generation: Creates unique and stylized character portraits based on the form data.
AI Backstory Generation: Crafts cohesive and creative backstories that incorporate all character details, including their pronouns.
Intuitive Navigation: A multi-page interface, including a home page, the character creation area, and "About" and "Contact" pages.
"Quick Prompt" Generator: A feature to instantly generate a character concept (name, race, class, etc.), which can then be used to generate a full character.
Responsive Design: Interface built with Tailwind CSS and daisyUI, fully functional on mobile devices and desktops.


## 🛠️ Technologies Used
Frontend:
React: A library for building the user interface.
Vite: A modern and extremely fast build tool for front-end development.
Tailwind CSS: A utility-first CSS framework for rapid and responsive styling.
daisyUI: A component library for Tailwind CSS that adds themes and pre-styled components.
AI Services:
Google Gemini API:
Imagen Model: Used for generating character portraits.
Gemini Flash Model: Used for generating backstories and "Quick Prompt" concepts.


## 🚀 How to Run the Project
To run this project locally, you will only need one terminal, as it is a purely front-end application that consumes external APIs.
Prerequisites
Node.js (version 16 or higher)
npm or yarn
An API Key from Google AI Studio (the free tier is sufficient)
1. Setting up the Project
# Clone the repository
git clone https://github.com/your-username/dnd-generator.git

# Navigate to the project folder
cd dnd-generator

# Install the dependencies
npm install


## 2. Setting up Environment Variables
In the root directory of the project, create a file named .env.
Inside the .env file, add your API key from Google AI Studio. The variable name must start with VITE_.
VITE_API_KEY="YOUR_SUPER_SECRET_API_KEY_HERE"


## 3. Running the Application
After configuring the .env file, you can start the development server.
# Start the React application with Vite
npm run dev


The application will be accessible at http://localhost:5173 (or the port that Vite indicates in your terminal).
