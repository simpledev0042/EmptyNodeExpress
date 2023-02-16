const { Route, GET, POST, PUT, DELETE, ALL, RouteObject } = require("simple-route")
const { auth, token } = require("./../middlewares");

const route = Route.create({
  path: "user",
  middlewares: [auth],
  func: (req, res) => { res.send("OK") },
  method: GET,
  childs: [

  ]
})

module.exports = {
  route
}