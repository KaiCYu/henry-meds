import { add, roundToNearestMinutes, sub } from 'date-fns';

// Each reservation has this shape:
// {
//   clientId,
//   isAvailable,
//   isConfirmed,
//   startTime,
//   timeReserved,
//   providerId,
// }

const startTime = add(roundToNearestMinutes(new Date(), { roundingMethod: 'ceil', nearestTo: 15 }), {days: 1 });

const mockSchedule = [
  {
    providerId: 1,
    startTime: startTime,
    endTime: add(startTime, { hours: 3 }),
    confirmedReservations: [
      {
        clientId: 5,
        startTime: add(startTime, { minutes: 30 }),
        endTime: add(startTime, { minutes: 45 }),
        isAvailable: false,
        isConfirmed: true,
        providerId: 1,
      },
    ],
    unconfirmedReservations: [
      {
        clientId: 5,
        startTime: add(startTime, { hours: 1, minutes: 30 }),
        endTime: add(startTime, { hours: 1, minutes: 45 }),
        isAvailable: false,
        isConfirmed: false,
        providerId: 1,
        timeReserved: sub(new Date(), { minutes: 5 }),
      },
      {
        clientId: 5,
        startTime: add(startTime, { hours: 1, minutes: 30 }),
        endTime: add(startTime, { hours: 1, minutes: 45 }),
        isAvailable: false,
        isConfirmed: false,
        providerId: 1,
        timeReserved: sub(new Date(), { minutes: 45 }), // should NOT see this one (this is now expired)
      },
    ]
  },
]

export default mockSchedule;  