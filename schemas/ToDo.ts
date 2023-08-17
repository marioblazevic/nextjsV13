import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.ToDo || mongoose.model("ToDo", ToDoSchema);
