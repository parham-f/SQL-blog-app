import express from 'express'
import blogsRouter from './routes/blogs.js'
import usersRouter from './routes/users.js'
import loginRouter from './routes/login.js'
import authorsRouter from './routes/authors.js'

const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)

const errorHandler = (error, req, res, next) => {
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: error.errors.map(e => e.message),
        })
    }

    console.error(error)
    return res.status(500).json({ error: 'internal server error' })
}

app.use(errorHandler)

export default app
