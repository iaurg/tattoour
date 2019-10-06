const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/uploads');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/studios', upload.single('thumbnail'), SpotController.store);
routes.get('/studios', SpotController.index);
routes.get('/dashboard', DashboardController.show);

routes.post('/studios/:studio_id/bookings', BookingController.store);




module.exports = routes;