import UserSchema from "../models/UserSchema.js";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';

export const signupController = (req, res, next) => {
    argon2.hash(req.body.password)
        .then(hashPassword => {
            const user = new UserSchema({
                email: req.body.email,
                password: hashPassword
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur enregistré !"}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    res.status(200).json({status: true});
}

export const loginController = (req, res, next) => {
    UserSchema.findOne({ email: req.body.email })
        .then(userInDatabase => {
            if (!userInDatabase) {
                return res.status(401).json({ message: "Information de connexion invalide !" })
            }

            argon2.verify(userInDatabase.password, req.body.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "Information de connexion invalide !" })
                    }

                    res.status(200).json({
                        userId: userInDatabase._id,
                        // TODO Create JWT
                        token: jwt.sign(
                            { userId: userInDatabase._id },
                            '/*\\_!SECRET_PASSWORD_FOR_JSONWEBTOKEN_FOR_PIIQUANTE_!/*\\',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch();
        })
        .catch(error => res.status(500).json({ error }));
}
