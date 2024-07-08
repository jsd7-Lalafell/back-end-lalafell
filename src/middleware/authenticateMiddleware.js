const { verify } = require("../utils/token");
const User = require("../models/user.model"); // อย่าลืม require โมเดล User

const authenticateMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: true, message: "ไม่ได้รับอนุญาต" });

    const decoded = verify(token);
    const user = await User.findById(decoded.user);
    if (!user)
      return res.status(401).json({ error: true, message: "ไม่พบผู้ใช้" });

    req.user = user;
    next();
  } catch (error) {
    console.error(`ข้อผิดพลาดในการยืนยันตัวตน: ${error.message}`);
    return res.status(401).json({ error: true, message: "ไม่ได้รับอนุญาต" });
  }
};

module.exports = { authenticateMiddleware };
