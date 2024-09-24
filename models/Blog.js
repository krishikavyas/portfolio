import mongoose from "mongoose";
import Category from "./Category"; 

const BlogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  img: { type: String, default: "https://placehold.co/1200x600" },
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, required: true },
    canonical: { 
      type: String, 
      default: function() {
        return this.slug; 
      }
    },
  },
  date: { type: String, default: () => new Date().toISOString() },
  isArchived: { type: Boolean, default: false },
  category: { type: String, ref: 'Category', required: true },
});

BlogSchema.pre('save', async function(next) {
  console.log("Blog preee")

  const categoryName = this.category.toUpperCase(); 

  if (this.isNew) {
    console.log("ISNIDE IS NEW")

    let category = await Category.findOne({ name: categoryName });
    console.log({category})

    if (!category) {
      category = new Category({ name: categoryName, count: 1 });
      await category.save();
    } else category.incrementCount()
  } else {
    console.log("ISNIDE IS OLD")

    const category = await Category.findOne({name: categoryName});

    if (!category) return next()

    if(this.isArchived){
      if (category.count === 1) await Category.findOneAndDelete({name: categoryName})
      else await category.decrementCount();
    } else {
      await category.incrementCount();
    }
  }
  next();
});


export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
