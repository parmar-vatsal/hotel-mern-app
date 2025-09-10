import React, { useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getMyBookings, deleteBooking } from '../redux/actions/BookingActions';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const MyBookingsScreen = () => {

  const dispatch = useDispatch();
  const { loggedIn } = useAuthStatus();

  const { myBookings, loading, error } = useSelector((state: RootStateOrAny) => state.BookingsMy);

  const { success: successDelete } = useSelector((state: RootStateOrAny) => state.bookingDelete);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getMyBookings());
    }
  }, [dispatch, loggedIn, successDelete]);
  

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mb-4">My Bookings</h2>
        </Col>
      </Row>
      <Row>
        <Col>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Room</th>
                  <th>Check In </th>
                  <th>Check Out</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {myBookings?.map((book: any) =>
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>
                    {book.room ? (
                      <Link to={`/room/${book.room._id}`}>
                        {book.room.name}
                      </Link>
                    ) : (
                      'Room not found'
                    )}
                  </td>
                  <td>{book.checkInDate ? moment(book.checkInDate as Date).format("LL") : 'N/A'}</td>
                  <td>{book.checkOutDate ? moment(book.checkOutDate as Date).format("LL") : 'N/A'}</td>
                  <td>{book.amountPaid ? `$${book.amountPaid}` : 'N/A'}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this booking?')) {
                          dispatch(deleteBooking(book._id));
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              )}
              </tbody>
            </Table>
            {myBookings && myBookings.length === 0 && <Message variant="info">No bookings found.</Message>}
          </>
          )}
        </Col>
      </Row>
    </Container>
  )
};

export default MyBookingsScreen;
