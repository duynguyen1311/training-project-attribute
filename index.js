const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRouter = require('./src/routes/route')
app.use(express.json());
app.use(apiRouter);
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});