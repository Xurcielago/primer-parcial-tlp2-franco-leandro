import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    deletedAt: { type: Date, default: null },
    
    profile: {
      employee_number: {
        type: String,
        unique: true,
        required: true,
      },
      first_name: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
      },
      last_name: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
      },
      phone: {
        type: String, 
      },

    },
    // ! FALTA COMPLETAR ACA
    //Completado
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA

export const UserModel = model("User", UserSchema);
