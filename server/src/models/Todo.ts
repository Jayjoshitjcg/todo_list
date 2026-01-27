import { DataTypes, Model } from "sequelize";
import sequelize from "../db/sequelize";

export class Todo extends Model {
    public id!: string;
    public title!: string;
    public completed!: boolean;
    public created_at!: Date;
}

Todo.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "todos",
        timestamps: false,
    }
);

export default Todo;
