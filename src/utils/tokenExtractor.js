import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET
import Session from '../models/session.js'
import User from '../models/user.js'

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')

    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'token missing' })
    }

    const token = authorization.substring(7)

    try {
        const decodedToken = jwt.verify(token, SECRET)

        const session = await Session.findOne({
            where: { token },
        })

        if (!session) {
            return res.status(401).json({ error: 'session expired' })
        }

        const user = await User.findByPk(decodedToken.id)

        if (!user) {
            return res.status(401).json({ error: 'user not found' })
        }

        if (user.disabled) {
            return res.status(401).json({ error: 'account disabled' })
        }

        req.decodedToken = decodedToken
        req.user = user
        req.token = token

        next()
    } catch (err) {
        return res.status(401).json({ error: 'token invalid' })
    }
}

export default tokenExtractor