import express from "express"
import { getalluser, getOne, login, register, update } from "../controller/userController.js"

const router=express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/update/:id").put(update)
router.route("/getall").get(getalluser)
router.route("/single/:id").get(getOne)




export default router