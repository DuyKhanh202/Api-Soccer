const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');


const Equipment = {
  create: async (equipment) =>pool.execute('INSERT INTO equipment (name,amount) VALUES (?,?)', [equipment.name,equipment.amount]),
  findByname: (name) =>pool.execute('SELECT * FROM equipment WHERE name = ?', [name]) ,
  findByEquipmentid: (id) => pool.execute('SELECT * FROM equipment WHERE id = ?', [id]),
  findAll: async (search,page,limit) => {
    where=""
    if (search!=""){
      where = " AND name like '%"+search+"%'"
    }
    offset = page*limit-limit
    sql= "SELECT * FROM equipment WHERE 1=1 "+where+" limit "+offset+","+limit;
    return pool.execute(sql);
  },
  deleteByequipment: (id) => pool.execute('DELETE FROM equipment WHERE id = ?', [id]),
  updateByequipmentId: (equipment) =>pool.execute('UPDATE equipment SET name=?,amount=? WHERE id = ?', [equipment.name,equipment.amount,equipment.id]),


// quản lý  sân thuê thiết bị tập
createEF: async (equipfield) =>pool.execute('INSERT INTO equipfield (equipment_id,field_id,amount_Use) VALUES (?,?,?)', [equipfield.equipment_id,equipfield.field_id,equipfield.amount_Use]),
findByEquipField:(equipment_id)=>pool.execute('SELECT A.*,B.*,C.*,B.name as Sf_name FROM equipfield A LEFT JOIN soccer_field B ON B.id=A.field_id LEFT JOIN equipment C ON C.id=A.equipment_id WHERE equipment_id= ?' ,[equipment_id]),
findAllEquipField: async (search,page,limit) => {
  where=""
  if (search!=""){
    where = " AND C.name like '%"+search+"%'"
  }
  offset = page*limit-limit
  sql= "SELECT A.*,B.*,C.*,B.name as Sf_name FROM equipfield A LEFT JOIN soccer_field B ON B.id=A.field_id LEFT JOIN equipment C ON C.id=A.equipment_id WHERE 1=1 "+where+" limit "+offset+","+limit;
  return pool.execute(sql);
},
delete: (id) =>pool.execute('DELETE FROM equipfield WHERE id = ?', [id]),
updateid: (equipfield) =>pool.execute('UPDATE equipfield SET equipment_id=?,field_id=?,amount_Use=? WHERE id = ?', [equipfield.equipment_id,equipfield.field_id,equipfield.amount_Use,equipfield.id]),

};
module.exports = Equipment;