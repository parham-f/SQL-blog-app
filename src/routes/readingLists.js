import express from 'express'
import ReadingList from '../models/readingList.js'
import User from '../models/user.js'
import tokenExtractor from '../utils/tokenExtractor.js'

const router = express.Router()

router.post('/', tokenExtractor, async (req, res) => {
    const id = req.body.userId
    if (id !== req.decodedToken.id) {
        return res.status(403).json({ error: 'you can only add to your own reading list' })
    }

    try {
        const readingListEntry = await ReadingList.create(req.body)
        res.json(readingListEntry)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const readingListEntry = await ReadingList.findByPk(req.params.id)

    if (readingListEntry.userId !== user.id) {
        return res.status(403).json({ error: 'you can only change your own reading list entries' })
    }

    if (readingListEntry) {
        try {
            await readingListEntry.update(req.body)
            res.json(readingListEntry)
        } catch (error) {
            return res.status(400).json({ error })
        }
    } else {
        res.status(404).json({ error: 'Reading list entry not found' })
    }
})

export default router