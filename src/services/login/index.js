import express from "express";
import { Router } from "express"

import { checkUser } from "./middlewares.js"
import { userLogin } from "./jwtLogin.js"

const router = Router()

router.post("/", checkUser, userLogin)

export default router