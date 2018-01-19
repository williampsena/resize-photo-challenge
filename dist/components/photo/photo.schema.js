"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.PhotoSchema = new mongoose.Schema({
    _id: String,
    image: String,
    url: String,
    small: String,
    medium: String,
    large: String,
});
//# sourceMappingURL=photo.schema.js.map