import { Request, Response } from "express";
import { authSchema } from "../utils/zodSchema";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from "../models/User";

export const registerUser = async(req: Request, res: Response): Promise<any> => {
    try {
        const parse = authSchema.safeParse(req.body)

        if (!parse.success) {
            const errMessages = parse.error.issues.map((err) => err.message)

            return res.status(400).json({
                success: false,
                message: 'Invalid request',
                data: errMessages
            })
        }

        const emailExisted = await User.findOne({
            email: parse.data.email
        })

        if (emailExisted) {
            return res.status(400).json({
                success: false,
                message: 'Email already exist, please try register with another email',
                data: null
            })
        }

        const hashPasswordd = bcrypt.hashSync(parse.data.password, 10)

        const user = new User({
            name: parse.data.name,
            email: parse.data.email,
            password: hashPasswordd,
            role: parse.data.role || 'customer',
            photo: req.file?.filename
        })

        await user.save()

        return res.status(201).json({
            success: true,
            message: 'Registered successfully!!!',
            data: {
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        console.error('Error :', e)

        return res.status(500).json({
            success: false,
            message: 'Failed to register'
        })
    }
}

export const loginUser = async(req: Request, res: Response): Promise<any> => {
    try {
        const parse = authSchema.omit({name: true}).parse(req.body)

        const checkUser = await User.findOne({
            email: parse.email,
            role: parse.role
        })

        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: 'Email not registered',
                data: null
            })
        }

        const comparePassword = bcrypt.compareSync(
            parse.password,
            checkUser.password
        )

        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: 'Email or password incorrect',
                data: null
            })
        }

        const secretKey = process.env.JWT_SECRET ?? ""

        const token = jwt.sign(
            {
                data: {
                    id: checkUser.id
                }
            },
            secretKey,
            {expiresIn: '24h'}
        )

        return res.status(200).json({
            success: true,
            message: 'Login success',
            data: {
                name: checkUser.name,
                email: checkUser.email,
                role: checkUser.role,
                photoUrl: checkUser.photoUrl,
                token
            }
        })
    } catch (e) {
        console.error('Error:', e)
        return res.status(500).json({
			message: "Failed to login",
			data: null,
			status: "failed",
		});
    }
}