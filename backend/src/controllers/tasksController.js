import Task from "../models/Task.js";

// 🟢 Lấy tất cả task của user hiện tại
export const getAllTasks = async (req, res) => {
    const { filter = "today" } = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case "today": {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        }
        case "week": {
            const mondayDate =
                now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }
        case "month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case "all":
        default: {
            startDate = null;
            break;
        }
    }

    // 🔒 Chỉ lấy task của user hiện tại
    const query = startDate
        ? { user: req.user._id, createdAt: { $gte: startDate } }
        : { user: req.user._id };

    try {
        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [
                        { $match: { status: "active" } },
                        { $count: "count" },
                    ],
                    completeCount: [
                        { $match: { status: "complete" } },
                        { $count: "count" },
                    ],
                },
            },
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
        console.error("Error when call getAllTasks:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 🟢 Tạo task mới — gắn với user hiện tại
export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({
            title,
            user: req.user._id, // 👈 Gắn user
        });

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error when call createTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 🟢 Cập nhật task — chỉ khi thuộc về user hiện tại
export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        // 🔒 Kiểm tra quyền sở hữu
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        task.title = title || task.title;
        task.status = status || task.status;
        task.completedAt = completedAt || task.completedAt;

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error when call updateTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 🟢 Xóa task — chỉ khi thuộc về user hiện tại
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        // 🔒 Kiểm tra quyền sở hữu
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await task.deleteOne();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error when call deleteTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
