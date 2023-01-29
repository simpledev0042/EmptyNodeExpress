

const auth = (req, res, next) => {
    console.log(req)
    return next()
}

module.exports =  {
    auth
}