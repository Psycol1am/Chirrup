const users = require("../models/user.server.models");
const isAuthenticated = function(req, res, next){
    let token = req.get('X-Authorization');

    if(!token || token === undefined){
        return res.sendStatus(401);
    }

    users.getIDFromToken(token, (err, id) => {
        console.log(id);
        if (err || id === null) {
            return res.sendStatus(401);
        }
        next();
    });
};

module.exports = {
    isAuthenticated: isAuthenticated
}
