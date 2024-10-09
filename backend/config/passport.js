// backend/config/passport.js
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const RobloxStrategy = require('passport-roblox').Strategy;
const { User } = require('../models/userModel');
const dotenv = require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Discord Strategy
passport.use(new DiscordStrategy({
    clientID: '1285552460236066859',
    clientSecret: 'sYQDT14b7j7Yscv8JLMjavb9UVbhuaAG',        
    callbackURL: 'http://parrotrblx.com/auth/discord/callback',
    scope: ['identify'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findByDiscordId(profile.id);
        if (!user) {
            const userId = await User.create(profile.id, profile.username, profile.avatar);
            user = await User.findById(userId);
        }
        // Optionally, save OAuth token
        await OAuthToken.create(user.id, 'Discord', accessToken);
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Roblox Strategy
passport.use(new RobloxStrategy({
    clientID: '7770692952306165383',
    clientSecret: 'RBX-hRVX_mp1OkqtP29kAH0HNG6EndEwNIr4Drjsozm6zGB0jdfAZobW0pq0pkmbWdlD',
    callbackURL: 'https://parcelroblox.com/auth/roblox/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findByRobloxId(profile.id);
        if (!user) {
            const userId = await User.createRoblox(profile.id, profile.username, profile.avatar);
            user = await User.findById(userId);
        }
        // Optionally, save OAuth token
        await OAuthToken.create(user.id, 'Roblox', accessToken);
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));
