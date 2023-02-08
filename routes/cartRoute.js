const express = require("express");
const { authentication } = require("../Authentication/CartAuthentication");
const { CartModel } = require("../model/cartModel");
const cartRoute = express.Router();

cartRoute.use(authentication);

cartRoute.get("/", async (req, res) => {
  let { userID } = req.body;
  try {
    let data = await CartModel.find({ userID }).populate([
      "userID",
      "productID",
    ]);
    res.send({ msg: "product successfully added", data: data });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

cartRoute.post("/addtocart", async (req, res) => {
  const { productID, userID, quantity } = req.body;
  try {
    const data = await CartModel.create({ productID, userID, quantity });
    console.log(data);
    res.send({ msg: "product successfully added" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

cartRoute.patch("/update", async (req, res) => {
  let { type, productID, userID } = req.body;
  console.log(req.body);
  let existingcartItems = await CartModel.findOne({ _id: productID });
  console.log(existingcartItems);
  try {
    if (type === "dec") {
      let updatedData = await CartModel.findByIdAndUpdate(
        existingcartItems._id,
        { $set: { quantity: existingcartItems.quantity - 1 } }
      );
      // console.log(existingcartItems);
      res.send({
        message: "item qty decremented",
      });
    } else {
      let updatedData = await CartModel.findByIdAndUpdate(
        existingcartItems._id,
        { $set: { quantity: existingcartItems.quantity + 1 } }
      );

      return res.send({
        message: "item qty incremented",
      });
    }
  } catch (e) {
    return res.status(500).send("something went wrong");
  }
});

cartRoute.delete(`/delete/:id`, async (req, res) => {
  let pr_id = req.params.id;
  console.log(pr_id);
  try {
    await CartModel.findByIdAndDelete({ _id: pr_id });
    return res.send("item deleted from cart");
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  cartRoute,
};
