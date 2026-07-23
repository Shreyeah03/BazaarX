import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    author: String,
    rating: Number,
    comment: String,
    date: String,
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    legacyId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    image: { type: String, required: true },
    images: [String],
    description: String,
    sizes: [String],
    trending: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    reviewList: [reviewSchema],
    stock: { type: Number, default: 50 },
  },
  { timestamps: true }
)

productSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, ret) {
    ret.id = ret.legacyId
    delete ret._id
    delete ret.__v
    delete ret.legacyId
    return ret
  },
})

export default mongoose.model('Product', productSchema)
