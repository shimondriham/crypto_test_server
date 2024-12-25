const axios = require('axios');
const express = require("express");
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({ msg: "Work from crypto.js" });
});

router.post("/",auth, async (req, res, next) => {
    const newData = {
         time_close_Data : [],
        price_close_Data : [],
    };
    let limit = req.body.limit;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = today.toISOString().split('T')[0] + 'T00:00:00';
    try {
        let response = await axios.get(`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?apikey=5D585955-6480-4964-B6B5-CD16D3FB883A&period_id=1DAY&time_end=${formattedDate}&limit=${limit}`);
        for (let index = 0; index < response.data.length; index++) {
            newData.time_close_Data[index]=response.data[index].time_close.split('T')[0];
            newData.price_close_Data[index]=response.data[index].price_close;
        }
        newData.time_close_Data = [...newData.time_close_Data].reverse();
        newData.price_close_Data = [...newData.price_close_Data].reverse();
        console.log(newData);
        res.status(200).json(newData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;

//  https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?apikey=5D585955-6480-4964-B6B5-CD16D3FB883A&period_id=1DAY&time_end=2024-12-23T00:00:00&limit=30