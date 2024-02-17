import jwt from "jsonwebtoken";
import User from "../api/users/model.js";

export const protect = async (req, res, next) => {
  try {
    const token = await req.cookies[process.env.JWT_COOKIE];

    if (!token)
      return res
        .status(401)
        .send({ status: false, message: "Not authorize, no token" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res
        .status(401)
        .send({ status: false, message: "Not authorize, Invalid token" });

    const UserObject = await User.findById(verified.id).select("-password");

    req.user = UserObject;

    next();
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(401).send({
          status: false,
          message: `You haven't permission to ${req.method} ${req.originalUrl}`,
        });
      }
      next();
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  };
};
