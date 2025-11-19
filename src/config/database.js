import { Sequelize } from 'sequelize'
import 'dotenv/config'
import { Umzug, SequelizeStorage } from 'umzug'

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' })

const migrationConfig = {
    migrations: { glob: 'src/migrations/*.js' },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
}

export const runMigrations = async () => {
    const migrator = new Umzug(migrationConfig)
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map(mig => mig.name),
    })
}

export const rollbackMigrations = async () => {
    await sequelize.authenticate()
    const migrator = new Umzug(migrationConfig)
    const migrations = await migrator.down()
    console.log('Migrations rolled back', {
        files: migrations.map(mig => mig.name),
    })
}

export default sequelize
