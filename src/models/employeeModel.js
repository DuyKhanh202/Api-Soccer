const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');


const Employee = {
  create: async (employee) => {
    return pool.execute('INSERT INTO employee (name,email,phone_number) VALUES (?,?,?)', [employee.name,employee.email,employee.phone_number]);
  },
   findByname: (name) => pool.execute('SELECT * FROM employee WHERE name = ?', [name]),
  findByEmployeeid: (id) => pool.execute('SELECT * FROM employee WHERE id = ?', [id]),
  findAll: async (search,page,limit) => {
    where=""
    if (search!=""){
      where = " AND name like '%"+search+"%'"
    }
    offset = page*limit-limit
    sql= "SELECT * FROM employee WHERE 1=1 "+where+" limit "+offset+","+limit;
    return pool.execute(sql);
  },
  deleteByemloyee: (name) => pool.execute('DELETE FROM employee WHERE name = ?', [name]),
  updateByemployeeId: (employee) =>pool.execute('UPDATE employee SET name=?,email=?,phone_number=? WHERE id = ?', [employee.name,employee.email,employee.phone_number,employee.id]),

// nhan vien quan ly san bong
createEfield: async (employee_field) => {
  return pool.execute('INSERT INTO employee_field (employee_id,field_id) VALUES (?,?)', [employee_field.field_id,employee_field.employee_id]);
},
findByE_id:(id) => pool.execute('SELECT A.*,B.*,C.*,B.name AS Sf_name FROM employee_field A LEFT JOIN soccer_field B ON B.id=A.field_id LEFT JOIN employee C ON C.id=A.employee_id WHERE employee_id=?', [id]),
findAllEF: async (search,page,limit) => {
  where=""
  if (search!=""){
    where = " AND C.name like '%"+search+"%'"
  }
  offset = page*limit-limit
  sql= "SELECT A.*,B.*,C.*,B.name AS Sf_name FROM employee_field A LEFT JOIN soccer_field B ON B.id=A.field_id LEFT JOIN employee C ON C.id=A.employee_id WHERE 1=1 "+where+" limit "+offset+","+limit;
  return pool.execute(sql);
},
delete: (id) => pool.execute('DELETE FROM employee_field WHERE id = ?', [id]),
update: (employee_field) =>pool.execute('UPDATE employee_field SET employee_id=?,field_id=? WHERE id = ?', [employee_field.field_id,employee_field. employee_id,employee_field.employee_id]),


};
module.exports = Employee;