import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { find, toNumber } from 'lodash';

import { useAppContext } from './AppContext';
import { ProviderAvailabilityCard } from './ProviderAvailabilityCard';
import { Timeslot } from './Timeslot';
import { getUnconfirmedReservations } from './utils';

const Client = ({ handleGoBack }) => {
  const [clientId, setClientId] = useState('')
  const [clientUnconfirmedRes, setClientUnconfirmedRes] = useState([])
  const { context, setContext } = useAppContext();
  const { providerAvailability } = context;

  useEffect(() => {
    if (!providerAvailability.length) {
      return;
    }
    setClientUnconfirmedRes(getUnconfirmedReservations(clientId, providerAvailability));
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
      console.log('res::: ', res)
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
          <>
            Please confirm your reservations
            {
              !!clientId && !!clientUnconfirmedRes.length && (
                clientUnconfirmedRes.map((res) => {
                  return (
                    <div className="d-flex align-items-center">
                      <Timeslot key={res.startTime} timeslot={res.startTime} onClick={() => handleTimeslotClick(res)}/>
                    </div>
                  )
                })
              )
            }
          </>
        }
    
        {
          // filter out confirmed and unconfirmed reservations
          !!clientId && providerAvailability.map((provider) => {
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
