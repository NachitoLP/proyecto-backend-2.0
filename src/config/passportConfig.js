const passport = require("passport")
const { userModel } = require("../dao/models/usersModel")
const { createHashedPass, checkValidPassword } = require("../utils/bcryptPass")
const LocalStrategy = require("passport-local").Strategy
const GitHubStrategy = require("passport-github2").Strategy

const initializePassport = () => {
    //Register

    passport.use(
        'register',
        new LocalStrategy({
            passReqToCallback: true,
            usernameField: "email"
        },
        async ( req , email , password , done ) => {
            try {
                const { first_name , last_name , username } = req.body
        
                const exist = await userModel.findOne({email}) || await userModel.findOne({username})
                
                if(exist) return done(null , false)
        
                const hashedPassword = createHashedPass(password)
        
                const newUser = {
                    first_name,
                    username,
                    last_name,
                    email,
                    password:hashedPassword,
                    rol:'usuario'
                }
        
                if (email === 'adminCoder@coder.com' && password == 'adminCod3r123') {
                    newUser.rol = 'admin'
                }
                
                req.session.user = {
                    username: newUser.username,
                    password: newUser.password,
                    rol: newUser.rol
                }
        
                let result = await userModel.create(newUser)
                return done( null, result )
            } 
            catch (error) {
                console.log(error);
            }
        })
    )
    passport.serializeUser(( user , done ) => {
        done(null , user._id)
    })
    passport.deserializeUser(async ( id , done ) => {
        try {
            const user = await userModel.findById(id)
            done(null , user)
        } 
        catch (error) {
            console.log(error);
        }
    })

    //Github
    passport.use(
        'github',
        new GitHubStrategy({
            clientID: "Iv1.8d9c3cac662ade74",
            clientSecret: "6dfdb009eec28c04cf4fb1a79e5261bffafef371",
            callbackURL: "http://localhost:8080/session/githubcallback",
            scope: ["user:email"]
        },
        async ( accessToken , refreshToken , profile , done ) => {
            try {
                const user = await userModel.findOne({email: profile.emails[0].value})
                
                if (!user) {
                    let password = "1234"
                    const hashedPassword = createHashedPass(password)

                    const newUser = {
                        first_name: profile._json.name.split(' ')[0],
                        last_name: profile._json.name.split(' ')[1],
                        username: profile.username,
                        email: profile.emails[0].value,
                        password: hashedPassword,
                        rol: 'usuario'
                    }

                    const result = await userModel.create(newUser)
                    return done(null , result)
                }
                return done(null , user)
            } catch (error) {
                console.log(error);
            }
        })
        )

    //Login

    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'username'
        },
        async ( username , password , done) => {
            try {
                const user = await userModel.findOne({username})
                
                if (!user) return done(null , false)

                const isValidPassword = checkValidPassword({
                    hashedPassword: user.password,
                    password
                })

                if (!isValidPassword) {
                    return done(null, false)
                }

                return done(null , user)
            } catch (error) {
                console.log(error);
            }
        }
        )
    )
}

module.exports = {
    initializePassport
}
