var config = {};

config.twitter = {};
config.redis = {};
config.web = {};
config.app = {};
config.db = {};

config.default_stuff = ['red', 'green', 'blue', 'apple', 'yellow', 'orange', 'politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password = process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;
config.app.securedpath = '/api';	//this will be the secured api path from root



config.app.views = '../dist/demotest';

config.db.host = "localhost";
config.db.user = "root";
config.db.password = "root";
config.db.database = "myapp";

module.exports = config;
