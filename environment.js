module.exports = {
    config: {
        MONGO_USERNAME: process.env.MONGO_USERNAME || "admin",
        MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
        MONGO_CLUSTER: process.env.MONGO_CLUSTER || "localhost",
        MONGO_DATABASE: process.env.MONGO_DATABASE || "test",
        MONGO_COLLECTION: process.env.MONGO_COLLECTION || "test",
        PORT: process.env.PORT || 4200,
        CERTIFICATE_URL: process.env.CERTIFICATE_URL || "assets/certificate.pdf",
        APPWRITE_URL: process.env.APPWRITE_URL || "http://localhost",
        APPWRITE_PROJECTID: process.env.APPWRITE_PROJECTID || "63ce0b5c67186021e6e1",
        APPWRITE_SECRET: process.env.APPWRITE_SECRET || "your-secret-key",
        APPWRITE_DATABASE: process.env.APPWRITE_DATABASE || "63ce0b9bcaa3a8554018",
        APPWRITE_EVENTCOLLECTIONID: process.env.APPWRITE_EVENTCOLLECTIONID || "63ce219d78997997e9a6",
        APPWRITE_USERCOLLECTIONID: process.env.APPWRITE_USERCOLLECTIONID || "63ce0e0b5505a6c98a09",
        APPWRITE_STORAGEBUCKETID: process.env.STORAGEBUCKETID || "63ce43f6bbf308c07149",

    }
}