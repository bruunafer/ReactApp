import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('crud', 'postgres', '321028', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
