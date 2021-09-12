import rest from "./router.js";
import express from "express";
import bodyParser from "body-parser";
import users from "./users.js";

import User from "./Model/user.js"
import db from "./db.js"

const app = express();
const port = 3000;

const mongoose = db.database()

rest.setup(app, port, mongoose)


