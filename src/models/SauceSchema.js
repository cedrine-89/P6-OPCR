import mongoose from 'mongoose';
import mongooseErrors from 'mongoose-errors';

const schema = {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true }
}
const SauceSchema = new mongoose.Schema(schema,{ versionKey: false });
SauceSchema.plugin(mongooseErrors);

export default mongoose.model('Sauce', SauceSchema);
