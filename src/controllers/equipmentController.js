const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const Equipment = require('../models/equipmentModel.js');
const Common = require('../config/common.js');

exports.insert = async (req, res) => {
  const { name,amount } = req.body;

  try {
    const [existingUsers] = await Equipment.findByname(name);

    if (existingUsers.length > 0) {
      return Common.resdata(res,false,"name already exists","")
    }

    const newEquipment = { name,amount  };
    await Equipment.create(newEquipment);
    Common.resdata(res,true,"Success",newEquipment)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getinfo = async (req, res) => {
  const {name } = req.body;

  try {
    const [rows] = await Equipment.findByname(name);

    if (rows.length === 0) {
      return Common.resdata(res,false,"name not exist","")
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
    const [rows] = await Equipment.findAll(search,page,jwtConfig.limit);

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
    const [rows] = await Equipment.deleteByequipment(id);
    if (rows.affectedRows === 0) {
      return Common.resdata(res,true,"ID not found","")
    }

    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.update = async (req, res) => {
  const { id,name,amount } = req.body;

  try {
    const [existingUsers] = await Equipment.findByEquipmentid(id);

    if (existingUsers.length == 0) {
      return Common.resdata(res,false,"account already not exists","")
    }

    const newEquipment = { name,amount,id };
    await Equipment.updateByequipmentId(newEquipment);
    Common.resdata(res,true,"Update information success",newEquipment)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

  // quản lý thiết bị được sân bóng thuê
exports.insertEquipment = async (req, res) => {
  const {equipment_id,field_id,amount_Use} = req.body;
  try {
    const newEquipment = {equipment_id,field_id,amount_Use};
    await Equipment.createEF(newEquipment);
    Common.resdata(res,true,"success",newEquipment)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getinfoEquipment = async (req, res) => {
  const {id } = req.body;

  try {
    const [rows] = await Equipment.findByEquipField(id);

    if (rows.length === 0) {
      return Common.resdata(res,false,"ID not exist","")
    }
    const acc = rows[0];
    Common.resdata(res,true,"Success",acc)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getlistEquipment = async (req, res) => {
  const { search,page } = req.body;

  try {
    const [rows] = await Equipment.findAllEquipField(search,page,jwtConfig.limit);

    if (rows.length === 0) {
      return Common.resdata(res,true,"Data not found","")
    }
    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.deleteEquipment = async (req, res) => {
  const { id } = req.body;
  try {
    const [rows] = await Equipment.delete(id);
    if (rows.affectedRows === 0) {
      return Common.resdata(res,true,"ID not found","")
    }

    Common.resdata(res,true,"Successfully deleted equipment",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.updateEquipment = async (req, res) => {
  const { id,equipment_id,field_id,amount_Use } = req.body;
  try {
    const newEquipment = { id,equipment_id,field_id,amount_Use };
    await Equipment.updateid(newEquipment);
    Common.resdata(res,true,"Updated Equipment_Field information successfully",newEquipment)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};