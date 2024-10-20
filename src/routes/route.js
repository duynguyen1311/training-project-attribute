const express = require('express');
const router = express.Router();

const userRoutes = require('./users.route')
const teamRoutes = require('./teams.route')

router.use('/api', userRoutes);
router.use('/api', teamRoutes);

module.exports = router;