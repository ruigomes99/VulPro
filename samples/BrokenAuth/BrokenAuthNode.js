passport.use("local-signin", new LocalStrategy(
    // Required fields to login
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) {
        const user = await UserModel.findOne({ email: email });
        if (!user) return done(null, false, "User Not Found");
        if (user.type != "admin") {
            if (!user.approved) return done(null, false, "User Not Approved");
            if (!user.authorized_signin) return done(null, false, "User Not Authorized");
            if (user.deleted) return done(null, false, "User Deleted");
        }

        if (!bcrypt.compareSync(password, user.password)) return done(null, false, "Incorrect Password");

        const session = {
            _id: user._id,
            type: user.type,
            name: user.name,
            email: user.email
        }
        return done(null, session, "Success");

    }
));