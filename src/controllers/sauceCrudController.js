import SauceSchema from "./../models/SauceSchema.js";
import {Query} from "mongoose";

export const createSauce = (req, res, next) => {
    const saucePost = JSON.parse(req.body.sauce);
    delete saucePost.userId;

    // TODO Create rename special character
    const sauce = new SauceSchema({
        ...saucePost,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        userId: req.auth.userId
    });

    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée !"}))
        .catch(error => res.status(400).json({ error }));
}

export const readSauce = (req, res, next) => {
    SauceSchema.findOne({ _id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(404).json({ error }));
}

export const readAllSauce = (req, res, next) => {
    SauceSchema.find()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(404).json({ error }));
}

export const updateSauce = (req, res, next) => {
    let body = {};

    if (req.file) {
        body = JSON.parse(req.body.sauce);
        body.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else {
        body = req.body;
    }

    SauceSchema.updateOne({ _id: req.params.id }, { ...body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce modifiée !"}))
        .catch(error => res.status(404).json({ error }));
}

export const deleteSauce = (req, res) => {
    SauceSchema.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée !"}))
        .catch(error => res.status(404).json({ error }));
}