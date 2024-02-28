const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const accountRoutes = require('./routes/accountRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const shoesRoutes = require('./routes/shoesRoutes');
const soccerbookingRoutes = require('./routes/soccerbookingRoutes');
const soccerfieldRoutes = require('./routes/soccerfieldRoutes');
const authMiddleware = require('./middleware/authenticationMiddleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use('/account', accountRoutes);
app.use('/employee', employeeRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/shoes_booking', shoesRoutes);
app.use('/soccer_booking', soccerbookingRoutes);
app.use('/soccer_field', soccerfieldRoutes);
app.use('/api', authMiddleware.authenticateToken);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
