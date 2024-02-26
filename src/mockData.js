import { add, roundToNearestMinutes } from 'date-fns';

// Each reservation has this shape:
// {
//   clientId,
//   isAvailable,
//   isConfirmed,
//   startTime,
//   endTime,
// }

const startTime = roundToNearestMinutes(new Date(), { roundingMethod: 'ceil', nearestTo: 15 });

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
      },
    ],
    unconfirmedReservations: [
      {
        clientId: 5,
        startTime: add(startTime, { hours: 1, minutes: 30 }),
        endTime: add(startTime, { hours: 1, minutes: 45 }),
        isAvailable: false,
        isConfirmed: false,
      },
    ]
  },
]

export default mockSchedule;