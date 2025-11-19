import jwt from 'jsonwebtoken'
import express from 'express'
import User from '../models/user.js'
import Session from '../models/session.js'

const SECRET = process.env.SECRET

const router = express.Router()

router.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({
        where: { username: body.username }
    })

    const passwordCorrect = body.password === 'secret'

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    if (user.disabled) {
        return res.status(401).json({ error: 'account disabled' })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)

    await Session.create({ userId: user.id, token })

    res.status(200).send({ token, username: user.username, name: user.name })
})

export default router