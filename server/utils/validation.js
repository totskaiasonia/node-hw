
export default (req, res, next) => {
    try {
        if (!req.query.firstname || !req.query.lastname)
            throw new Error("Empty field");
    } catch (e) {
        return res.status(400).json({
            message: "Bad request"
        });
    }
    next();
}