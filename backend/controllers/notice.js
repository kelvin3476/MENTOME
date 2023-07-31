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