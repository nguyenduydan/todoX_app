import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    const {filter = "today"} = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case "today":{
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        }
        case "week":{
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0); // getDay() trả về 0-6 (chủ nhật - thứ 7), getDate() trả về ngày trong thán
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }
        case "month":{
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case "all":
        default:{
            startDate = null;
            break;
        }
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};


    try {
        // method using aggregation pipelines
        const result = await Task.aggregate([
            {
                $match: query // lọc dữ liệu theo điều kiện trong query (nếu có)
            },
            {
                $facet:{ // facet là một nhánh, một nhánh có thể nhiều pipeline song song (có nghĩa là chạy nhiều công việc cùng lúc)
                    tasks: [{ $sort: { createdAt: -1 } }], // đây là 1 pipeline
                    activeCount: [{$match: {status: 'active'}}, {$count: 'count'}],
                    completeCount: [{$match: {status: 'complete'}}, {$count: 'count'}]
                }
            }
        ])

        const tasks = result[0].tasks; // lấy phần tử đầu tiên trong mảng result
        const activeCount = result[0].activeCount[0]?.count || 0; //nếu không có phần tử nào thì trả về 0
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
        console.error("Error when call getAllTasks:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });

        const newTask = await task.save();
        res.status(201).json(newTask);

    } catch (error) {
        console.error("Error when call createTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt
            },
            {new: true} //return the modified document rather than the original.
        );

        if(!updatedTask){
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);

    } catch (error) {
        console.error("Error when call updateTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if(!deleteTask){
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error when call deleteTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
