const express = require('express');
const router = express.Router();
const Payment = require('../models/payment'); 

router.post('/payment', async (req, res) => {
  try {
    const { amount, userMail } = req.body;

    const paymentGatewayResponse = await makePaymentRequest(amount, userMail);

    const payment = new Payment({
      amount,
      userMail,
    });

    const savedPayment = await payment.save();

    res.status(200).json({
      message: 'Payment request created successfully',
      paymentGatewayResponse,
      payment: savedPayment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//if (JSON.parse(res).STATUS === 'TXN_SUCCESS'){
    //res.sendFile (__dirname + '/success.html');
//}else {
  //  res.sendFile (__dirname + '/failure.html');
//}

module.exports = router;