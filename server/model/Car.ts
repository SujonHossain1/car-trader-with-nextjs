import { model, models, Schema } from 'mongoose';

const carSchema = new Schema<ICar>({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        unique: true,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    fuelType: {
        type: String,
    },
    kilometers: {
        type: Number,
    },
    details: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
});

const Car = models.Car || model<ICar>('car', carSchema);
export default Car;
