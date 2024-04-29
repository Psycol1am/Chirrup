const social = require("../models/social.server.models");
const users = require("../models/user.server.models");
const post = require("../models/post.server.models");


const search = (req, res) => {
    const query = req.query.q;


    social.searchUser(query, (err, row) => {
        console.log({ err: err })
        if (err) {
            return res.sendStatus(500);
        }
        return res.status(200).send(row);
    })
}


const followUser = (req, res) => {
    let follower_id = parseInt(req.params.user_id)

    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);

        social.checkUser(follower_id, (err, row) => {
            if (!row) return res.sendStatus(404);
            if (err) return res.sendStatus(500);


            social.getFollower(id, follower_id, (err, row) => {
                if (err) return res.sendStatus(500);
                if (row === 403) {
                    return res.sendStatus(403);
                } else {
                    social.follow(follower_id, id, (err) => {
                        if (err) return res.sendStatus(500);
                        return res.sendStatus(200);
                    })
                }




            })

        })
    });
}


const unFollowUser = (req, res) => {
    let follower_id = parseInt(req.params.user_id)

    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);

        social.checkUser(follower_id, (err, row) => {
            if (!row) return res.sendStatus(404);
            if (err) return res.sendStatus(500);



            social.getFollower(id, follower_id, (err, row) => {
                if (err) return res.sendStatus(500);
                if (row === 403) {
                    social.unFollow(follower_id, id, (err) => {
                        if (err) return res.sendStatus(500);
                        return res.sendStatus(200);
                    })
                } else {
                    return res.sendStatus(403);
                }



            })

        })
    });
}


/*const getUser = (req, res) =>{
    let user_id = parseInt(req.params.user_id)

    social.checkUser(user_id, (err,user) => {
        console.log({check:err})

        social.getAllFollowers(user_id, (err,followers) => {
            console.log({follow:err})
        
            social.getAllFollowing(user_id, (err,following) => {
                console.log({following:err})
       
                post.getAllPosts(user_id, (err,posts) => {
                    console.log({post:err})
        
                    post.getAllLikes(user_id, (err,likes) => {
                        console.log({likes:err})
      

                        social.userFormat(user, followers, following,posts,likes, (err, results) =>{
                            if(err) {
                                return res.sendStatus(500);
                            }
                            res.status(200).send(results);
                        });
                    })               
                })
            })
        }) 
    })
}*/

const getUser = (req, res) => {
    const user_id = parseInt(req.params.user_id);

    social.checkUser(user_id, (err, user) => {
        if (err) {
            return res.sendStatus(500);
        }
        if (!user) {
            return res.sendStatus(404);
        }
        social.getAllFollowers(user_id, (err, followers) => {
            if (err) {
                return res.sendStatus(500);
            }
            if (!followers) {
                return res.sendStatus(404);
            }
            social.getAllFollowing(user_id, (err, following) => {
                if (err) {
                    return res.sendStatus(500);
                }
            if (!following) {
                    return  res.sendStatus(404);
                }
            post.getAllPosts(user_id, (err, posts) => {
                    if (err) {
                        return res.sendStatus(500);
                    }

            post.getAllLikes(user_id, (err, likes) => {
                        if (err) {
                            return res.sendStatus(500);
                        }
             social.userFormat(user, followers, following, posts, likes, (err, results) => {
                            if (err) {
                                return res,sendStatus(500);
                            }

                            res.status(200).send(results);
                        });
                    });
                });
            });
        });
    });
};

const get_feed = (req, res) => {
    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500)

    })

    social.get_feed(token, (err, row) => {
        if (err) return res.sendStatus(500);
        return res.Status(200).send(row);


    })

}

module.exports = {
    get_feed: get_feed,
    search: search,
    followUser: followUser,
    unFollowUser: unFollowUser,
    getUser: getUser

}