import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { createBooking } from '../redux/actions/BookingActions';
import { CHECK_ROOM_BOOKING_RESET, CREATE_BOOKING_RESET } from '../redux/constants/BookingConstants';
import { useParams } from 'react-router-dom';
import { IRoom } from '../interfaces/IRoom';
import { IBooking } from '../interfaces/IBooking';
import Message from './Message';
import Loader from './Loader';

interface BookingFormProps {
    room: IRoom;
    checkInDate: Date | undefined;
    checkOutDate: Date | undefined;
    daysOfStay: number;
    onBookingSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    onBookingSuccess
}) => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin);

    const [guestName, setGuestName] = useState(userInfo?.name || '');
    const [guestEmail, setGuestEmail] = useState(userInfo?.email || '');
    const [guestPhone, setGuestPhone] = useState(userInfo?.phone || '');
    const [specialRequests, setSpecialRequests] = useState('');

    const { loading: loadingBookingCreate, success: successBookingCreate, error: errorBookingCreate }
        = useSelector((state: RootStateOrAny) => state.bookingCreate);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!guestName || !guestEmail || !guestPhone) {
            alert('Please fill in all required fields');
            return;
        }

        const amountPaid = Number(room.pricePerNight) * Number(daysOfStay);

        const bookingData = {
            room: id,
            checkInDate,
            checkOutDate,
            amountPaid,
            daysOfStay,
            paymentInfo: {
                id: `guest-${Date.now()}`,
                status: 'COMPLETED',
                update_time: new Date(),
                email_address: guestEmail
            },
            guestName,
            guestEmail,
            guestPhone
        };

        dispatch(createBooking(bookingData));
    };

    React.useEffect(() => {
        if (successBookingCreate) {
            onBookingSuccess();
            dispatch({ type: CHECK_ROOM_BOOKING_RESET });
            dispatch({ type: CREATE_BOOKING_RESET });
        }
    }, [successBookingCreate, dispatch, onBookingSuccess]);

    return (
        <div>
            <h5>Guest Information</h5>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control
                                type="text"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                required
                                disabled={!!userInfo}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                                type="email"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                required
                                disabled={!!userInfo}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Special Requests (Optional)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any special requests or notes..."
                    />
                </Form.Group>

                <div className="mb-3">
                    <strong>Booking Summary:</strong><br />
                    Room: {room.name}<br />
                    Check-in: {checkInDate?.toLocaleDateString()}<br />
                    Check-out: {checkOutDate?.toLocaleDateString()}<br />
                    Nights: {daysOfStay}<br />
                    Total: ${Number(room.pricePerNight) * Number(daysOfStay)}
                </div>

                {errorBookingCreate && (
                    <Message variant="danger">{errorBookingCreate}</Message>
                )}

                <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className="w-100"
                    disabled={loadingBookingCreate}
                >
                    {loadingBookingCreate ? <Loader /> : `Confirm Booking - $${Number(room.pricePerNight) * Number(daysOfStay)}`}
                </Button>
            </Form>
        </div>
    );
};

export default BookingForm;
