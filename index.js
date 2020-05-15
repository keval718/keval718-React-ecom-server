const express = require('express');
const app = express();
const cors = require('cors');
const userRoute=require('./routes/UserR');
const productRoute=require('./routes/ProductR');
app.use(cors());
app.use(express.json());
const connectDB = require('./config/connectDB');
const port = process.env.PORT || 5000;
connectDB();
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);



app.listen(port, () => console.log(`server running on port ${port}`));