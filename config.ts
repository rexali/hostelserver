import dotenv from "dotenv";
import { Sequelize, } from "sequelize";
dotenv.config();

function getSequelizeInstance() {

    var database, username, password, host, dialect;

    if (process.env.NODE_ENV !== "development") {
        database = process.env.PROD_DB_NAME as string;
        username = process.env.PROD_DB_USER as string;
        password = process.env.PROD_DB_PASS as string;
        host = process.env.PROD_DB_HOST as string;
        dialect = 'postgres' as any;
    } else {
        database = process.env.DB_NAME as string;
        username = process.env.DB_USER as string;
        password = process.env.DB_PASS as string;
        host = process.env.DB_HOST as string;
        dialect = 'postgres';
    }

    const sequelize = new Sequelize(
        database,
        username,
        password,
        {
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

const config = {

    port: process.env.PORT || 3000,
    base_url:"http://localhost:3000",
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
        reports: '/api/v1/reports',
        csrf:'/csrf'
    },
}

export { config, sequelize }



