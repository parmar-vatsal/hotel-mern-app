import mongoose from 'mongoose';

type TPaymentInfo = {
    id: string,
    status: string,
    update_time: Date,
    email_address: string,
}

export interface IBooking {
    room: string,
    user: string,
    checkInDate: Date,
    checkOutDate: Date,
    amountPaid: Number,
    daysOfStay: Number,
    paymentInfo: TPaymentInfo,
    guestName?: string,
    guestEmail?: string,
    guestPhone?: string,
    paidAt: Date,
    createdAt: Date,
    updatedAt: Date
}

const BookingSchema = new mongoose.Schema({

    room: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Room"
    },

    user: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "User"
    },

    checkInDate: {
        type: Date,
        required: true,
    },

    checkOutDate: {
        type: Date,
        required: true,
    },

    amountPaid: {
        type: Number,
        required: true,
    },

    daysOfStay: {
        type: Number,
        required: true,
    },

    paymentInfo: {
      id: { type: String },
      status: { type: String },
      update_time: { type: Date },
      email_address: { type: String },
    },

    guestName: {
        type: String,
        required: false,
    },

    guestEmail: {
        type: String,
        required: false,
    },

    guestPhone: {
        type: String,
        required: false,
    },

    paidAt: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
})

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;