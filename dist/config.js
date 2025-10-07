"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const config = {
    // prod
    database_prod: process.env.PROD_DB_NAME,
    username_prod: process.env.PROD_DB_USER,
    password_prod: process.env.PROD_DB_PASS,
    host_prod: process.env.PROD_DB_HOST,
    dialect_prod: 'postgres',
    // dev
    database_dev: process.env.DB_NAME,
    username_dev: process.env.DB_USER,
    password_dev: process.env.DB_PASS,
    host_dev: process.env.DB_HOST,
    dialect_dev: 'postgres',
    port: process.env.PORT || 3000,
    base_url: "http://localhost:3000",
    secret: 'secret',
    redisUrl: 'redis://localhost',
    routes: {
        reviews: '/api/v1/reviews',
        healthz: '/healthz',
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
        reports: '/api/v1/reports',
        csrf: '/csrf',
        search: '/search',
        paystack_transaction_url: "/api/v1/get_transaction_url",
        paystack_verify_transaction: "/api/v1/verify_transaction",
    },
};
exports.config = config;
function getSequelizeInstance() {
    var database, username, password, host, dialect;
    if (process.env.NODE_ENV !== "development") {
        database = config.database_prod;
        username = config.username_prod;
        password = config.password_prod;
        host = config.host_prod;
        dialect = config.dialect_prod;
    }
    else {
        database = config.database_dev;
        username = config.username_dev;
        password = config.password_dev;
        host = config.host_dev;
        dialect = config.dialect_dev;
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
