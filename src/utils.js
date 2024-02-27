import { isBefore, add } from 'date-fns'

const createTimeslots = ({ start, end, interval = 15 }) => {
    const step = (x) => add(x, { minutes: interval });
    const blocks = [];
  
    let cursor = start;
  
    while (isBefore(cursor, end)) {
      blocks.push(cursor);
      cursor = step(cursor);
    }
  
    return blocks;
}

// TODO: format the array of timeslots by day as key, and sort
const formatTimeslots = (timeslots) => {
}

// Would ideally be provided by API
const getUnconfirmedReservations = (clientId, providerAvailability = []) => {
  if (!clientId) {
    return [];
  }

  const unconfirmed = [];
  providerAvailability.forEach(provider => {
    provider.unconfirmedReservations.forEach((reservation => {
      if (reservation.clientId === clientId) {
        unconfirmed.push(reservation)
      }
    }))
  })
  return unconfirmed;
}

export { createTimeslots, formatTimeslots, getUnconfirmedReservations };