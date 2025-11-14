import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.get('/', async (_req, res, next) => {
    try {
        const blogs = await Blog.findAll()
        res.json(blogs)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

router.post('/', async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body)
        res.status(201).json(blog)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            await blog.destroy()
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }
})

export default router
