
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,connect = require('connect');


var form = '\n\
   <form action="/" method="post">\n\
     <input type="hidden" name="_csrf" value="{token}" />\n\
     <input type="text" name="user[name]" value="{user}" />\n\
     <input type="password" name="user[pass]" />\n\
     <input type="submit" value="Login" />\n\
   </form>\n\
 ';

var cc = connect()
    .use(connect.cookieParser('keyboard cat'))
    .use(connect.session({ secret: 'keyboard cat' }))
    .use(connect.bodyParser())
    .use(connect.csrf())
    .use(function(req, res){
        res.setHeader('Content-Type', 'text/html');
        var body = form
            .replace('{token}', req.session._csrf)
            .replace('{user}', req.session.user && req.session.user.name || '');
        res.end(body);
    })
var app = module.exports = express.createServer(cc
//    connect.cookieParser('keyboard cat' )
//    , connect.session({ secret: 'keyboard cat' })
//    , connect.bodyParser()
//    , connect.csrf()
);



// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index);
//app.get('/', function(req, res) {
//    req.setHeader('Content-Type', 'text/html');
//    var body = form
//        .replace('{token}', req.session._csrf)
//        .replace('{user}', req.session.user && req.session.user.name || '');
//    res.end(body);
//});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
