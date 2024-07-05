const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");

const getUser = async (req, res) => {
  const { user } = req.user;
  return res.json({ error: false, user });
};

const updateUser = async (req, res) => {
  const { name, lastName, email, img } = req.body;

  if (!name && !lastName && !email) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const result = await cloudinary.uploader.upload(img, {
      folder: "users",
    });
    const user = await User.findOne({ userId: user._id });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    if (name) {
      user.name = name;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (img) {
      user.img = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    await user.save();
    return res.json({ error: false, user });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getUser, updateUser };
