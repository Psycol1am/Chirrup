const auth = require('../lib/authentication.js')
const social = require('../controllers/social.server.controllers.js')

module.exports = function(app){
    app.route('/search')
    .get(social.search);

    app.route('/users/:user_id/follow')
    .post( auth.isAuthenticated, social.followUser)
    .delete(auth.isAuthenticated, social.unFollowUser);


    app.route('/users/:user_id')
    .get(social.getUser)
}
