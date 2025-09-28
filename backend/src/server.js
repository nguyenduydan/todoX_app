import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./configs/db.js";
import taskRouter from "./routes/tasksRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname fix cho ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());

// chỉ bật CORS khi dev
if (process.env.STATUS_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:5173" }));
}

// routes API
app.use("/api/tasks", taskRouter);

// console.log(process.env.STATUS_ENV)

// phục vụ frontend build khi production
if (process.env.STATUS_ENV === "production") {
    const frontendPath = path.join(__dirname,"..", "..", "frontend", "dist");

    // ✅ in ra đường dẫn để debug
    console.log(">> Serving frontend from:", frontendPath);

    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"), (err) => {
            if (err) {
                console.error("❌ Lỗi đọc file index.html:", err);
                res.status(500).send("Không tìm thấy frontend build");
            }
        });
    });
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`>> Server is running on port: ${PORT} <<`);
    });
});
