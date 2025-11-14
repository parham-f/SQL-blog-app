import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import sequelize from './config/database.js'
import './models/blog.js'

const PORT = process.env.PORT || 3001

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connection OK')

        await sequelize.sync()
        console.log('Models synchronized')

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (err) {
        console.error('Failed to start application', err)
        process.exit(1)
    }
}

start()
