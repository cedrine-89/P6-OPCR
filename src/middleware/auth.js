import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware authenticator
export const auth = (req, res, next) => {
    /*try {
        // Intercept Header send Authorization
        const jwtToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(jwtToken, process.env.SECRETJWT);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }*/

    const jwtToken = req.headers.authorization.split(' ')[1];

    jwt.verify(jwtToken, process.env.SECRETJWT, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ err });
            res.redirect('/');
        }
        if (decodedToken) {
            req.auth = {
                userId: decodedToken.userId
            };
            next();
        }
    });
}
