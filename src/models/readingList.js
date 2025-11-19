import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class ReadingList extends Model { }

ReadingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blogs',
                key: 'id'
            }
        },
        readingState: {
            type: DataTypes.ENUM('unread', 'read'),
            allowNull: false,
            defaultValue: 'unread'
        }
    },
    {
        sequelize,
        underscored: true,
        modelName: 'reading_list',
        timestamps: false
    }
)

export default ReadingList