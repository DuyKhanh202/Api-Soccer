const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');


const SoccerField = {
  create: async (soccer_field) => {
    return pool.execute('INSERT INTO soccer_field ( name,type,status,address,image,price) VALUES (?,?,?,?,?,?)', [soccer_field.name,soccer_field.type,soccer_field.status,soccer_field.address,soccer_field.image,soccer_field.price]);
  },  
  findByname: (name) => pool.execute('SELECT * FROM soccer_field WHERE name = ?', [name]),
  findByid:  (id) => pool.execute('SELECT * FROM soccer_field WHERE id = ?', [id]),
  findByType: (type) => pool.execute('SELECT * FROM soccer_field WHERE type = ?', [type]),
  findAll: async (search,page,limit) => {
    where=""

    if (search!=""){
      where = " AND name like '%"+search+"%'"
    }
    offset = page*limit-limit
    sql= "SELECT * FROM soccer_field WHERE 1=1 "+where+" limit "+offset+","+limit;
    return pool.execute(sql);
  },
  delete: (name) => pool.execute('DELETE FROM soccer_field WHERE name = ?', [name]),
  update: (soccer_field) =>pool.execute('UPDATE soccer_field SET name=?,type=?,status=?,address=?,image=?,price=? WHERE id = ?', [soccer_field.name,soccer_field.type,soccer_field.status,soccer_field.address,soccer_field.image,soccer_field.price,soccer_field.id]),
  
  
};

module.exports = SoccerField;