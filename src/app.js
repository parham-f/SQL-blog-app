import express from 'express'
import blogsRouter from './routes/blogs.js'

const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
})

export default app
