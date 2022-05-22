module.exports = mongoose => {
    const Product = mongoose.model(
        "product",
        mongoose.Schema(
            {
                name: String,
                price: Number,
                description: String,
                image: String
            },
            { timestamps: true }
        )
    );
    return Product;
}