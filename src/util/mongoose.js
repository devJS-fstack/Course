

module.exports = {
    mutipleMongooseToObject: (mongooseArrs) => {
        return mongooseArrs.map((mongooseArr) => mongooseArr.toObject()
        );
    },
    mongooseToObject: (mongoose) => {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};