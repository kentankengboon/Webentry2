


//const port = process.env.Port || 3000;
//console.log(port)
//import express from '../node_modules/express';
//const express = require('express');
//const app = express();
//app.listen(process.env.PORT || 3000, ()=>{
//  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve the static files
app.use(express.static('build'));

// Handle other routes or API endpoints
// ...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


