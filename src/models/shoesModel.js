const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');


const ShoesBooking = {
  create: async (shoes_booking) => {
    return pool.execute('INSERT INTO shoes_booking (date_book,date_end,amount,total_price,account_id) VALUES (?,?,?,?,?)', [shoes_booking.date_book,shoes_booking.date_end,shoes_booking.amount,shoes_booking.total_price,shoes_booking.account_id]);
  },
  findByname: (account_id) =>pool.execute('SELECT * FROM shoes_booking WHERE account_id = ?', [account_id]) ,
  findByshoes_booking: (id) => pool.execute('SELECT * FROM shoes_booking WHERE id = ?', [id]),
  findAll: async (search,page,limit) => {
    where=""
    if (search!=""){
      where = " AND id like '%"+search+"%'"
    }
    offset = page*limit-limit
    sql= "SELECT * FROM shoes_booking WHERE 1=1 "+where+" limit "+offset+","+limit;
    return pool.execute(sql);
  },
  delete: (id) => pool.execute('DELETE FROM shoes_booking WHERE id = ?', [id]),
  updateByshoes_bookingId: (shoes_booking) =>pool.execute('UPDATE shoes_booking SET date_book=?,date_end=?,amount=?,total_price=?,account_id=? WHERE id = ?', [shoes_booking.date_book,shoes_booking.date_end,shoes_booking.amount,shoes_booking.total_price,shoes_booking.account_id,shoes_booking.id]),
  
//   dùng để kiểm tra log
// {} } ,
};

module.exports = ShoesBooking;