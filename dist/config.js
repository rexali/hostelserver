"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
function getSequelizeInstance() {
    var database, username, password, host, dialect;
    if (process.env.NODE_ENV !== "development") {
        database = process.env.PROD_DB_NAME;
        username = process.env.PROD_DB_USER;
        password = process.env.PROD_DB_PASS;
        host = process.env.PROD_DB_HOST;
        dialect = 'postgres';
    }
    else {
        database = process.env.DB_NAME;
        username = process.env.DB_USER;
        password = process.env.DB_PASS;
        host = process.env.DB_HOST;
        dialect = 'postgres';
    }
    const sequelize = new sequelize_1.Sequelize(database, username, password, {
        host,
        dialect,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    return sequelize;
}
const sequelize = getSequelizeInstance();
exports.sequelize = sequelize;
const config = {
    port: process.env.PORT || 3000,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    routes: {
        login: '/login',
        logout: '/logout',
        chat: '/chat',
        home: '/',
        auth: '/api/v1/auth',
        profiles: '/api/v1/profiles',
        hostels: '/api/v1/hostels',
        rooms: '/api/v1/rooms',
        favourites: '/api/v1/favourites',
        messages: '/api/v1/messages',
        notifications: '/api/v1/notifications',
        bookings: '/api/v1/bookings',
        transactions: '/api/v1/transactions',
        reports: '/api/v1/reports'
    },
};
exports.config = config;
