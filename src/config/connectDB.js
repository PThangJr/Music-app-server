
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log('Connect mongoDB Atlas successfully ✔')
    } catch (error) {
        console.log('MongoDB has Errors :', error)
    }
}
exports.connectDB = connectDB;