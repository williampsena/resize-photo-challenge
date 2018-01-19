import { Document } from 'mongoose';

export interface Photo extends Document {
    _id: string;
    image: string;
    url: string;
    small: string;
    medium: string;
    large: string;
}