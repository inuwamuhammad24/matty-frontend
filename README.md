# 🤖 Matty AI

### AI-Powered University Information Assistant

Matty AI is an AI-powered university information assistant designed to make institutional information easier for students to access through a conversational interface.

The system uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant information from a university knowledge base and provide contextual responses to users.

## ✨ Overview

Finding accurate university information can often require students to search through multiple sources or contact administrative offices.

Matty AI provides a conversational interface where students can ask questions naturally and receive relevant answers based on available university information.

The frontend provides the user-facing chat experience and communicates with the Matty AI backend to process questions and display generated responses.

## 🚀 Features

* 💬 Conversational chat interface
* 🔎 AI-powered information retrieval
* 📚 Retrieval-Augmented Generation (RAG)
* 📝 Markdown rendering for structured responses
* 🌓 Light and dark mode
* ⚡ Responsive user interface
* 🔄 Loading and response states
* 🌐 REST API integration
* 📱 Mobile-friendly interface

## 🏗️ System Architecture

Matty AI follows a client-server architecture:

```text
┌─────────────────────┐
│                     │
│     Matty AI UI     │
│   React + Tailwind  │
│                     │
└──────────┬──────────┘
           │
           │ HTTP Requests
           ▼
┌─────────────────────┐
│                     │
│    Matty Backend    │
│   Node.js + Express │
│                     │
└──────────┬──────────┘
           │
           │ Retrieval + Generation
           ▼
┌─────────────────────┐
│                     │
│   Knowledge Base    │
│  + Vector Search    │
│                     │
└─────────────────────┘
```

The frontend is responsible for the conversational experience, while the backend handles the processing, retrieval, and AI response generation.

## 🛠️ Tech Stack

### Frontend

* **React**
* **Tailwind CSS**
* **JavaScript**
* **Webpack**

### AI

* **Retrieval-Augmented Generation (RAG)**
* **Large Language Models (LLMs)**
* **Vector Search**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**

## 📂 Project Structure

```text
matty-frontend/
├── app/
│   ├── components/
│   ├── pages/
│   └── ...
├── public/
├── package.json
├── webpack.config.js
├── netlify.toml
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* Yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/inuwamuhammad24/matty-frontend.git
```

Navigate into the project:

```bash
cd matty-frontend
```

Install dependencies:

```bash
yarn install
```

### Development

Start the development server:

```bash
yarn run dev
```

The application will then be available through the local development server.

### Production Build

Create a production build with:

```bash
yarn build
```

## 🔐 Environment Variables

If the application requires environment variables, create a `.env` file in the project root and configure the required values.

> Never commit `.env` files or API keys to the repository.

## 🌐 Deployment

The frontend is configured for deployment through **Netlify**.

The repository includes a `netlify.toml` configuration file for deployment settings.

## 📸 Screenshots

Screenshots of the application will be added here.

## 🔗 Related Repository

### Matty AI Backend

The backend responsible for API handling, information retrieval, and AI response generation is maintained separately.

👉 [Matty AI Backend](https://github.com/inuwamuhammad24/matty-backend)

## 📌 Project Status

Matty AI is an actively developed project focused on improving access to university information through conversational AI.

---

Built with ❤️ by **Inuwa Muhammad**
