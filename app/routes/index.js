const { Route, GET, POST, PUT, DELETE, ALL, RouteObject } = require("simple-route")
const { auth, token } = require("./../middlewares");

const route = Route.create({
  path: "",
  middlewares: [auth],
  func: (req, res) => { res.send("OK") },
  method: GET,
  childs: [
    {
      path: ":userid",
      func: (req, res) => { res.send(req.params.userid) },
      method: GET
    }
  ]
})

module.exports = {
  route
}