const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin");
const jwt = require("jsonwebtoken");

/*--------------joi validation schema-----------*/
const loginSchema = require("../../joi_schema/login");
const { signUpAdminSchema } = require("../../joi_schema/signup");

const localStorage = require("../../utils/localStorage");

//configs
const jwtSecret = require("../../config/jwtSecret");

//-------------signup controller--------------------//

exports.signUpAdmin = async (req, res, next) => {
  const adminExists = await Admin.findOne({ email: req.body.email });

  if (adminExists) {
    return res.status(400).json({ message: "admin with this email already registered" });
  } else {
    const { error, value } = signUpAdminSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);

      const registeredAdminUser = new Admin({ ...value, password: hashedPassword });

      try {
        const savedAdminUser = await registeredAdminUser.save();
        res.status(200).json({ ...savedAdminUser._doc, message: "Admin Signup Success", status: 200 });
      } catch (err) {
        if (err) throw err;
      }
    }
  }
};

//-----------login controller-------------//

exports.loginAdmin = async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const admin = {
      username: value.email,
      password: value.password
    };

    //here u need to add logic for login then send token after login successfully done
    if (admin.username === "xyz@gmail.com" && admin.password === "123456") {
      //for testing purpose
      jwt.sign({ admin: admin }, jwtSecret.jwtKey, (err, token) => {
        localStorage.setItem("loginToken", token);
        res.header("access-token", token);
        res.status(200).json({
          "access-token": token,
          message: "Login Success",
          status: 200
        });
      });
    }
    //need to implement login fail logic
  }
};
