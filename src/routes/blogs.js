import express from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import tokenExtractor from '../utils/tokenExtractor.js'
import { Op } from 'sequelize'

const router = express.Router()

router.get('/', async (req, res, next) => {
    const where = []
    if (req.query.search) {
        where.push({
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    author: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                }
            ]
        })
    }

    try {
        const blogs = await Blog.findAll({
            attributes: { exclude: ['userId'] },
            include: {
                model: User,
                attributes: ['name']
            },
            where,
            order: [['likes', 'DESC']]
        })
        res.json(blogs)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id, {
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        }
    })
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
        res.status(201).json(blog)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.findByPk(req.params.id)
        if (blog && blog.userId === user.id) {
            await blog.destroy()
            res.status(204).end()
        } else {
            res.status(404).json({ error: "blog not found or unauthorized" }).end()
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            blog.likes = req.body.likes
            await blog.save()
            res.json(blog)
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }
})

export default router
