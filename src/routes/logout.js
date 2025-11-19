import express from 'express'
import Session from '../models/session.js'
import tokenExtractor from '../utils/tokenExtractor.js'

const router = express.Router()

router.delete('/', tokenExtractor, async (req, res) => {
    await Session.destroy({
        where: {
            token: req.token,
        },
    })

    return res.status(204).end()
})

export default router