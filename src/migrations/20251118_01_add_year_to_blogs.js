import { DataTypes, Op } from 'sequelize'

export async function up({ context: queryInterface }) {
    await queryInterface.addColumn('blogs', 'year', {
        type: DataTypes.INTEGER,
        allowNull: true
    })
}

export async function down({ context: queryInterface }) {
    await queryInterface.removeColumn('blogs', 'year')
}