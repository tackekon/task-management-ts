import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  {
    timestamps: true
  }
);

// Tham số thứ 3 là tên collection trong database, nếu không có tham số này thì mongoose sẽ tự động chuyển tên model sang dạng số nhiều và viết thường để làm tên collection
const User = mongoose.model('User', userSchema, "users");

export default User;