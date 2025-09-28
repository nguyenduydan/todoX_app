# ToDoX

A modern, responsive task management application built with React and Node.js, featuring a beautiful UI with dark mode support.

## ✨ Features

- **Task Management**
  - Create, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Filter tasks by status (All, Active, Complete)
  - View tasks by time period (Today, Week, Month, All)
  - Pagination for task lists

- **Modern UI/UX**
  - Beautiful gradient designs
  - Smooth animations and transitions
  - Responsive layout for all devices
  - Dark mode support
  - Toast notifications for actions

## 🛠️ Tech Stack

### Frontend
- React 19
- TailwindCSS
- Radix UI Components
- Axios for API calls
- Sonner for toast notifications
- Lucide React for icons

### Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS for cross-origin requests
- Environment variables with dotenv

## 🚀 Getting Started

1. **Clone the repository**
```bash
    git clone https://github.com/nguyenduydan/todoX_app.git
    cd todoX_app
```
2. **Set up envairoment variables**

Create ```.env``` file in the backend directory:

    STATUS_ENV=development
    PORT=PORT
    MONGODB_URL=your_mongodb_connection_string

3. **Install dependencies and build**
    ```bash
        # Install all dependencies and build frontend
        npm run build
    ```
4. **Start the application**

    ```bash
    npm start
    ```
## 📦 Project Structure

```
todox/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utilities and constants
│   │   └── pages/         # Page components
│   └── public/            # Static assets
└── backend/               # Node.js backend
    ├── src/
    │   ├── configs/      # Database configuration
    │   ├── controllers/  # Request handlers
    │   ├── models/       # Database models
    │   └── routes/       # API routes
    └── .env              # Environment variables
```

## 💻 Development
1. **Start Backend (Development)**
    ```bash
    cd backend
    npm run dev
    ```
2. **Start Frontend (Development)**

    ```bash
    cd frontend
    npm run dev
    ```
## 🚀 Deployment
The application is configured for easy deployment:

1. Set ```STATUS_ENV=production``` in backend ```.env```
2. Run ```npm run build``` to build the frontend
3. Start the server with ```npm start```

The backend will serve the static frontend files in production.

