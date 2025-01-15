const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();
//only admin can access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "welcome Admin" });
});
// Both admin and staff can access this router
router.get(
  "/staff",
  verifyToken,
  authorizeRoles("admin", "staff"),
  (req, res) => {
    res.json({ message: "welcome staff" });
  }
);
//All can access this router
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin", "staff", "client"),
  (req, res) => {
    res.json({ message: "welcome user" });
  }
);

module.exports = router;
