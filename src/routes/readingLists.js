import express from 'express'
import ReadingList from '../models/readingList.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const readingListEntry = await ReadingList.create(req.body)
        res.json(readingListEntry)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

export default router