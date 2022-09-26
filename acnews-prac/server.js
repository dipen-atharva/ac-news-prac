// const express = require("express");
// const mongoose = require("mongoose");
// const Router = require("./routes")

// const app = express();

// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/ac-news',
//   {
//     useNewUrlParser: true
//   }
// );

// const db = mongoose.connection;
// db.on("error",console.error.bind(console,"Connection Error"));
// db.once("open",function () {
//     console.log("Connected Successfully");
// })

// app.use(Router);
// app.listen(3000, () => {
//     console.log("Server is running at port 3000.");
// })


const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.render('home', {
    title: 'Search Ac News',
  });
});


const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Hacker news server started on port: ${server.address().port}`);
});

app.set('view engine', 'pug');