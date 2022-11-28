//yarn add express
const express = require('express');
const app = express();
//middleware chuyển đổi data json từ FE xuống express
app.use(express.json());

const cors = require('cors');
app.use(cors());
//domain
app.listen(8080)
const rootRoute = require('./routes');

app.use("/api",rootRoute)