import express from 'express'
import User from '../models/user.js'
import Blog from '../models/blog.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: { username: req.params.username }
    })

    if (user) {
        try {
            await user.update(req.body)
            res.json(user)
        } catch (error) {
            return res.status(400).json({ error })
        }
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})

router.get('/:id', async (req, res) => {
    let whereRead = {}
    if (req.query.read === 'true') whereRead = { read: true }
    if (req.query.read === 'false') whereRead = { read: false }

    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: [''] },
        include: [{
            model: Blog,
            attributes: { exclude: ['userId'] }
        },
        {
            model: Blog,
            as: 'readings',
            attributes: { exclude: ['userId'] },
            through: {
                attributes: ['read', 'id'],
                where: whereRead
            }
        }
        ],
    })

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})

export default router