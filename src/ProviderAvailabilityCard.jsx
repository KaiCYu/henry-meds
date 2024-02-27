import { Card } from 'react-bootstrap';
import { differenceInHours } from 'date-fns';

import { useAppContext, GO_HOME_OBJECT } from './AppContext';
import { createTimeslots } from './utils';

import { Timeslot } from './Timeslot';

const ProviderAvailabilityCard = ({ provider }) => {
  const { context, setContext } = useAppContext();
  const { userId, } = context;
  const timeslots = createTimeslots({
    start: provider.startTime,
    end: provider.endTime,
  });

  const handleReserveTimeslot = (start) => {
    if (!userId) {
      return alert('Please enter a client ID');
    }

    provider.unconfirmedReservations.push({
      clientId: userId,
      isAvailable: false,
      isConfirmed: false,
      startTime: start,
      timeReserved: new Date(),
      providerId: provider.providerId,
    });

    setContext({
      ...context,
      ...GO_HOME_OBJECT,
    })
  }

  return (
    <>
      <Card className="p-2 m-2 d-flex">
        <div>
          Provider Id: 
          {provider.providerId}
        </div>

        <div>
          {
            timeslots
              // Only show timeslots farther than 24 hours out
              .filter((timeslot) => {
                return differenceInHours(timeslot, new Date()) >= 24;
              }).map((timeslot) => {
                return (
                  <Timeslot key={timeslot} timeslot={timeslot} onClick={handleReserveTimeslot}/>
                )
            })
          }
        </div>
      </Card> 


    </>
  )
}


export { ProviderAvailabilityCard };