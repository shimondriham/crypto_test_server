const axios = require('axios');
const express = require("express");
const { auth } = require('../middlewares/auth');
const router = express.Router();

const apikey = "5D585955-6480-4964-B6B5-CD16D3FB883A"


router.get("/", auth, async (req, res, next) => {
    let limit = req.body.limit;
    if(!limit){
        return res.status(400).json("limit was not received");
    }
    const newData = {
        time_close_data: [],
        price_close_data: [],
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = today.toISOString().split('T')[0] + 'T00:00:00';
    try {
        let response = await axios.get(`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?apikey=${apikey}&period_id=1DAY&time_end=${formattedDate}&limit=${limit}`);
        for (let index = 0; index < response.data.length; index++) {
            newData.time_close_data[index] = response.data[index].time_close.split('T')[0];
            newData.price_close_data[index] = response.data[index].price_close;
        }
        newData.time_close_data = [...newData.time_close_data].reverse();
        newData.price_close_data = [...newData.price_close_data].reverse();
        console.log(newData);
        res.status(200).json(newData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;