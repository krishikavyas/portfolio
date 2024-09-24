import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }, 
});

CategorySchema.methods.incrementCount = function() {
  console.log("INcrement called", this.count)
  this.count += 1;
  return this.save();
};

CategorySchema.methods.decrementCount = function() {
  console.log("decrement called", this.count)
  if (this.count > 0) {
    this.count -= 1;
    return this.save();
  }
};

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
