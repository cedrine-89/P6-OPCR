import SauceSchema from "../models/SauceSchema.js";

export const createSauce = (req, res, next) => {
    console.log(req.body)
    const saucePost = JSON.parse(req.body.sauce);
    delete saucePost.userId;

    // TODO Create imageUrl with data send req.body
    // TODO Create rename special character
    const sauce = new SauceSchema({
        ...saucePost,
        imageUrl: 'http://test',
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        userId: req.auth.userId
    });

    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée !"}))
        .catch(error => res.status(400).json({ message: error }));
}

export const readSauce = (req, res, next) => {
    const sauces = SauceSchema.find({})
        .then(data => res.status(200).json(data))
        .catch(error => res.status(404).json({ message: error }));
}
