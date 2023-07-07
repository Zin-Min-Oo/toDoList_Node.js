const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (request, response) => {
  let today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  response.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (request, response) => {
  let item = request.body.newItem;
  if (request.body.list === "Work") {
    workItems.push(item);
    response.redirect("/work");
  } else {
    items.push(item);
    response.redirect("/");
  }
});

app.get("/work", (request, response) => {
  response.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", (request, response) => {
  response.render("about");
});

app.listen(3000, () => {
  console.log("Server started on Port 3000");
});
