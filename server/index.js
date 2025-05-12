import dotenv from 'dotenv';
import connectDatabase from './configurations/connectMongoDB.js';
import { app } from './app.js';

// Configuring .env
dotenv.config();
// Connecting Database
connectDatabase();