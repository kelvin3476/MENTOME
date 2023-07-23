const Post = require('../models/post'); // Road User Schema model

// Upload Post
exports.uploadPost = (req, res) => {
    const currentUser = req.get('Cookie');
    if (currentUser) {
        let newPost = req.body;
        newPost.writer = currentUser.split('=')[1];
        newPost.comment = [];
        const post = new Post(newPost);
        post.save()
            .then(post => {
                console.log('Successed!');
                res.redirect('/');
            });
    } else {
        res.json({ message: "로그인 하세요."});
    }
};

// Upload Comment
exports.uploadComment = (req, res) => {
    const currentUser = req.get('Cookie');
    if (currentUser) {
        let newComment = {};
        newComment.comment = req.body.commentContent;
        newComment.commentWriter = currentUser.split('=')[1];
        Post.findOne({ _id: req.body._id })
            .then(post => {
                post.comments.push(newComment);
                Post.findOneAndUpdate({ _id: req.body._id }, post)
                    .then(comments => {
                        console.log('Successed!');
                        res.redirect('/');
                    });
            });
    } else {
        res.json({ message: "로그인 하세요."});
    }
};

// Find all Posts and return
exports.findAllContents = (req, res) => {
    Post.find()
        .then(posts => {
            res.json(posts);
        });
};

// Find a post and return
// exports.findContent = (req, res) => {
//     Post.findOne({ _id: req.body._id })
//         .then(post => {
//             res.json(post);
//         });
// };
