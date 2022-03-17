import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user";
import settings from "../config";
import { getErrorMessage } from "../utils/index";

// interface IRequest extends Request {
//   user: object;
// }


const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.header("Authorization") || '').replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        data: null,
        message: "Access denied. No token provided.",
      });
    }
    let decoded: { id?: string } = {};
    try {
      decoded = jwt.verify(token, settings.jwt.secretKey) as { id?: string };
    } catch (e) {
      return res.status(401).json({
        success: false,
        data: null,
        message: "session expired",
      });
    }

    const user = await userModel.findById(decoded?.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        message: "Invalid Token",
      });
    }

  //  req.user = decoded

    return next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: getErrorMessage(err),
    });
  }
};

export default authGuard