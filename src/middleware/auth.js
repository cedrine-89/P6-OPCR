import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzNiZTVkOWIzNTI4ZjQ1YzlkNDA1OGEiLCJoYWNrIjp0cnVlLCJpYXQiOjE2NjQ4NzA0MTQsImV4cCI6MTY2NDk1NjgxNH0.lch2OM_mdd95zrVHftuHNfrm5WD0jKXyQbKXrPUyzj0';
// Middleware authenticator
export const auth = (req, res, next) => {
    try {
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
    }

    /*const jwtToken = req.headers.authorization.split(' ')[1];

    jwt.verify(fakeToken, process.env.SECRETJWT, (err, decodedToken) => {
        if (err) {
            //res.status(401).json({ err });

            res.status(301).redirect('/login');
        }
        if (decodedToken) {
            req.auth = {
                userId: decodedToken.userId
            };
            next();
        }
    });*/
}
