const Post = require('../models/post');

// Upload Post
exports.uploadPost = (req, res) => {
    const currentUser = req.get('Cookie');
    if (currentUser) {
        let newPost = req.body;
        newPost.writer = currentUser.split('=')[1];
        newPost.date = Date();
        newPost.comments = [];
        const post = new Post(newPost);
        post.save()
            .then(post => {
                res.json({ 
                    uploadPostSuccess: true,
                    message: "게시글 업로드 성공"
                });
                console.log('Upload Post Success!');
            });
    } else {
        res.json({ 
            uploadPostSuccess: false,
            message: "로그인 후 시도하세요."
        });
        console.log('Upload Post Fail! (NOT LOG IN)');
    }
};

// Upload Comment
exports.uploadComment = (req, res) => {
    const currentUser = req.get('Cookie');
    if (currentUser) {
        let newComment = {};
        newComment.commentContent = req.body.commentContent;
        newComment.commentWriter = currentUser.split('=')[1];
        newComment.commentDate = Date();
        Post.findOne({ _id: req.body._id })
            .then(post => {
                post.comments.push(newComment);
                Post.findOneAndUpdate({ _id: req.body._id }, post)
                    .then(post => {
                        res.json({ 
                            uploadCommentSuccess: true,
                            message: "댓글 업로드 성공"
                        });
                        console.log('Upload Comment Success!');
                    });
            });
    } else {
        res.json({ 
            uploadCommentSuccess: false,
            message: "로그인 후 시도하세요."
        });
        console.log('Upload Comment Fail! (NOT LOG IN)');
    }
};

// Get all Contents and Return
exports.getAllContents = (req, res) => {
    Post.find()
        .then(posts => {
            res.json(posts);
            console.log('Get All Contents Success!');
        });
};

// Get a Content Detail and Return
exports.getContentDetail = (req, res) => {
    Post.findOne({ _id: req.params._id })
        .then(post => {
            res.json(post);
            console.log('Get a Content Detail Success!');
        });
};
