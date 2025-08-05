const AddToCartModel = require("../models/AddToCartModel");
const ProductModel = require("../models/productModel");
const OrderModel = require("../models/OrderModel");

const placeOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phoneNumber, city } = req.body;

    if (!name || !phoneNumber || !city) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1. Get all cart items for this user
    const cartItems = await AddToCartModel.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let orderItems = [];
    let totalAmount = 0;

    // 2. Loop through each cart item
    for (let item of cartItems) {
      const product = await ProductModel.findById(item.productId);

      if (!product) continue;

      const productTotal = product.price * item.quantity;
      totalAmount += productTotal;

      orderItems.push({
        productId: product._id,
        name: product.productName,
        price: product.price,
        quantity: item.quantity,
        image: product.productImage[0] || "",
      });
    }

    // 3. Create order document
    const newOrder = new OrderModel({
      userId,
      name,
      phoneNumber,
      city,
      orderItems,
      totalAmount,
      status: "pending",
    });

    await newOrder.save();

    // 4. Clear the cart
    await AddToCartModel.deleteMany({ userId });

    return res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Place Order Error:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = placeOrderController;
