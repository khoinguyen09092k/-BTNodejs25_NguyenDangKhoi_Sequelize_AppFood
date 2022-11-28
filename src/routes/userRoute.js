//tạo ra các API trong các đối tượng Route

//GET POST PUT DELETE
const express = require('express');
const userRoute = express.Router();
const { likeUser,likeRes, rateUser, rateRes, createLikeUnlike, addRateRes, addFoodOrder } = require('../controllers/userController');

//GET 
userRoute.get("/likeUser", likeUser);
userRoute.get("/likeRes", likeRes);
userRoute.get("/rateUser", rateUser);
userRoute.get("/rateRes", rateRes);

//POST 
userRoute.post("/createLikeUnlike", createLikeUnlike);
userRoute.post("/addRateRes", addRateRes);
userRoute.post("/addFoodOrder", addFoodOrder);



module.exports = userRoute;
