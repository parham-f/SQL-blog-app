import { DataTypes, Op } from 'sequelize'

export async function up({ context: queryInterface }) {
    await queryInterface.addColumn('users', 'disabled', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
}

export async function down({ context: queryInterface }) {
    await queryInterface.removeColumn('users', 'disabled')
}