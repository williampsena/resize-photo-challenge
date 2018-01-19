import * as mongoose from 'mongoose';

export const PhotoSchema = new mongoose.Schema({
    _id: String,
    image: String,
    url: String,
    small: String,
    medium: String,
    large: String,
});