Backend server

'npm run dev' to run server

userSchema =
userId: { type: String },
password: { type: String },
nickname: { type: String },
profilePicture: { type: String },
stars: { type: Number },
mentoringCount: { type: Number },
notice: [
    {
        noticeType: { type: String },
        noticeSender: { type: String },
        noticeDate: { type: Date },
        roomName: { type: String },
        roomEnter: { type: String }
    }
]


postSchema =
postType: {type: String},
title: { type: String },
writer: { type: String },
date: { type: Date },
content: { type: String },
sport: { type: String },
career: { type: String },
comments: [
    {
        commentContent: { type: String },
        commentWriter: { type: String },
        commentDate: { type: Date },
        commentReply: [
            {
                replyContent: { type: String },
                replyWriter: { type: String },
                replyDate: { type: Date }
            }
        ]
    }
]

post ('/api/account/signup')
// userId, password, nickname

post ('/api/account/login')
// userId, password

get ('/api/account/getUserInfo')

post ('/api/content/uploadpost')
// title, content, sport, career

post ('/api/content/uploadcomment')
// post._id, commentContent

get ('/api/content/getallcontents')

get ('/api/content/getmentocontents')

get ('/api/content/getmenteecontents')

get ('/api/content/getcontentdetail/:_id')

get('/api/content/getcontentcomments/:_id')