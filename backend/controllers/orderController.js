const orderModel = require('../models/Order');

exports.createOrder = (req, res) => {
  const { user_id, order_details } = req.body;
  orderModel.createOrder({ user_id, order_details }, (err, order) => {
    if (err) {
      req.flash('error_msg', 'Error placing order');
      res.redirect('/cart');
    } else {
      req.flash('success_msg', 'Order placed successfully');
      res.redirect('/orders');
    }
  });
};

exports.getOrders = (req, res) => {
  const user_id = req.session.user.id;
  orderModel.getOrdersByUserId(user_id, (err, orders) => {
    if (err) {
      res.status(500).send('Error retrieving orders');
    } else {
      res.render('orders', { orders });
    }
  });
};
