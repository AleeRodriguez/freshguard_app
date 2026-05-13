import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Producto extends Model {}

Producto.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  marca: { type: DataTypes.STRING },
  codigoBarras: { type: DataTypes.STRING, unique: true },
  unidadMedida: { type: DataTypes.ENUM('unidades', 'kg'), defaultValue: 'unidades' },
  imagenUrl: { type: DataTypes.STRING },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  sequelize,
  modelName: 'Producto',
  tableName: 'productos',
});

export default Producto;