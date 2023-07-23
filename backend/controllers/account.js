const User = require('../models/user'); // Road User Schema model

// Sign Up 
exports.signUp = (req, res) => {
    let newUser = req.body;
    newUser.stars = 4.5;
    newUser.mentoringCount = 0;
    newUser.profilePicture = 'https://w7.pngwing.com/pngs/691/765/png-transparent-primary-profile-illustration-computer-icons-person-anonymous-miscellaneous-silhouette-black-thumbnail.png';
    const user = new User(newUser);
    User.findOne({ userId: user.userId })
        .then(dupUser => {
            if (!dupUser) {
                user.save()
                    .then(user => {
                    console.log('Successed!');
                    res.json({ message: "회원가입 성공" });
                    });
            } else {
                console.log('Fail!');
                res.json({
                    signUpSuccess: false,
                    message: "이미 존재하는 아이디입니다."
                })
            }
        });
};

// Log In
exports.logIn = (req, res) => {
    User.findOne({ userId: req.body.userId })
        .then(user => {
            if (!user) {
                res.json({ logInSuccess: false, message: "아이디 또는 비밀번호가 틀렸습니다."});
            } else if (user.password !== req.body.password) {
                res.json({ logInSuccess: false, message: "아이디 또는 비밀번호가 틀렸습니다."});
            } else {
                res.json({ logInSuccess: true, message: "로그인 성공"});
            }
        });
};

// Log Out
exports.logOut = (req, res) => {
    const currentUser = req.get('Cookie');
    if (currentUser) {
        res.cookie('user_id', currentUser.split('=')[1], {maxAge: -1});
    }
    res.redirect('/');
};

// Get User Info
exports.getUserInfo = (req, res) => {
    const currentUser = req.get('Cookie');
    if (currentUser) {
        User.findOne({ userId: currentUser.split('=')[1] })
        .then(user => {
            res.json(user);
        });
    } else {
        res.json({ message: "로그인 하세요."});
    }
};
