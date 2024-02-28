const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');


const SoccerBooking = {
  create: async (soccer_booking) => {
    return pool.execute('INSERT INTO soccer_booking (date_book,time_start,time_end,referee,total_price,account_id,field_id) VALUES (?,?,?,?,?,?,?)', [soccer_booking.date_book,soccer_booking.time_start,soccer_booking.time_end,soccer_booking.referee,soccer_booking.total_price,soccer_booking.account_id,soccer_booking.field_id]);
  },  
  findLastId: async () => {
    try {
        const result = await pool.execute('SELECT id FROM soccer_booking ORDER BY id DESC LIMIT 1');
        const lastId = result[0][0].id;
        return lastId;
    } catch (error) {
        throw error;
    }
},
  findByA: (account_id) => pool.execute('SELECT * FROM soccer_booking WHERE account_id = ?', [account_id]),
  findByid: (field_id) => pool.execute('SELECT * FROM soccer_booking WHERE field_id = ?', [field_id]),
  findAll: async (search,page,limit) => {
    where=""
    if (search!=""){
      where = " AND id like '%"+search+"%'"
    }
    offset = page*limit-limit
    sql= "SELECT * FROM soccer_booking WHERE 1=1 "+where+" limit "+offset+","+limit;
    return pool.execute(sql);
  },  
  delete: (id) =>pool.execute('DELETE FROM soccer_booking WHERE id = ?', [id]),
  update: (soccer_booking) =>pool.execute('UPDATE soccer_booking SET date_book=?, time_start=?, time_end=?, referee=?, total_price=?, account_id=? WHERE id = ?', [ soccer_booking.date_book,soccer_booking.time_start,soccer_booking.time_end,soccer_booking.referee,soccer_booking.total_price,soccer_booking.account_id,soccer_booking.id]),

  // quản lý lịch đặt từng sân bóng (nhập trường field_id vào id )
  findBookfield:(field_id) =>pool.execute('SELECT A.*, B.*,C.name AS acc_name, C.email, C.phone_number FROM soccer_booking A LEFT JOIN soccer_field B ON B.id = A.field_id LEFT JOIN account C ON C.id = A.account_id WHERE A.field_id =?', [field_id]),
 // quản lý lịch đặt từng sân bóng theo account_id
  findName:(name) =>pool.execute('SELECT A.*, B.*,  C.name AS acc_name, C.email, C.phone_number FROM soccer_booking A LEFT JOIN soccer_field B ON B.id = A.field_id LEFT JOIN account C ON C.id = A.account_id WHERE B.name = ?', [name]),
// lấy tất cả lịch đặt sân

    // C.name AS acc_name tránh trùng tên name của account
    findAllbook: async (search,page,limit) => {
      where=""
      if (search!=""){
        where = " AND B.name like '%"+search+"%'"
      }
      offset = page*limit-limit
      sql= "SELECT A.*, B.*,  C.name AS acc_name, C.email, C.phone_number FROM soccer_booking A LEFT JOIN soccer_field B ON B.id = A.field_id LEFT JOIN account C ON C.id = A.account_id WHERE 1=1 "+where+" limit "+offset+","+limit;
      return pool.execute(sql);
    },

    
}
module.exports = SoccerBooking;