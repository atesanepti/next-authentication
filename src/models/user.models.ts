import mongoose from "mongoose";
// import bcrypt from "bcryptjs"
// interface user {
//   username: string;
//   password: string;
// }

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
