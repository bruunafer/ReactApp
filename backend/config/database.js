import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_DIALECT
} = process.env;

if (!DB_NAME || !DB_USER || !DB_HOST || !DB_DIALECT) {
  throw new Error('Environment variables for database connection are incomplete.');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  timezone: '-03:00',
  logging: false,
  define: {
    timestamps: true, 
    underscored: true 
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

export default sequelize;