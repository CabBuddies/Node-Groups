"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const express = require("express");
const mongoose = require("mongoose");
const app_1 = require("./startup/app");
const node_library_1 = require("node-library");
const routes = require("./routes");
mongoose.connect(node_library_1.Config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err));
const router = express.Router();
router.use('/auth', routes.AuthRoutes);
router.use('/user', routes.UserRoutes);
app_1.default.use('/api/v1', router);
app_1.default.listen(node_library_1.Config.PORT, () => {
    console.log('app listening', node_library_1.Config.PORT);
});
node_library_1.Config.routesList(app_1.default);
