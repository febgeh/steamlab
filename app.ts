import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import SteamStrategy from "passport-steam";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';





const prisma = new PrismaClient();

const port = 4000;
const apiKey = process.env.Steam_API_Key;
let UserInfo = {}

const app = express();
app.use(cors({
	origin: "*"
  }));

app.use(cookieParser());


app.use(session({
    secret: 'secret key',
    saveUninitialized: true,
    resave: false,
    cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24 * 7}
}));


app.use(passport.initialize());
app.use(passport.session());

interface SteamUser {
    id: number;
    steamId: bigint;
    personName: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    lastlogoff: number;
    personastate: number;
    primaryclanid: string;
    timecreated: number;
    personastateflags: number;
    displayName: string;
    createdAt: Date;
}


passport.serializeUser((user, done) => {
    done(null, user as Express.User);
});

passport.deserializeUser((user, done) => {
    done(null, user as Express.User);
});


app.get('/Profile', (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token: " + token);
    if (!token) {
        console.log("No user found");
        res.status(401).json({message: "No user found", redirect: "/"});
    } else {
        next(); 
    }
});



passport.use(new SteamStrategy({
	returnURL: `http://localhost:${port}/api/auth/steam/return`,
	realm: `http://localhost:${port}/`,
	apiKey: apiKey as string,
}, async (identifier, profile, done) => {
	console.log("Identifier: " + identifier);
	console.log("Profile: " + JSON.stringify(profile));

	//endelig
	(BigInt.prototype as any).toJSON = function () {
		return Number(this)
		};
	try {

		const createdUser = await prisma.steamUser.create({
			data: {
				steamId: parseInt(profile.id),
				
				personName: profile.displayName,
				profileurl: profile._json.profileurl,
				avatar: profile._json.avatar,
				avatarmedium: profile._json.avatarmedium,
				avatarfull: profile._json.avatarfull,
				avatarhash: profile._json.avatarhash,
				lastlogoff: profile._json.lastlogoff,
				personastate: profile._json.personastate,
				primaryclanid: profile._json.primaryclanid,
				timecreated: profile._json.timecreated,
				personastateflags: profile._json.personastateflags,
				displayName: profile.displayName,
				createdAt: new Date()
			}

		});

		done(null, createdUser);
	} catch (error) {
		done(error);
	}finally {
		await prisma.$disconnect();
	}
}));

app.get('/logout', async (req, res) => {
    const userId = req.cookies.token;
	console.log("User ID: " + userId);
    try {
        await prisma.steamUser.delete({
            where: {
                id: parseInt(userId)
            }
        });
        res.clearCookie('token');
		console.log("User Deleted: " + userId + "Cookie Deleted: " + req.cookies.token);
        res.redirect('http://localhost:3000/');
    } catch (error) {
        console.error("Error deleting user: ", error);
        res.status(500).send("Error deleting user");
    }
});


app.listen(port, () => {
    console.log("Server started on port " + port);
});

app.get('http://localhost:3000/', (req, res) => {
    res.send(req.user);
});

app.get('/api/auth/steam', passport.authenticate('steam', { failureRedirect: 'http://localhost:3000/' }));

app.get('/api/auth/steam/return', passport.authenticate('steam', { failureRedirect: 'http://localhost:3000/' }), (req, res) => {
	async function reqUser(req: Request, res: Response, next: NextFunction) {
		req.user = UserInfo; 
		next(); 
	}
	app.use(reqUser);
	const user = req.user as SteamUser;
	console.log("User: " + JSON.stringify(user));
	if (!user) {
		res.status(401).send("Invalid authentication");
		return;
	}
	console.log("User ID: " + user.id);

	res.cookie("token", user.id, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false, domain: 'localhost'});
	console.log("token: " + req.cookies.token); 

	res.send('<script>window.opener.location.href = "http://localhost:3000/Profile"; window.close();</script>');
});
