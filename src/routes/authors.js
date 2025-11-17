import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const sequelize = Blog.sequelize
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
        ],
        group: 'author',
        order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
        raw: true,
    })
    res.json(authors)
})

export default router