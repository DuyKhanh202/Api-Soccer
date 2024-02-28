const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const SoccerBooking = require('../models/soccerbookingModel.js');
const Common = require('../config/common.js');

exports.insert = async (req, res) => {
  const { date_book,time_start,time_end,referee,total_price,field_id,account_id } = req.body;

  try {
    // const [existingUsers] = await SoccerBooking.findByA(account_id);
    // if (existingUsers.length > 0) {
    //   return Common.resdata(res,false," already exists","")
    // }

    const newSoccerBooking = { date_book,time_start,time_end,referee,total_price,account_id,field_id };
    await SoccerBooking.create(newSoccerBooking);
    // lấy ra được id từ bảng soccerBooking
    const id = await SoccerBooking.findLastId();
    // console.log(id);
    Common.resdata(res,true,"Place success",newSoccerBooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getinfo = async (req, res) => {
  const { field_id } = req.body;

  try {
    const [rows] = await SoccerBooking.findByid(field_id);

    if (rows.length === 0) {
      return Common.resdata(res,false,"Field_id not exist","")
    }
    const acc = rows;
    Common.resdata(res,true,"Search for success",acc)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getlist = async (req, res) => {
  const { search,page } = req.body;

  try {
    const [rows] = await SoccerBooking.findAll(search,page,jwtConfig.limit);

    if (rows.length === 0) {
      return Common.resdata(res,true,"Data not found","")
    }
    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await SoccerBooking.delete(id);
    if (rows.affectedRows === 0) {
      return Common.resdata(res,true,"Soccer booking not found","")
    }

    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.update = async (req, res) => {
  const {date_book,time_start,time_end,referee,total_price,account_id,id} = req.body;

  try {
    const [existingUsers] = await SoccerBooking.findByid(id);

    if (existingUsers.length == 0) {
      return Common.resdata(res,false,"account already not exists","")
    }
    const newSoccerBooking = { date_book,time_start,time_end,referee,total_price,account_id,id };
    await SoccerBooking.update(newSoccerBooking);
    Common.resdata(res,true,"Update success",newSoccerBooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};