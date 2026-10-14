const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../utills/db");
const { default: z } = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");

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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, price, imageUrl } = req.body;

    if (!title || !description || !price || !imageUrl) {
      return res.status(403).json({ msg: `All field required` });
    }
    const course = await courseModel.create({
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
      creatorId: adminId,
    });
    return res
      .status(200)
      .json({ msg: `Course Created Successfully`, courseId: course._id });
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, price, imageUrl, courseId } = req.body;
    if(!courseId){
        return res.status(403).json({msg:`Please provide course id`});
    }

    const courseFind = await courseModel.find({_id : courseId});
    if(courseFind.length ==0){
      return res.status(404).json({msg:`No Course Exists`});
    }

    const course = await courseModel.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId,
      },
    );
    return res
      .status(200)
      .json({ msg: `Course Update Successfully`, courseId: course._id });
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;

    const courses = await courseModel.findOne({ creatorId: adminId });
    if (courses) {
      return res.status(200).json({ msg: `Your courses`, courses: courses });
    } else {
      return res.status(404).json({ msg: `No Courses Found` });
    }
  } catch (error) {
    res.status(500).json({ msg: `Error ${error}` });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
