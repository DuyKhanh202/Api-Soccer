const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const ShoesBooking = require('../models/shoesModel.js');
const Common = require('../config/common.js');

exports.insert = async (req, res) => {
  const {date_book,date_end,amount,total_price,account_id} = req.body;

  try {
    const [existingUsers] = await ShoesBooking.findByname(account_id);

    if (existingUsers.length > 0) {
      return Common.resdata(res,false,"name already exists","")
    }

    const newShoes = { date_book,date_end,amount,total_price,account_id };
    await ShoesBooking.create(newShoes);
    Common.resdata(res,true,"Success",newShoes)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getinfo = async (req, res) => {
  const {account_id } = req.body;

  try {
    const [rows] = await ShoesBooking.findByname(account_id);

    if (rows.length === 0) {
      return Common.resdata(res,false,"account_id not exist","")
    }
    const acc = rows[0];
    Common.resdata(res,true,"Success",acc)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getlist = async (req, res) => {
  const { search,page } = req.body;

  try {
    const [rows] = await ShoesBooking.findAll(search,page,jwtConfig.limit);

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
    //await Account.deleteShoesByAccountId(id);
    //await Account.deletesBookingByAccountId(id);
    const [rows] = await ShoesBooking.delete(id);
    if (rows.affectedRows === 0) {
      return Common.resdata(res,true,"Shoes service not found","")
    }

    Common.resdata(res,true,"Delete information success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.update = async (req, res) => {
  const { date_book,date_end,amount,total_price,account_id,id } = req.body;

  try {
    const [existingUsers] = await ShoesBooking.findByshoes_booking(id);

    if (existingUsers.length == 0) {
      return Common.resdata(res,false,"account already not exists","")
    }

    const newShoes = { date_book,date_end,amount,total_price,account_id,id };
    await ShoesBooking.updateByshoes_bookingId(newShoes);
    Common.resdata(res,true,"Update information success",newShoes)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};