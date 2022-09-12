import mongoose from 'mongoose';
import mongooseErrors from 'mongoose-errors';
import uniqValidator from 'mongoose-unique-validator';

const schema = {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true }
}
const SauceSchema = new mongoose.Schema(schema,{ versionKey: false });
SauceSchema.plugin(mongooseErrors);
SauceSchema.plugin(uniqValidator);

export default mongoose.model('Sauce', SauceSchema);
