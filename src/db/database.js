import mongoose from 'mongoose';

export default async function dbConnect() {
    await mongoose.connect('mongodb+srv://Cedrine:Cedrine@cluster0.jurl0az.mongodb.net/Piiquante?retryWrites=true&w=majority');
}
