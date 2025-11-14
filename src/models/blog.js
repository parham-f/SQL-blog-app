import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Blog extends Model { }

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'blog'
    }
)

export default Blog
