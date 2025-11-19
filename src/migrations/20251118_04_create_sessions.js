import { DataTypes, Op } from 'sequelize'

export async function up({ context: queryInterface }) {
    await queryInterface.createTable('sessions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'cascade',
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    })
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable('sessions')
}