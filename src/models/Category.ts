import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }]
})

export default mongoose.model('Category', categorySchema)