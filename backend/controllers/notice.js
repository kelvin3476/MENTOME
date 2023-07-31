const Post = require('../models/post');
const User = require('../models/user');

// Add Comment Notice
exports.addCommentNotice = (req, res) => {
    const currentUser = req.get('Cookie');
    if (currentUser) {
        let newNotice = {};
        newNotice.noticeType = 'comment';
        newNotice.noticeSender = currentUser.split('=')[1];
        newNotice.noticeDate = Date();
        Post.findOne({ _id: req.params._id })
            .then(post => {
                if (currentUser.split('=')[1] != post.writer) {
                    User.findOne({ userId: post.writer })
                        .then(user => {
                            user.notices.push(newNotice);
                            User.findByIdAndUpdate({ userId: post.writer }, user)
                                .then(user => {
                                    res.json({
                                        addCommentNoticeSuccess: true,
                                        message: "댓글 알림 추가 성공"
                                    });
                                });
                        });
                }
            });
    } else {
        res.json({ 
            addCommentNoticeSuccess: false,
            message: "로그인 후 시도하세요."
        });
        console.log('Upload Comment Fail! (NOT LOG IN)');
    }
};

// Add Invite Notice
exports.addInviteNotice = (req, res) => {
    const currentUser = req.get('Cookie');
    if (currentUser) {
        let newNotice = {};
        newNotice.noticeType = 'invite';
        newNotice.noticeSender = currentUser.split('=')[1];
        newNotice.noticeDate = Date();
        newNotice.roomName = '';
        newNotice.roomEnter = 'false';
        User.findOne({ userId: req.params.userId })
            .then(user => {
                user.notices.push(newNotice);
                User.findByIdAndUpdate({ userId: req.params.userId }, user)
                    .then(user => {
                        res.json({
                            addInviteNoticeSuccess: true,
                            message: "초대 알림 추가 성공"
                        });
                    });
            });
    } else {
        res.json({ 
            addCommentNoticeSuccess: false,
            message: "로그인 후 시도하세요."
        });
        console.log('Upload Comment Fail! (NOT LOG IN)');
    }
};
