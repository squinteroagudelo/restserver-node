const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
    category: {
        type: String,
        required: [true, "Category is required"],
    },
});

module.exports = model("Category", CategorySchema);