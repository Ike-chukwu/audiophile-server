// sk_test_51NTx91AhTxVccJD8SlLCg0f5pRRpsBYzY70Wso8J5T7s62eRroDeaRReURbpwwIaqk37X6EO0gnif71tW8O2hnwL00UlGmzMpk
//mark 2 headphones = price_1NUsMwAhTxVccJD8dbC8e3CT
// zx9 = price_1NUsQzAhTxVccJD87YCnzWw9
// zx7 = price_1NUsSsAhTxVccJD8NnY3UjwR
//yx1 = price_1NUsTqAhTxVccJD8X30Exi02
//XX59 Headphones = price_1NUsWWAhTxVccJD8MdE3enpW
// XX99 Mark I = price_1NUsYFAhTxVccJD8za3A1mxL

const express = require("express");
var cors = require("cors");
require("dotenv").config()
const stripe = require("stripe")(
  "sk_test_51NTx91AhTxVccJD8SlLCg0f5pRRpsBYzY70Wso8J5T7s62eRroDeaRReURbpwwIaqk37X6EO0gnif71tW8O2hnwL00UlGmzMpk"
);


const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res) => {
     res.status(200).send("Up and Running")
  })



app.post("/checkout", async (req, res) => {
  
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  console.log(items);
  items.forEach((item) => {
    lineItems.push({
      price: item.identifier,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url:"https://audiophile-ecommerce-site-two.vercel.app/success" ,
    cancel_url: "https://audiophile-ecommerce-site-two.vercel.app/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});


app.listen(PORT, () => console.log(`listening on ${PORT}`))
