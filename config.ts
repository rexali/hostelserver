import dotenv from "dotenv";
import { Sequelize, } from "sequelize";
dotenv.config();

const config = {
    // prod
    database_prod: process.env.PROD_DB_NAME as string,
    username_prod: process.env.PROD_DB_USER as string,
    password_prod: process.env.PROD_DB_PASS as string,
    host_prod: process.env.PROD_DB_HOST as string,
    dialect_prod: 'postgres' as any,
    // dev
    database_dev: process.env.DB_NAME as string,
    username_dev: process.env.DB_USER as string,
    password_dev: process.env.DB_PASS as string,
    host_dev: process.env.DB_HOST as string,
    dialect_dev: 'postgres' as any,


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
}


function getSequelizeInstance() {

    var database, username, password, host, dialect;

    if (process.env.NODE_ENV !== "development") {
        database = config.database_prod;
        username = config.username_prod;
        password = config.password_prod;
        host = config.host_prod;
        dialect = config.dialect_prod;
    } else {
        database = config.database_dev;
        username = config.username_dev;
        password = config.password_dev;
        host = config.host_dev;
        dialect = config.dialect_dev;
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

export { config, sequelize }



