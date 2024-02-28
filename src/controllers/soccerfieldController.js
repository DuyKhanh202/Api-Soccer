const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const SoccerField = require('../models/soccerfieldModel.js');
const SoccerBooking = require('../models/soccerbookingModel.js');
const Common = require('../config/common.js');

exports.insert = async (req, res) => {
  const { name,type,status,address,image,price } = req.body;

  try {
    const [existingUsers] = await SoccerField.findByname(name);

    if (existingUsers.length > 0) {
      return Common.resdata(res,false," already exists","")
    }

    const newSoccerField = { name,type,status,address,image,price };
    await SoccerField.create(newSoccerField);
    Common.resdata(res,true,"Place success",newSoccerField)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getinfo = async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await SoccerField.findByid(id);

    if (rows.length === 0) {
      return Common.resdata(res,false,"id not exist","")
    }
    Common.resdata(res,true,"Search for success",rows[0])
    

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
exports.getlist = async (req, res) => {
  const { search,page } = req.body;

  try {
    const [rows] = await SoccerField.findAll(search,page,jwtConfig.limit);

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
  const { name } = req.body;

  try {
    const [rows] = await SoccerField.delete(name);
    if (rows.affectedRows === 0) {
      return Common.resdata(res,true,"Soccer booking not found","")
    }

    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.gettype = async (req, res) => {
  const { type } = req.body;

  try {
    const [rows] = await SoccerField.findByType(type);

    if (rows.length === 0) {
      return Common.resdata(res,false,"Type not exist","")
    }

    Common.resdata(res,true,"Search for success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.update = async (req, res) => {
  const { name,type,status,address,image,price,id } = req.body;

  try {
    const [existingUsers] = await SoccerField.findByid(id);

    if (existingUsers.length == 0) {
      return Common.resdata(res,false,"Id already not exists","")
    }

    const newSoccerField = { name,type,status,address,image,price,id };
    await SoccerField.update(newSoccerField);
    Common.resdata(res,true,"update success",newSoccerField)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
// quan ly san
exports.getlistbook = async (req, res) => {
  const { id } = req.body;

  try {
    const [arrbooking] = await SoccerBooking.findBookfield(id);

    if (arrbooking.length === 0) {
      return Common.resdata(res,false,"id not exist","")
    }
    Common.resdata(res,true,"Search for success",arrbooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getlistName = async (req, res) => {
  const { name } = req.body;

  try {
    const [arrbooking] = await SoccerBooking.findName(name);

    if (arrbooking.length === 0) {
      return Common.resdata(res,false,"id not exist","")
    }
    Common.resdata(res,true,"Search for success",arrbooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getlistAll = async (req, res) => {
  const {search,page } = req.body;

  try {
    const [arrbooking] = await SoccerBooking.findAllbook(search,page,jwtConfig.limit);

    if (arrbooking.length === 0) {
      return Common.resdata(res,false,"Name not exist","")
    }
    Common.resdata(res,true,"Search for success",arrbooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

