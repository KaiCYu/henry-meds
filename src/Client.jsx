import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { find, toNumber } from 'lodash';

import { useAppContext } from './AppContext';
import { ProviderAvailabilityCard } from './ProviderAvailabilityCard';
import { Timeslot } from './Timeslot';
import { getConfirmedReservations, getUnconfirmedReservations } from './utils';

const Client = ({ handleGoBack }) => {
  const [clientId, setClientId] = useState('')
  const [clientUnconfirmedRes, setClientUnconfirmedRes] = useState([])
  const [clientConfirmedRes, setClientConfirmedRes] = useState([])
  const { context, setContext } = useAppContext();
  const { providerAvailability } = context;

  useEffect(() => {
    if (!providerAvailability.length) {
      return;
    }
    setClientUnconfirmedRes(getUnconfirmedReservations(clientId, providerAvailability));
    setClientConfirmedRes(getConfirmedReservations(clientId, providerAvailability))
  }, [clientId, providerAvailability]);

  const handleOnUserChange = (e) => {
    const userId = toNumber(e.target.value);
    setClientId(userId)
    setContext({
      ...context,
      userId,
      isClient: true,
      isProvider: false,
    })
  }

  const handleTimeslotClick = (res) => {
    // TODO: Use an actual confirmation modal
    if (window.confirm('Are you sure you want to confirm this reservation?') === true) {

      // TODO: move this out to a util
      // remove the res from unconfirmed, add to confirmed for the provider
      res.isConfirmed = true;

      const provider = find(providerAvailability, { providerId: res.providerId });

      const updatedAvailability = {
        ...provider,
        confirmedReservations: [...provider.confirmedReservations, res],
        unconfirmedReservations: provider.unconfirmedReservations.filter(unconfirmed => unconfirmed.startTime !== res.startTime),
      };

      setContext({
        ...context,
        providerAvailability: providerAvailability.map((p) => p.providerId == res.providerId ? updatedAvailability : p)
      })
    } 
  }

  return (
    <div className="client-container">
      <Button className="d-flex justify-content-start" variant="light" onClick={handleGoBack}>Back</Button>

      <div>
        <Form.Group controlId="clientId" className="d-inline">
          <Form.Label>Client Id:</Form.Label>
          <Form.Control aria-describedby="client-id" value={clientId || ''} onChange={handleOnUserChange} />
        </Form.Group>
      
        {
          !!clientId && clientConfirmedRes.length ? (
            <div>
              Your confirmed reservations!
              {
                clientConfirmedRes
                  .map((res) => {
                    return (
                      <div className="d-flex align-items-center">
                        <Timeslot key={res.startTime} timeslot={res.startTime} onClick={() => {
                          // Intentionally empty
                        }}/>
                      </div>
                    )
                  })
                }
            </div>
          ) : null
        }
      
        {
          !!clientId && clientUnconfirmedRes.length ?  (
            <div>
              Please confirm your reservations
              {
                  clientUnconfirmedRes
                    .map((res) => {
                      return (
                        <div className="d-flex align-items-center">
                          <Timeslot key={res.startTime} timeslot={res.startTime} onClick={() => handleTimeslotClick(res)}/>
                        </div>
                      )
                    })
                  }
            </div>
          ) : null
        }

        {
          !!clientId && providerAvailability
            .map((provider) => {
              return (
                <ProviderAvailabilityCard key={`provider-${provider.providerId}`} provider={provider} />
              )
            })
        }
      </div>

    </div>
  );
}

export { Client };
