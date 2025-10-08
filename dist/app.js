"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loggerHandler_1 = require("./middleware/loggerHandler");
const errorHandler_1 = require("./middleware/errorHandler");
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const express_partials_1 = __importDefault(require("express-partials"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const csurf_1 = __importDefault(require("csurf"));
const cors_1 = __importDefault(require("cors"));
const utilities_1 = require("./middleware/utilities");
const connect_flash_1 = __importDefault(require("connect-flash"));
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("./api/v1/auth/routes/user.routes"));
const helmet_1 = __importDefault(require("helmet"));
const passport_config_1 = __importDefault(require("./api/v1/auth/passport.config"));
const profile_routes_1 = __importDefault(require("./api/v1/profiles/routes/profile.routes"));
const hotel_routes_1 = __importDefault(require("./api/v1/hostels/routes/hotel.routes"));
const routes_1 = __importDefault(require("./api/v1/rooms/routes/routes"));
const favorite_routes_1 = __importDefault(require("./api/v1/favourites/routes/favorite.routes"));
const message_routes_1 = __importDefault(require("./api/v1/messages/routes/message.routes"));
const notification_routes_1 = __importDefault(require("./api/v1/notifications/routes/notification.routes"));
const booking_routes_1 = __importDefault(require("./api/v1/bookings/routes/booking.routes"));
const review_routes_1 = __importDefault(require("./api/v1/reviews/routes/review.routes"));
const searchRoomsHandler_1 = require("./api/v1/rooms/handlers/searchRoomsHandler");
const getTransactionURL_1 = require("./api/v1/payments/paystack/getTransactionURL");
const verifyTransaction_1 = require("./api/v1/payments/paystack/verifyTransaction");
const app = (0, express_1.default)();
const corsOption = {
    origin: "https://hostel4students.vercel.app",
    credentials: true,
    // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
};
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { defaultLayout: 'layout' });
app.use((0, express_partials_1.default)());
app.use(loggerHandler_1.loggerHandler);
// prevent hacker from knowing our stack
app.disable("x-powered-by");
// help set response headers
app.use((0, helmet_1.default)());
// help validate and sanitise
// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000, //15mins  
//   max: 100 // limit each ip to 100 request per WindowMs i.e 15min
// }));
app.use((0, cors_1.default)({ ...corsOption }));
app.use((0, cookie_parser_1.default)(config_1.config.secret));
app.use((0, express_session_1.default)({
    secret: config_1.config.secret,
    resave: true,
    saveUninitialized: true,
    // cookie:{
    //   secure:true,
    // }
}));
app.use(express_1.default.static(__dirname + '/public'));
// initialize newpassport
app.use(passport_config_1.default.initialize());
// use newpassport session
app.use(passport_config_1.default.session());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, csurf_1.default)());
// app.use(csrf({ cookie: true }));
// app.use(getCsrfToken);
app.use(utilities_1.authenticated);
app.use((0, connect_flash_1.default)());
app.use(function (req, res, next) {
    if (req.session.pageCount)
        req.session.pageCount++;
    else
        req.session.pageCount = 1;
    next();
});
// test connection and synchronise to database
((async () => {
    config_1.sequelize.authenticate().then(() => {
        console.log("connected with database successfully");
    }).catch((error) => {
        console.error("Unable to connect with database: " + error);
    });
    // sequelize.sync({ force: false }).then(() => {
    //   console.log("database synced successfully");
    // }).catch((error: any) => {
    //   console.error("Unable to sync with database: " + error);
    // })
    config_1.sequelize.sync({ alter: true }).then(() => {
        console.log("database synced successfully");
    }).catch((error) => {
        console.error("Unable to sync with database: " + error);
    });
}))();
// authentication route
app.use(config_1.config.routes.auth, user_routes_1.default);
// profiles routes
app.use(config_1.config.routes.profiles, profile_routes_1.default);
// hostels routes
app.use(config_1.config.routes.hostels, hotel_routes_1.default);
// rooms routes
app.use(config_1.config.routes.rooms, routes_1.default);
// favourites routes
app.use(config_1.config.routes.favourites, favorite_routes_1.default);
// messages routes
app.use(config_1.config.routes.messages, message_routes_1.default);
// Notification routes
app.use(config_1.config.routes.notifications, notification_routes_1.default);
// booking routes
app.use(config_1.config.routes.bookings, booking_routes_1.default);
// booking routes
app.use(config_1.config.routes.bookings, booking_routes_1.default);
// review routes
app.use(config_1.config.routes.reviews, review_routes_1.default);
// search routes
app.use(config_1.config.routes.search, searchRoomsHandler_1.searchRoomsHandler);
// server home
app.get(config_1.config.routes.home, (req, res) => { res.send('Welcome to Hostel Booking App Server'); });
// check health route
app.use(config_1.config.routes.healthz, (req, res) => { res.send("I am healthy"); });
// get csrf token route
app.get(config_1.config.routes.csrf, (req, res) => {
    // res.cookie('_csrf', csrf);
    res.json({ status: 'success', message: 'token generated', data: { _csrf: req.csrfToken() } });
});
// paystack routes
app.use(config_1.config.routes.paystack_transaction_url, getTransactionURL_1.getTransactionUrl);
app.use(config_1.config.routes.paystack_verify_transaction, verifyTransaction_1.verifyTransaction);
// app.get(config.routes.home, (req: Request, res: Response) => {
//   // res.cookie
// res.clearCookie('token');
//   res.render('index', {
//     title: 'Index',
//     cookie: JSON.stringify(req.cookies),
//     session: JSON.stringify(req.session),
//     signedCookie: JSON.stringify(req.signedCookies)
//   });
// });
app.get(config_1.config.routes.login, (req, res) => {
    res.render('login', { title: 'Login', message: req.flash('error') });
});
app.post(config_1.config.routes.login, (req, res) => {
    var isAuth = (0, utilities_1.auth)(req.body.username, req.body.password, req.session);
    if (isAuth) {
        res.redirect(config_1.config.routes.chat);
    }
    else {
        req.flash('error', 'Wrong Username or Password');
        res.redirect(config_1.config.routes.login);
    }
});
app.get(config_1.config.routes.chat, [utilities_1.requireAuthentication], (req, res) => {
    res.render('chat', { title: 'Chat' });
});
app.get(config_1.config.routes.logout, (req, res) => {
    (0, utilities_1.logOut)(req.session);
    res.redirect(config_1.config.routes.home);
});
app.use(errorHandler_1.errorHandler);
app.use(notFoundHandler_1.notFoundHandler);
const server = app.listen(config_1.config.port, () => {
    console.log(`Server is running on port ${config_1.config.port}`);
});
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
// for test purpose
// export{app}
