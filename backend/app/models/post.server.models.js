const db = require("../../database");



const addNewPost = (post, id, done) => {

    const sql = 'INSERT INTO posts (text, date_published, author_id) VALUES (?, ? ,?)';
    let values = [post.text, Date.now(), id];

    db.run(sql, values, function (err) {
        if (err) return done(err);
        return done(null, this.lastID);
    })

}

const getSinglePost = (post_id, done) => {

    const sql = `SELECT p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username
                FROM posts p, users u
                WHERE p.post_id=? 
                AND p.author_id = u.user_id`;

    db.get(sql, [post_id], (err, post_details) => {
        if (err) return done(err);
        if (!post_details) return done(404);


        // Making another db interaction to get the likes
        const sql = `SELECT u.user_id, u.first_name, u.last_name, u.username
                           FROM users u, likes l
                         WHERE l.post_id=?
                         AND l.user_id=u.user_id`;
        const likes = [];
        db.each(
            sql,
            [post_id],
            (err, row) => {
                if (err) return done(err);

                likes.push({
                    user_id: row.user_id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    username: row.username
                })
            },
            (err, num_rows) => {
                if (err) return done(err);

                return done(null, {
                    post_id: post_details.post_id,
                    timestamp: post_details.date_published,
                    text: post_details.text,
                    author: {
                        user_id: post_details.post_id,
                        first_name: post_details.first_name,
                        last_name: post_details.last_name,
                        username: post_details.username
                    },
                    likes: likes
                })
            }
        )
    })
}

const updatePost = (post_id, new_text, done) => {

    const sql = 'UPDATE posts SET text=? WHERE post_id=?';

    db.run(sql, [new_text, post_id], (err) => {
        return done(err);
    })
}

const checkAuthor = (post_id, author_id, done) => {
    const sql = 'SELECT author_id FROM posts WHERE post_id=? AND author_id=?'

    db.get(sql, [post_id, author_id], (err, row) => {
        if (err) return done(err)
        if (!row) return done(403)
        return done(null, row)
    })


}

const removePost = (post_id, done) => {

    const sql = 'UPDATE posts SET text=NULL, date_published=NULL, author_id=NULL WHERE post_id=?';


    db.run(sql, [post_id], (err) => {
        return done(err);
    })



}



const getLike = (user_id, post_id, done) => {

    const sql = 'SELECT * FROM likes WHERE user_id=? AND post_id =?';

    db.get(sql, [user_id, post_id], (err, row) => {
        if (err) return done(err);
        if (row !== undefined) {
            return done(null, 403);
        } else {
            return done(null, 404);
        }


    })
}

const likePost = (post_id, user_id, done) => {

    const sql = 'INSERT INTO likes (post_id, user_id) VALUES (?,?)';

    db.run(sql, [post_id, user_id], function (err) {
        return done(err);
    })

}

const unlikePost = (post_id, user_id, done) => {

    const sql = 'UPDATE likes SET post_id=null, user_id=null WHERE user_id =? AND post_id=?';
    db.run(sql, [user_id, post_id], function (err) {
        return done(err)
    })


}

const getAllLikes = (user_id, done) => {
    const sql = `SELECT u.user_id, u.first_name, u.last_name, u.username
    FROM users u, likes l
  WHERE l.user_id=?`;
    const likes = [];
    db.each(
        sql,
        [user_id],
        (err, row) => {
            if (err) return done(err);

            likes.push({
                user_id: row.user_id,
                first_name: row.first_name,
                last_name: row.last_name,
                username: row.username
            })
            })
            return done(null, {
                likes

        })
}


const getAllPosts = (user_id, done) => {

    const sql = `SELECT p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username
                FROM posts p, users u
                WHERE p.author_id = ?`;
    const posts = [];

    db.each(sql, [user_id], (err, post_details) => {
        if (err) return done(err);
        if (!post_details) return done(404);
        posts.push({
            post_id: post_details.post_id,
            timestamp: post_details.date_published,
            text: post_details.text,
            author: {
                user_id: post_details.post_id,
                first_name: post_details.first_name,
                last_name: post_details.last_name,
                username: post_details.username
            },
        })
    })
    return done(null, {
        posts
    })
}
module.exports = {
    addNewPost: addNewPost,
    getSinglePost: getSinglePost,
    updatePost: updatePost,
    removePost: removePost,
    likePost: likePost,
    getLike: getLike,
    unlikePost: unlikePost,
    checkAuthor: checkAuthor,
    getAllLikes: getAllLikes,
    getAllPosts: getAllPosts

}