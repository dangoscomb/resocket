var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {

  console.log('New socket connected');

  var sportsTweets = [
    {
      type: 'UPDATE_SPORTS_TWEETS',
      payload: 'Barcelona beats Valencia!'
    }, {
      type: 'UPDATE_SPORTS_TWEETS',
      payload: 'Madrid loses!'
    }
  ];

  var techTweets = [
    {
      type: 'UPDATE_TECH_TWEETS',
      payload: 'Iphone!'
    }, {
      type: 'UPDATE_TECH_TWEETS',
      payload: 'Samsung!'
    }
  ];

  socket.on('tweet', function(data) {
    io.emit(data.type, {
      type: 'UPDATE_' + data.type,
      payload: data.tweet
    });
  });

  function update() {
    sportsTweets.forEach(function(val) {
      io.emit('SPORTS_TWEETS', val);
    });

    techTweets.forEach(function(val) {
      io.emit('TECH_TWEETS', val);
    });
  }

  function runner() {
    update();
    setTimeout(function() {
      runner();
    }, 10000);
  }

  runner();

});

http.listen(9000, function() {
  console.log(`Connection established at port: 9000`);
});
