import express from "express";
import Cart from "../models/Cart.js";
import Session from "../models/sessions.js";
import Course from "../models/Course.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  //Add your code here

  try {
    const session = await Session.findById(req.signedCookies.sid);
    let detailedCartItems = [];

    if (!session) {
      return res.status(200).json([]);
    }

    if (!session.userId) {

      await session.populate("data.cart.courseId");

      detailedCartItems = session.data.cart.map((item) => {
        const course = item.courseId;
        return {
          _id: course._id,
          name: course.name,
          image: course.image,
          price: course.price,
          quantity: item.quantity
        };
      });
    }
    else {
      const cart = await Cart.findOne({ userId: session.userId }).populate("courses.courseId");

      detailedCartItems = cart.courses.map((item) => {
        const course = item.courseId;
        return {
          _id: course._id,
          name: course.name,
          image: course.image,
          price: course.price,
          quantity: item.quantity
        };
      });
    }

    res.status(200).json(detailedCartItems);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post("/", async (req, res) => {
  //Add your code here

  const courseId = req.body.courseId;

  try {

    const session = await Session.findById(req.signedCookies.sid);

    if (session.userId) {
      const result = await Cart.updateOne(
        {
          userId: session.userId,
          "courses.courseId": courseId,
        },
        {
          $inc: {
            "courses.$.quantity": 1,
          },
        }
      )

      if (result.matchedCount === 0) {
        await Cart.updateOne(
          { userId: session.userId },
          { $push: { "courses": { courseId, quantity: 1 } } }
        )
      }
    } else {
      const result = await Session.updateOne(
        {
          _id: req.signedCookies.sid,
          "data.cart.courseId": courseId,
        },
        {
          $inc: {
            "data.cart.$.quantity": 1,
          },
        }
      )

      if (result.matchedCount === 0) {
        await Session.updateOne(
          { _id: req.signedCookies.sid },
          { $push: { "data.cart": { courseId, quantity: 1 } } }
        )
      }
    }

    res.status(200).json({ message: "Course added to cart" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove course from cart
router.delete("/:id", async (req, res) => {
  //Add your code here

  const courseId = req.params.id;

  try {

    const result = await Session.findById(req.signedCookies.sid);

    if (!result) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!result.userId) {
      if (result.data.cart.length === 0) {
        return res.status(404).json({ message: "Cart is empty" });
      }

      const course = result.data.cart.find((item) => item.courseId === courseId);

      if (course.quantity === 1) {
        await Session.updateOne(
          { _id: req.signedCookies.sid },
          { $pull: { "data.cart": { courseId } } }
        )
      } else {
        await Session.updateOne(
          {
            _id: req.signedCookies.sid,
            "data.cart.courseId": courseId,
          },
          {
            $inc: {
              "data.cart.$.quantity": -1,
            },
          }
        )
      }
    } else {

      const cart = await Cart.findOne({ userId: result.userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      if (cart.courses.length === 0) {
        return res.status(404).json({ message: "Cart is empty" });
      }

      const course = cart.courses.find((item) => item.courseId.toString() === courseId);

      if (course.quantity === 1) {
        await Cart.updateOne(
          { userId: result.userId },
          { $pull: { "courses": { courseId } } }
        )
      } else {
        await Cart.updateOne(
          {
            userId: result.userId,
            "courses.courseId": courseId,
          },
          {
            $inc: {
              "courses.$.quantity": -1,
            },
          }
        )
      }
    }

    res.status(200).json({ message: "Course removed from cart" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

export default router;
