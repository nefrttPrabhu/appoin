# Project Synapse - Prototype
This archive contains a minimal, developer-ready skeleton for **Project Synapse**:
- Backend: Node.js + Express + MongoDB (skeleton)
- Frontend: React + Vite (simple library UI)
- Extension: Chrome extension popup + content script to capture a page

IMPORTANT: After extracting, run `npm install` in both `backend/` and `frontend/` and set your `.env` values.

Quick start (assuming `npm`):
```bash
# Backend (open a terminal)
cd backend
npm install
# start (after installing dependencies)
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev

# Load the extension in Chrome:
# chrome://extensions → Developer mode → Load unpacked → select extension/
```
Default choices included:
- Local MongoDB URI in `.env.example` points to mongodb://localhost:27017/synapse
- Package manager: npm
- Vite dev server port: default (5173)
- Dummy embedding & OCR service placeholders included in `backend/services/`

Enjoy — expand from here!
