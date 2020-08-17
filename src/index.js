// var http = require("http");

// //create a server object:
// http
//   .createServer(function(req, res) {
//     res.write("Hello World!"); //write a response to the client
//     res.end(); //end the response
//   })
//   .listen(8080); //the server object listens on port 8080

// Require the client library packages
const Iota = require("@iota/core");
const Converter = require("@iota/converter");

// Create a new instance of the IOTA API object
// Use the `provider` field to specify which node to connect to
const iota = Iota.composeAPI({
  provider: "https://nodes.devnet.iota.org:443"
});

const depth = 3;
const minimumWeightMagnitude = 9;

const address =
  "HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D";

const seed =
  "PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";

const message = JSON.stringify({ message: "Hello world" });
const messageInTrytes = Converter.asciiToTrytes(message); //a tryte is just a character between A-Z or the number

// Define a Transaction
const transfers = [
  {
    value: 0,
    address: address,
    message: messageInTrytes
  }
];

// Send Transaction to the node
Iota.prepareTransfers(seed, transfers)
  .then((trytes) => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
  })
  .then((bundle) => {
    console.log(bundle[0].hash);
  })
  .catch((err) => {
    console.error(err);
  });
