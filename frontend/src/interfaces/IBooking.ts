import { IRoom } from "./IRoom"

export interface ICreateBooking {
    room: IRoom["_id"] | undefined,
    checkInDate: Date | undefined,
    checkOutDate: Date | undefined,
    amountPaid: number,
    paymentInfo: {} | null,
    daysOfStay: number,
    guestName?: string,
    guestEmail?: string,
    guestPhone?: string,
}

export interface IBooking extends ICreateBooking {
    _id: string
}

export type TMyBookings = Pick<IBooking, "_id" | "checkInDate" | "checkOutDate" | "amountPaid" >