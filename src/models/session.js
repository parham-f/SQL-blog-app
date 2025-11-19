import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Session extends Model { }

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            field: 'user_id',
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'session',
    }
)

export default Session