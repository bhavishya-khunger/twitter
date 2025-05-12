import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: 'Authentication failed',
                success: false,
            })
        }
        const decodedVersion = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decodedVersion.payload.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;