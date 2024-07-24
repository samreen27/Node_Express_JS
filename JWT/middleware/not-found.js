

const notFoundMiddleware = (req,res) => {
    res.status(404).json({msg: "Page Not found"})
}

module.exports = notFoundMiddleware