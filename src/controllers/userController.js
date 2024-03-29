import UserSchema from "./../models/UserSchema.js";
import argon2 from "argon2";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserFormValidator from "../validator/UserFormValidator.js";

dotenv.config();

/**
 * Controller Signup => Register user in Database
 * @param req
 * @param res
 */
export const signupController = (req, res) => {
    // Validator data in request body
    const validator = new UserFormValidator(req.body);
    // Hash Password in request POST
    if (validator.valid.success === true) {
        argon2.hash(req.body.password)
            .then(hashPassword => {
                const user = new UserSchema({
                    email: req.body.email,
                    password: hashPassword
                });
                // Insert User in Database MongoDB
                user.save()
                    .then(() => res.status(201).json({ message: "Utilisateur enregistré !"}))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        res.status(422).json({ error: validator.valid.message.toString() });
    }
}

/**
 * Controller Login => Login user exist in Database
 * @param req
 * @param res
 */
export const loginController = (req, res) => {
    // Validator data in request body
    const validator = new UserFormValidator(req.body);

    if (validator.valid.success === true) {
        UserSchema.findOne({ email: req.body.email })
            .then(userInDatabase => {
                if (!userInDatabase) {
                    return res.status(401).json({ message: "Information de connexion invalide !" });
                }
                // Verify HashPassword in database if equal request body password
                argon2.verify(userInDatabase.password, req.body.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: "Information de connexion invalide !" });
                        }

                        // Sign Json Web Token
                        res.status(200).json({
                            userId: userInDatabase._id,
                            token: jwt.sign(
                                { userId: userInDatabase._id },
                                process.env.SECRETJWT,
                                { expiresIn: '24h' }
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        res.status(422).json({ error: validator.valid.message.toString() });
    }
}
