const db = require("../../database");

const searchUser = (query, done) => {
    const sql = `SELECT user_id, first_name, last_name, username FROM users WHERE first_name LIKE '%' || ? || '%' OR last_name LIKE '%' || ? || '%' OR username LIKE '%' || ? || '%'`

    db.get(sql, [query, query, query], (err, row) => {
        if (err) {
            return done(err);
        }
        return done(null, row);
    })

}


const getFollower = (user_id, follower_id, done) => {
    const sql = 'SELECT * FROM followers WHERE user_id=? AND follower_id=?';

    db.get(sql, [user_id, follower_id], (err, row) => {
        if (err) {
            return done(err);
        }

        if (row !== undefined) {
            return done(null, 403);
        } else {
            return done(null, 404);
        }
    });
};


const checkUser = (user_id, done) => {
    const sql = 'SELECT user_id, first_name, last_name, username FROM users WHERE user_id=?'

    db.get(sql, [user_id], (err, row) => {
        if (err) {
            return done(err);
        }
        if (!row) return done(404);
        if (row) return done(null, row)
    })


}

const userFormat = (user, followers, following, posts, likes, done) => {
    const result = {
        user_id: user.user_id,
        first_name:user.first_name,
        last_name:user.last_name,
        username:user.username,
        followers: followers,
        following : following || [],
        posts : posts || [],
        likes : likes || []

    };
    return done(null, result)

}



const getfeed = (user_id, done) => {
    const sql = `
        SELECT p.post_id, p.text, p.date_published, p.author_id
        FROM posts p
        LEFT JOIN followers f ON p.post_id = f.post_id AND f.user_id = ?
        WHERE p.author_id = ? OR f.user_id IS NOT NULL
        ORDER BY p.date_published DESC;
    `;

    db.each(sql, [user_id, user_id], (err, row) => {
        if (err) {
            return done(err);
        }

        // If no error, return the retrieved posts
        return done(null, row);
    });
};


const follow = (follower_id, user_id, done) => {

    const sql = 'INSERT INTO followers (follower_id, user_id) VALUES (?,?)';

    db.run(sql, [follower_id, user_id], function (err) {
        return done(err);
    })

}

const unFollow = (follower_id, user_id, done) => {

    const sql = 'UPDATE followers SET follower_id=null, user_id=null WHERE user_id =? AND follower_id=?';
    db.run(sql, [user_id, follower_id], function (err) {
        return done(err)
    })
}

const getAllFollowers = (user_id, done) => {
    const sql = `SELECT u.user_id, u.first_name, u.last_name, u.username
 FROM users u
 JOIN followers f ON u.user_id = f.follower_id
 WHERE f.user_id = ?`
    const followers = []

    db.each(sql, [user_id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(404);

        followers.push({
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            username: row.username
        })

    })
    return done(null, {
        followers
    })
}

const getAllFollowing = (user_id, done) => {
    const sql = `SELECT u.user_id, u.first_name, u.last_name, u.username
    FROM users u
    JOIN followers f ON u.user_id = f.user_id
    WHERE f.follower_id = ?`;
    const following = []

        db.each(sql, [user_id], (err, row) => {
            if (err) return done(err);
            if (!row) return done(404);

            following.push({
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            username: row.username
            })

        })
    return done(null, {
    following
    })
}

module.exports = {
    getFollower: getFollower,
    searchUser: searchUser,
    follow: follow,
    unFollow: unFollow,
    checkUser: checkUser,
    getAllFollowing:getAllFollowing,
    getAllFollowers:getAllFollowers,
    userFormat:userFormat

}