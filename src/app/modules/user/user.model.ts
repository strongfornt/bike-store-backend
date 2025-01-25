import { model, Schema } from "mongoose";
import { TUser, UserModelInterFace } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, UserModelInterFace>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 4 characters long"],
      select:0
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  
  //hashing pass and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};
userSchema.statics.isUserExistsByUserId = async function (id: string) {
  return await this.findById(id).select('+password');
};
userSchema.post('save', function (doc, next) {
  
  doc.password = '';
  next();
});


userSchema.statics.isPasswordMatched = async function (
  plainTextPass,
  hashTextPass,
) {
  return await bcrypt.compare(plainTextPass, hashTextPass);
};



export const UserModel = model<TUser, UserModelInterFace>("User", userSchema);
