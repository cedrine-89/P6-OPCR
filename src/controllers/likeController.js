import SauceSchema from "./../models/SauceSchema.js";

/**
 * Like userId
 * @param id
 * @param like
 * @param userId
 * @return { Promise }
 */
async function like(id, like, userId) {
    return SauceSchema.updateOne({ _id: id }, { $inc: { likes: like }, $push: { usersLiked: userId }, _id: id });
}

/**
 * DisLike userID
 * @param id
 * @param like
 * @param userId
 * @return { Promise }
 */
async function disLike(id, like, userId) {
    return SauceSchema.updateOne({ _id: id }, { $inc: { dislikes: like }, $push: { usersDisliked: userId }, _id: id });
}

/**
 * Delete Like userId
 * @param id
 * @param like
 * @param userId
 * @return { Promise }
 */
async function deleteLike(id, like, userId) {
    return SauceSchema.updateOne({ _id: id }, { $inc: { likes: like }, $pull: { usersLiked: userId }, _id: id });
}

/**
 * Delete disLike userId
 * @param id
 * @param like
 * @param userId
 * @return { Promise }
 */
async function deleteDisLike(id, like, userId) {
    return SauceSchema.updateOne({_id: id}, { $inc: { dislikes: like }, $pull: { usersDisliked: userId }, _id: id });
}

/**
 * Controller LikeSauce
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const likeSauce = async (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;
    const sauceDB = await SauceSchema.findOne({ _id: id });
    // Array userLiked
    const usersLiked = sauceDB.usersLiked;
    // Array usersDisliked
    const usersDisliked = sauceDB.usersDisliked;

    switch (req.body.like) {
        case 0:
            // Valid delete Like
            if (usersLiked.find(user => user === userId)) {
                await deleteLike(id, -1, userId);
            }
            // Valid delete DisLike
            if (usersDisliked.find(user => user === userId)) {
                await deleteDisLike(id, -1, userId);
            }
            break;
        case 1:
            await like(id, 1, userId);
            break;
        case -1:
            await disLike(id, 1, userId);
            break;
    }
    res.status(200).json({ message: "Sauce update" })
}
