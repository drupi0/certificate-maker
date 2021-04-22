module.exports = {
    config: {
        MONGO_USERNAME: process.env.MONGO_USERNAME || "admin",
        MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
        MONGO_CLUSTER: process.env.MONGO_CLUSTER || "localhost",
        MONGO_DATABASE: process.env.MONGO_DATABASE || "test",
        MONGO_COLLECTION: process.env.MONGO_COLLECTION || "test",
        PORT: process.env.PORT || 4200,
        CERTIFICATE_URL: process.env.CERTIFICATE_URL || "assets/certificate.pdf"
    }
}