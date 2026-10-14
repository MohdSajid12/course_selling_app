const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../utills/db");
const { default: z } = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

adminRouter.post("/signup", async (req, res) => {
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
    const admin = await adminModel.findOne({ email: email });
    if (admin) {
      return res.status(500).json({ msg: `Admin Already Exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    return res.status(200).json({ msg: `Signup endpoint` });
  } catch (error) {
    return res.status(500).json({ msg: `Error ${error}` });
  }
});

adminRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: `Name and email required` });
    }
    const admin = await adminModel.findOne({ email: email });
    const matchedPassword = await bcrypt.compare(password, admin.password);
    if (!matchedPassword) {
      return res.status(409).json({ msg: `Invalid Crdentials` });
    }
    if (admin) {
      const token = jwt.sign(
        { id: admin._id.toString() },
        process.env.JWT_ADMIN,
      );
      return res.status(200).json({ msg: `Signin Successfull`, token: token });
    } else {
      return res.status(404).json({ msg: `Invalid Credentials` });
    }
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
});

adminRouter.post("/course", adminMiddleware ,(req, res) => {
  try {
    return res.status(200).json({ msg: `Signin endpoint` });
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
});

adminRouter.put("/course", (req, res) => {
  try {
    return res.status(200).json({ msg: `Signin endpoint` });
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
});

adminRouter.get("/course/bulk", (req, res) => {
  try {
    return res.status(200).json({ msg: `Signin endpoint` });
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
