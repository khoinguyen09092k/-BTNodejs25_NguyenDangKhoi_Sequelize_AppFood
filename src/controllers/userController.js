const sequelize = require('../models/index');
const init_models = require('../models/init-models')
const model = init_models(sequelize);
const { sucessCode, errorCode, failCode } = require('../config/response');


//lấy danh sách like theo user
const likeUser = async (req, res) => {

    try {
        let data = await model.user.findAll({
            include: ["res_id_restaurants"]
        });
        sucessCode(res, data, "Lấy dữ liệu thành công")
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}


//lấy danh sách like theo nhà hàng 
const likeRes = async (req, res) => {

    try {
        let data = await model.restaurant.findAll({
            include: ["user_id_users"]
        });
        sucessCode(res, data, "Lấy dữ liệu thành công")
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// lấy danh sách đánh giá theo user
const rateUser = async (req, res) => {

    try {
        let data = await model.user.findAll({
            include: ["res_id_restaurant_rate_res"]
        });
        sucessCode(res, data, "Lấy dữ liệu thành công")
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// lấy danh sách đánh giá theo restaurant

const rateRes = async (req, res) => {

    try {
        let data = await model.restaurant.findAll({
            include: ["user_id_user_rate_res"]
        });
        sucessCode(res, data, "Lấy dữ liệu thành công")
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// xử lí like và unlike
const createLikeUnlike = async (req, res) => {
    try {
        let { user_id, res_id, date_like } = req.body;
        let checkUserLike = await model.like_res.findOne({
            where: {
                user_id
            }
        })
        if (!checkUserLike) {
            let resuilt = await model.like_res.create({
                user_id,
                res_id,
                date_like
            });
            sucessCode(res, resuilt, "Bạn đã tạo Like thành công !")
        }
        else {
            let resuilt = await model.like_res.destroy({
                where: {
                    user_id,
                    res_id,
                    date_like
                }
            });
            sucessCode(res, resuilt, "Bạn đã UnLike thành công !")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}
// api thêm đánh giá 
const addRateRes = async (req, res) => {
    try {
        let { user_id, res_id, amount, date_rate } = req.body;
        let checkUserRate = await model.rate_res.findOne({
            where: {
                user_id
            }
        })
        if (!checkUserRate) {
            let addRate = await model.rate_res.create({
                user_id,
                res_id,
                amount,
                date_rate
            });
            sucessCode(res, addRate, "Bạn đã thêm đánh giá thành công")
        }

        else {
            let resuilt = await model.rate_res.destroy({
                where: {
                    user_id,
                    res_id,
                    amount,
                    date_rate
                }
            });
            sucessCode(res, resuilt, "Bạn đã hủy đánh giá nhà hàng này  !")
        }

    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

// api gọi món
const addFoodOrder = async (req, res) => {
    try {
        let { user_id, food_id, amount } = req.body;
        let checkUserOrder = await model.order.findOne({
            where: {
                user_id
            }
        })
        if (!checkUserOrder) {
            let addFoodOrder = await model.order.create({
                user_id,
                food_id,
                amount,
            });
            sucessCode(res, addFoodOrder, "Gọi món mới thành công")
        }
        else {
            let resuilt = await model.order.destroy({
                where: {
                    user_id,
                    food_id,
                    amount
                }
            });
            sucessCode(res, resuilt, "Bạn đã hủy đặt món này !!!")
        }

    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

module.exports = { likeUser, likeRes, rateUser, rateRes, addRateRes, addFoodOrder, createLikeUnlike }