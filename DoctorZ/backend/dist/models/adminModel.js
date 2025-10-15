import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
// 2. Define the schema
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// 3. Password hash before saving
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (err) {
        next(err);
    }
});
// 4. Add instance method to compare password
AdminSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
// 5. Create and export the model
const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
//# sourceMappingURL=adminModel.js.map