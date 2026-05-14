import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Usuario extends Model {}

Usuario.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  uid: { type: DataTypes.STRING, allowNull: true, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  rol: { type: DataTypes.ENUM('encargado', 'empleado'), allowNull: false, defaultValue: 'empleado' },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
});

export default Usuario;