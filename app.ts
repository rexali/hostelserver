import express, { Application, Response, Request, NextFunction } from "express";
import { loggerHandler } from "./middleware/loggerHandler";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import partials from "express-partials";
import cookieParser from "cookie-parser";
import session from "express-session";
import csrf from "csurf";
import cors from "cors";
import { authenticated, requireAuthentication, auth, logOut } from "./middleware/utilities";
import flash from "connect-flash";
import { config, sequelize } from "./config";
import authRouter from "./api/v1/auth/routes/user.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import passport from "./api/v1/auth/passport.config";
import profileRouter from "./api/v1/profiles/routes/profile.routes";
import hostelRouter from "./api/v1/hostels/routes/hotel.routes";
import roomRouter from "./api/v1/rooms/routes/routes";
import favoriteRouter from "./api/v1/favourites/routes/favorite.routes";
import messageRouter from "./api/v1/messages/routes/message.routes";
import notificationRouter from "./api/v1/notifications/routes/notification.routes";
import bookingRouter from "./api/v1/bookings/routes/booking.routes";
import reviewRouter from "./api/v1/reviews/routes/review.routes";

declare module 'express-session' {
  interface SessionData {
    pageCount?: number;
  }
}

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { defaultLayout: 'layout' });
app.use(partials());
app.use(loggerHandler);
// prevent hacker from knowing our stack
app.disable("x-powered-by");
// help set response headers
app.use(helmet())
// help validate and sanitise
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, //15mins  
  max: 100 // limit each ip to 100 request per WindowMs i.e 15min
}));
const corsOption = {
  origin:"http://localhost:5173",
  credentials:true
}
app.use(cors({
  ...corsOption
}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser(config.secret));
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  // cookie:{
  //   secure:true,
  // }
}));
// initialize newpassport
app.use(passport.initialize());
// use newpassport session
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(csrf());
// app.use(csrf({ cookie: true }));
// app.use(getCsrfToken);
app.use(authenticated);
app.use(flash());
app.use(function (req: Request, res: Response, next: NextFunction) {
  if (req.session.pageCount)
    req.session.pageCount++;
  else
    req.session.pageCount = 1;
  next();
});

// test connection and synchronise to database
((async () => {
  sequelize.authenticate().then(() => {
    console.log("connected with database successfully");
  }).catch((error: any) => {
    console.error("Unable to connect with database: " + error);
  });

  // sequelize.sync({ force: false }).then(() => {
  //   console.log("database synced successfully");
  // }).catch((error: any) => {
  //   console.error("Unable to sync with database: " + error);
  // })

  sequelize.sync({ alter: true }).then(() => {
    console.log("database synced successfully");
  }).catch((error: any) => {
    console.error("Unable to sync with database: " + error);
  })

}))();

// authentication route
app.use(config.routes.auth, authRouter);
// profiles routes
app.use(config.routes.profiles, profileRouter);
// hostels routes
app.use(config.routes.hostels, hostelRouter);
// rooms routes
app.use(config.routes.rooms, roomRouter);
// favourites routes
app.use(config.routes.favourites, favoriteRouter);
// messages routes
app.use(config.routes.messages, messageRouter);
// Notification routes
app.use(config.routes.notifications, notificationRouter);
// booking routes
app.use(config.routes.bookings, bookingRouter); 
// booking routes
app.use(config.routes.bookings, bookingRouter); 
// review routes
app.use(config.routes.reviews, reviewRouter); 
// server home
app.get(config.routes.home, (req: Request, res: Response) => {res.send('Welcome to Hostel Booking App Server')});
// check health route
app.use(config.routes.healthz, (req: Request, res: Response)=>{res.send("I am healthy")}); 
// get csrf token route
app.get(config.routes.csrf, (req: Request, res: Response) => {
  // res.cookie('_csrf', csrf);
  res.json({ status: 'success', message: 'token generated', data: { _csrf: req.csrfToken()} });
});

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

app.get(config.routes.login, (req: Request, res: Response) => {
  res.render('login', { title: 'Login', message: req.flash('error') });
});

app.post(config.routes.login, (req: Request, res: Response) => {
  var isAuth = auth(req.body.username, req.body.password, req.session as any);
  if (isAuth) {
    res.redirect(config.routes.chat);
  } else {
    req.flash('error', 'Wrong Username or Password');
    res.redirect(config.routes.login);
  }
}
);

app.get(config.routes.chat, [requireAuthentication], (req: Request, res: Response) => {
  res.render('chat', { title: 'Chat' });
});

app.get(config.routes.logout, (req: Request, res: Response) => {
  logOut(req.session);
  res.redirect(config.routes.home);
});

app.use(errorHandler);

app.use(notFoundHandler);

const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// for test purpose
// export{app}