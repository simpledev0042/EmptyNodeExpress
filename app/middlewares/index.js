
const auth = (req, res, next) => {
    console.log("Middleware Auth");
    return next()
}

const token = (req, res, next) => {
    console.log("Middleware token");
    return next()
}

module.exports = {
    auth,
    token
}