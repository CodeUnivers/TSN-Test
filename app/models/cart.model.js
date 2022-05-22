module.exports = mongoose => {
    const Cart = mongoose.model(
        "cart",
        mongoose.Schema(
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                kindProduct: String,
                size: String,
                userId: String
            },
            { timestamps: true }
        )
    );
    return Cart;
}