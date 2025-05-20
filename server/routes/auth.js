import express from "express";
import User from "../models/User.js";
import Session from "../models/sessions.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const sessionId = req.signedCookies.sid;
    const session = await Session.findById(sessionId);

    if (session) {
      session.expiredAt = Math.round(Date.now() / 1000) + 60 * 60 * 24 * 30;
      session.userId = user._id;

      const cart = await Cart.findOne({ userId: user._id });
      if (cart) {
        cart.courses = [...cart.courses, ...session.data.cart];
        await cart.save();
      }
      else {
        await Cart.create(
          {
            userId: user._id,
            courses: session.data.cart,
          }
        )
      }

      session.data = {}
      await session.save();

      res.cookie("sid", sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
      });

      return res.json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });

    } else {
      const newSession = await Session.create({ userId: user._id });
      res.cookie("sid", newSession._id, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
      });

      return res.json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", async (req, res) => {

  const sessionId = req.signedCookies.sid;

  await Session.findByIdAndDelete(sessionId);

  res.status(200).json({
    message: "Logout successful"
  });

})

router.get("/profile", async (req, res) => {

  const session = await Session.findById(req.signedCookies.sid);

  if (!session || !session.userId) {
    return res.status(404).json({
      message: "You are not logged in"
    })
  }

  if (session.expiredAt < Math.round(Date.now() / 1000)) {
    return res.status(401).json({
      message: "Session expired"
    })
  }

  const user = await User.findById(session.userId).lean();

  res.status(200).json({
    email: user.email,
    name: user.name
  })
});

export default router;
