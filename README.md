# SyncScript: AI-Driven Strategic Meeting Intelligence

**SyncScript** is a high-performance productivity engine designed to eliminate "meeting debt." It leverages Large Language Models (LLMs) to transform unstructured meeting transcripts into professional, high-density executive summaries and actionable technical roadmaps.

---

## 🚀 The Problem
Technical Leads and Product Managers spend an average of **4-6 hours weekly** manually distilling discussion notes into stakeholder reports. This manual process is prone to human error, information loss, and delayed follow-ups.

## 💡 The Solution
SyncScript automates the "Meeting-to-Action" pipeline. Using advanced prompt engineering and the **Gemini 1.5 Flash** architecture, the application distinguishes between business objectives and technical implementation tasks, providing a structured output that is ready for immediate distribution.



## ✨ Key Features
* **Intelligent Parsing:** Uses Chain-of-Thought prompting to extract P0 priorities and critical decisions.
* **Dual-Track Classification:** Automatically categorizes insights into Executive Summaries, Business Action Items, and Technical Tasks.
* **Client-Ready Exports:** Integrated `jsPDF` engine for instant generation of professional, branded PDF reports.
* **Privacy-Centric Design:** Stateless processing ensures that sensitive transcript data is never stored on a server.
* **Glassmorphic UI:** A minimalist, responsive interface built with Tailwind CSS for maximum readability.

## 🛠️ Tech Stack
* **Frontend:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS (PostCSS)
* **Intelligence:** Google Gemini 1.5 Flash API
* **Documentation:** jsPDF
* **Deployment:** Netlify (CI/CD)



## 🏗️ Architecture & Security
* **Secret Management:** Secured API communication via Vite environment variables and `.env` protection to prevent credential exposure.
* **Prompt Engineering:** Implemented a robust system prompt designed for high-density JSON extraction and markdown-sanitized parsing.
* **Data Integrity:** Features a custom regex-based JSON sanitizer to ensure seamless parsing of LLM outputs into the UI components.

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/syncscript.git](https://github.com/your-username/syncscript.git)
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure Environment Variables Create a .env file in the root directory:**
   ```bash
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. **Launch Development Server**
   ```bash
   npm run dev
   ```

Created by Priyanshu Rawat - Product-Minded Engineering.
