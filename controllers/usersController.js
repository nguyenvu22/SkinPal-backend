const User = require("../models/user");
const storage = require("../utils/cloud_storage");

module.exports = {
  register(req, res) {
    const user = req.body;
    User.create(user, (err, data) => {
      User.findByEmail(user.email, (errByEmail, userByEmail) => {
        if (errByEmail) {
          return res.status(501).json({
            success: false,
            message: "User not exist",
          });
        }

        if (userByEmail.length == 0) {
          return res.status(409).json({
            success: false,
            message: "Email has already used",
            error: err,
          });
        }

        //already catch if duplicate email
        // if (err) {
        //   return res.status(501).json({
        //     success: false,
        //     message: "False to regist a user",
        //     error: err,
        //   });
        // }

        return res.status(201).json({
          success: true,
          message: "Regist a new user.",
          data: true,
          // data: data,
        });
      });
    });
  },

  async registerWithImg(req, res) {
    //Dont obtain the user directly since we send the form with 2 params (image & user)
    const user = JSON.parse(req.body.user);

    //files that user sent
    const files = req.files;

    if (files.length > 0) {
      // Setup path to upload to Firebase
      const path = `image_${Date.now()}`;
      // Uploading only 1 file with name = path
      const url = await storage(files[0], path);

      if (url != undefined && url != null) {
        // Store in db the img url at Firebase
        user.avatar = url;
      }
    }

    User.create(user, (err, data) => {
      User.findByEmail(user.email, (errByEmail, userByEmail) => {
        if (errByEmail) {
          return res.status(501).json({
            success: false,
            message: "User not exist",
          });
        }

        if (userByEmail.length == 0) {
          return res.status(409).json({
            success: false,
            message: "Email has already used",
            error: err,
          });
        }

        // user.id = data;

        //send id || send user => redirect directly to Home by store user
        return res.status(201).json({
          success: true,
          message: "Regist a new user.",
          data: true,
          // data: data,
          // data: user,
        });
      });
    });
  },

  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, (err, user) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "User not exist",
          error: err,
        });
      }

      if (user.length == 0) {
        return res.status(409).json({
          success: false,
          message: "Email not exist",
        });
      }

      if (user[0].password != password) {
        return res.status(401).json({
          success: false,
          message: "Wrong password",
        });
      }

      return res.status(200).json({
        success: true,
        message: "You have logged in.",
        data: user[0],
      });
    });
  },

  loginGoogle(req, res) {
    var user = req.body;
    user.password = 123;
    user.dob = "2000-01-01 00:0:00";

    User.findByEmail(user.email, (err, resUser) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "User not exist",
          error: err,
        });
      }
      if (resUser.length == 0) {
        User.create(user, (errAtCreate, resultAtCreate) => {
          User.findByEmail(user.email, (errAtLogin, userAtLogin) => {
            return res.status(200).json({
              success: true,
              message: "You have logged in.",
              data: userAtLogin[0],
            });
          });
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "You have logged in.",
          data: resUser[0],
        });
      }
    });
  },

  update(req, res) {
    const user = req.body;

    User.updateWithoutImg(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "False to update a user",
          error: err,
        });
      }
      User.findByEmail(user.email, (errByEmail, userByEmail) => {
        if (userByEmail.length == 0) {
          return res.status(409).json({
            success: false,
            message: "Email not exist",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Your profile has been updated",
          data: userByEmail[0],
        });
      });
    });
  },

  async updateWithImg(req, res) {
    const user = JSON.parse(req.body.user);
    const files = req.files;
    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);
      if (url != undefined && url != null) {
        user.avatar = url;
      }
    }

    User.update(user, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "False to update a user",
          error: err,
        });
      }
      User.findByEmail(user.email, (errByEmail, userByEmail) => {
        if (userByEmail.length == 0) {
          return res.status(409).json({
            success: false,
            message: "Email not exist",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Your profile has been updated",
          data: userByEmail[0],
        });
      });
    });
  },

  updateToPremium(req, res) {
    const data = req.body;
    User.updateToPremium(data, (err, data) => {
      if (err)
        return res.status(501).json({
          success: false,
          message: "",
          error: err,
        });
      return res.status(200).json({
        success: true,
        message: "Your account is Premium now.",
        data: data,
      });
    });
  },
};
