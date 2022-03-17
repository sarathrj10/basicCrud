import { RequestHandler } from "express";
import userModel from "../../models/user";
import {
  getErrorMessage,
  userValidation,
  userValidationType,
} from "../../utils";

export const userRegistration: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const isValid = userValidation({
      name,
      email,
      password,
      type: userValidationType.Register,
    });

    if (!isValid.success) {
      return res.status(422).json({
        success: false,
        data: null,
        message: isValid.message,
      });
    }

    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
      return res.status(422).json({
        success: false,
        data: null,
        message: "email already exists",
      });
    }

    const hashedPassword = await userModel.generateHash(password);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      data: user,
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: getErrorMessage(err),
    });
  }
};

export const userLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const isValid = userValidation({
        name : undefined,
        email,
        password,
        type: userValidationType.Login
      });
  
      if (!isValid.success) {
        return res.status(422).json({
          success: false,
          data: null,
          message: isValid.message,
        });
      }

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(422).json({
          success: false,
          data: null,
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await user.isValidPassword(password,user.password)

      if(!isPasswordValid){
        return res.status(422).json({
            success: false,
            data: null,
            message: "Invalid email or password",
          });
      }

      const authToken = await user.generateAuthToken()

      return res.status(200).json({
        success: true,
        data: {user,authToken},
        message: "User login successful",
      });

  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: getErrorMessage(err),
    });
  }
};
