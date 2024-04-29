const Joi = require("joi");
const users = require("../models/user.server.models");

const add_user = (req,res) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])*/).min(8).max(20).required()
    });
    
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send({error_message: error.message});

    let user = Object.assign({}, req.body);
    users.addNewUser(user, (err,id)  => {
        if(err) {
            return res.sendStatus(500);
        } else {
            return res.status(201).send({user_id: id});
        }
    });
};

const login = (req,res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send({error_message: error.message});

    users.authenticateUser(req.body.username, req.body.password, (err,id) => {
      if(err === 400) return res.status(400).send({error_message:"Invalid username/password supplied"})
      if (err) return res.sendStatus(500)

      users.getToken(id, (err,token) => {
            if (err) return res.sendStatus(500)

            if(token){
                return res.status(200).send({user_id: id, session_token: token})
            } else{
                users.setToken(id, (err, token) => {
                if (err) return res.sendStatus(500)
                return res.status(200).send({user_id: id, session_token: token})
                })
            }      
        })
    })
};

const logout = (req,res) => {
let token = req.get('X-Authorization');
users.removeToken(token, (err) => {
    if (err) return res.sendStatus(500);
    return res.sendStatus(200);
})

};




module.exports = {
    add_user: add_user,
    login: login,
    logout: logout
};