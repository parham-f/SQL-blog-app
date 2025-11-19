import { DataTypes, Op } from 'sequelize'

export async function up({ context: queryInterface }) {
    await queryInterface.createTable('reading_list', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        blog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blogs',
                key: 'id'
            }
        },
        reading_state: {
            type: DataTypes.ENUM('unread', 'read'),
            allowNull: false,
            defaultValue: 'unread'
        }
    })
}

export async function down({ context: queryInterface }) {
    await queryInterface.dropTable('reading_list')
}