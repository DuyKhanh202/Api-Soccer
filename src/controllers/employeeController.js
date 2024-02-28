const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');
const SoccerField = require('../models/soccerfieldModel');
const jwtConfig = require('../config/jwtConfig');
const Common = require('../config/common.js');

exports.insert = async (req, res) => {
  const { name,email,phone_number } = req.body;

  try {
    const [existingUsers] = await Employee.findByname(name);

    if (existingUsers.length > 0) {
      return Common.resdata(res,false,"name already exists","")
    }

    const newemployee = { name,email,phone_number };
    await Employee.create(newemployee);
    Common.resdata(res,true,"success",newemployee)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
exports.getinfo = async (req, res) => {
  const {name } = req.body;

  try {
    const [rows] = await Employee.findByname(name);

    if (rows.length === 0) {
      return Common.resdata(res,false,"name not exist","")
    }
    const acc = rows[0];
    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getlist = async (req, res) => {
  const { search,page } = req.body;

  try {
    const [rows] = await Employee.findAll(search,page,jwtConfig.limit);

    if (rows.length === 0) {
      return Common.resdata(res,true,"Data not found","")
    }
    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
exports.deleteByemloyee = async (req, res) => {
  const { name } = req.body;

  try {
    const [rows] = await Employee.deleteByemloyee(name);
    if (rows.affectedRows === 0) {
      return Common.resdata(res,true,"Name not found","")
    }

    Common.resdata(res,true,"Successfully deleted employee",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.update = async (req, res) => {
  const { id,name,email,phone_number } = req.body;

  try {
    const [existingUsers] = await Employee.findByEmployeeid(id);

    if (existingUsers.length == 0) {
      return Common.resdata(res,false,"account already not exists","")
    }

    const newemployee = { name,email,phone_number,id };
    await Employee.updateByemployeeId(newemployee);
    Common.resdata(res,true,"Updated employee information successfully",newemployee)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};


// quản lý thiết bị cho sân
exports.insertEfield = async (req, res) => {
  const { employee_id,field_id } = req.body;

  try {
    const newemployee = { employee_id,field_id};
    await Employee.createEfield(newemployee);
    Common.resdata(res,true,"success",newemployee)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
exports.getinfoEF = async (req, res) => {
  const {id } = req.body;

  try {
    const [rows] = await Employee.findByE_id(id);

    if (rows.length === 0) {
      return Common.resdata(res,false,"ID not exist","")
    }
    const acc = rows[0];
    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
exports.getlistEF = async (req, res) => {
  const { search,page } = req.body;

  try {
    const [rows] = await Employee.findAllEF(search,page,jwtConfig.limit);

    if (rows.length === 0) {
      return Common.resdata(res,true,"Data not found","")
    }
    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
exports.deleteEF = async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await Employee.delete(id);
    if (rows.affectedRows === 0) {
      return Common.resdata(res,true,"ID not found","")
    }

    Common.resdata(res,true,"Successfully deleted employee",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
exports.updateEF = async (req, res) => {
  const { id,field_id,employee_id } = req.body;
  try {
    const newemployee = { id,field_id,employee_id };
    await Employee.update(newemployee);
    Common.resdata(res,true,"Updated employee information successfully",newemployee)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};