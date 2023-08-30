import mongoose from "mongoose";
import taskStatus from "../utils/taskStatus.js";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide the task title"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.TODO,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Task", taskSchema);
