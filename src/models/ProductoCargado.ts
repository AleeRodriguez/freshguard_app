import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ProductoCargado extends Model {}

ProductoCargado.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  marca: { type: DataTypes.STRING, defaultValue: '' },
  categoria: { type: DataTypes.STRING, defaultValue: '' },
  cantidad: { type: DataTypes.FLOAT, allowNull: false },
  peso: { type: DataTypes.FLOAT, defaultValue: 0 },
  fechaIngreso: { type: DataTypes.DATEONLY, allowNull: false },
  fechaVencimiento: { type: DataTypes.DATEONLY, allowNull: false },
  usuarioId: { type: DataTypes.INTEGER, allowNull: true },
  sucursalId: { type: DataTypes.INTEGER, allowNull: true },
  expiredNotified: { type: DataTypes.BOOLEAN, defaultValue: false },
  expiringNotified: { type: DataTypes.BOOLEAN, defaultValue: false },
  codigoBarras: { type: DataTypes.STRING, allowNull: true },
}, {
  sequelize,
  modelName: 'ProductoCargado',
  tableName: 'productos_cargados',
});

export default ProductoCargado;