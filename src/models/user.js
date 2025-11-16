import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
})

export default User