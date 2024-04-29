const Joi = require("joi");
const posts = require("../models/post.server.models");
const users = require("../models/user.server.models");

const add_post = (req, res) => {
    const schema = Joi.object({
        text: Joi.string().required()
    });

    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);

        const { error } = schema.validate(req.body);
        if (error) return res.sendStatus(400);

        let post = Object.assign({}, req.body); //Converts the request body into a object

        posts.addNewPost(post, id, (err, id) => {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.status(201).send({ post_id: id });
            }
        });


    })




};

const get_post = (req, res) => {
    let post_id = parseInt(req.params.post_id);

    posts.getSinglePost(post_id, (err, result) => {
        if (err === 404) return res.sendStatus(404)

        return res.status(200).send(result)
    })
};

const update_post = (req, res) => {
    let post_id = parseInt(req.params.post_id);

    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);

        posts.getSinglePost(post_id, (err, post) => {
            if (err === 404) return res.sendStatus(404);
            if (err) return res.sendStatus(500);


            const schema = Joi.object({
                text: Joi.string().required()
            })

            posts.checkAuthor(post_id, id, (err, row) => {
                if (err == 403) return res.sendStatus(403);
                if (err) return res.sendStatus(500);



                const { error } = schema.validate(req.body);
                if (error) return res.status(400).send(error.details[0].message);

                if (post.text === req.body.text) {
                    return res.sendStatus(200);
                }

                posts.updatePost(post_id, req.body.text, (err) => {
                    if (err) return res.sendStatus(500);
                    return res.sendStatus(200);
                })
            })

        })
    })
};

const delete_post = (req, res) => {
    let post_id = parseInt(req.params.post_id);
    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);

        posts.getSinglePost(post_id, (err, post) => {
            if (err === 404) return res.sendStatus(404);
            if (err) return res.sendStatus(500);



            posts.checkAuthor(post_id, id, (err, row) => {
                if (err == 403) return res.sendStatus(403);
                if (err) return res.sendStatus(500);


                posts.removePost(post_id, (err) => {
                    if (err) return res.sendStatus(500);
                    return res.sendStatus(200);
                })

            })

        })
    })
};

const add_like = (req, res) => {
    let post_id = parseInt(req.params.post_id)

    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);

        posts.getSinglePost(post_id, (err, post) => {
            if (err === 404) return res.sendStatus(404);
            if (err) return res.sendStatus(500);

            posts.getLike(id, post_id, (err, row) => {
                console.log({ error: err })
                console.log({ row: row })
                if (err) return res.sendStatus(500);
                if (row === 403) {
                    return res.sendStatus(403);
                } else {
                    posts.likePost(post_id, id, (err) => {
                        if (err) return res.sendStatus(500);
                        return res.sendStatus(200);
                    })
                }





            })

        })
    });
}

const remove_like = (req, res) => {
    let post_id = parseInt(req.params.post_id)

    let token = req.get('X-Authorization');
    users.getIDFromToken(token, (err, id) => {
        if (err) return res.sendStatus(500);

        posts.getSinglePost(post_id, (err, post) => {
            if (err === 404) return res.sendStatus(404);
            if (err) return res.sendStatus(500);

            posts.getLike(id, post_id, (err, row) => {

                if (row === 404) return res.sendStatus(403);
                if (row === 403) {
                    posts.unlikePost(post_id, id, (err) => {
                        if (err) return res.sendStatus(500);
                        return res.sendStatus(200);

                    })

                }



            })

        })
    });
};


module.exports = {
    add_post: add_post,
    get_post: get_post,
    update_post: update_post,
    delete_post: delete_post,
    add_like: add_like,
    remove_like: remove_like,
};