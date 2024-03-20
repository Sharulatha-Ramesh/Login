import express from "express"
import {create,login} from '../controller/userdetail.js'

const route=express.Router()

route.post("/create",create);

route.post("/login",login);
export default route;