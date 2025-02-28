import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    userProfileImage: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isSubscriber: { type: Boolean, default: false },
    subscriptionDate: { type: Date },
    expiry: { type: Date },
    isActive: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    earnings: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    growth: {
        previousWeekCount: { type: Number, default: 0 },
        growthValue: { type: Number, default: 0 },
        growthPercentage: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now() }
    }
});

//indexing for faster queries
userSchema.index({ email: 1 });
userSchema.index({ userName: 1 });

// Using a pre-save hook to hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Adding a method to compare passwords
userSchema.methods.matchedPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('PlatformUser', userSchema);

