const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../utills/db");
const { z } = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  try {
    const requiredBody = z.object({
      email: z.string().min(3).max(20).email(),
      password: z.string().min(3).max(20),
      firstName: z.string().min(3).max(20),
      lastName: z.string().min(3).max(20),
    });
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
      return res.status(400).json({
        msg: `Invalid Format`,
        error: parsedDataWithSuccess.error,
      });
    }
    const { email, password, firstName, lastName } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(500).json({ msg: `User Already Exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    return res.status(200).json({ msg: `Signup Done` });
  } catch (error) {
    return res.status(500).json({ msg: `Error ${error}` });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: `Name and email required` });
    }
    const user = await userModel.findOne({ email: email });
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(409).json({ msg: `Invalid Crdentials` });
    }
    if (user) {
      const token = jwt.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET,
      );
      return res.status(200).json({ msg: `Signin Successfull`, token: token });
    } else {
      return res.status(404).json({ msg: `Invalid Credentials` });
    }
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
});

userRouter.get("/purchases", (req, res) => {
  try {
    return res.status(200).json({ msg: `` });
  } catch (error) {
    return res.status(500).json({ msg: `Error ${error}` });
  }
});

module.exports = {
  userRouter: userRouter,
};
