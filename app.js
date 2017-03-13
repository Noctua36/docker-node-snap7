(function () {

  var snap7 = require('node-snap7');

  var s7server = new snap7.S7Server();
  var s7client = new snap7.S7Client();

  var ip = '127.0.0.1';

  // Config envent listener
  s7server.on("event", function (event) {
    console.log(s7server.EventText(event));
  });

  // Create a new Buffer and register it to the server as DB1
  var db1 = new Buffer(100).fill('ÿ');
  s7server.RegisterArea(s7server.srvAreaDB, 1, db1);

  // start server
  s7server.StartTo(ip);

  // Close the server after one minute
  // setTimeout(function () {
  //   s7server.Stop();
  //   s7server.UnregisterArea(s7server.srvAreaDB, 1);
  // }, 60 * 1000);

  // read db1
  s7client.ConnectTo(ip, 0, 0, function (err) {
    if (err) console.log(s7client.ErrorText(err));
    else {
      s7client.DBRead(1, 0, 100, function(err, result){
        if (err) console.log(s7client.ErrorText(err));
         else console.log(JSON.stringify(result));
        //Close server
        s7server.Stop();
        s7server.UnregisterArea(s7server.srvAreaDB, 1);
      });
    }
  });
})();