import mongoose from 'mongoose';
import mongooseErrors from 'mongoose-errors';
import uniqValidator from 'mongoose-unique-validator';

const schema = {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}
const UserSchema = new mongoose.Schema(schema,{ versionKey: false });

UserSchema.plugin(mongooseErrors);
UserSchema.plugin(uniqValidator);

export default mongoose.model('User', UserSchema);
