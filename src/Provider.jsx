
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { find, toNumber } from 'lodash';

import { useAppContext, defaultContext } from './AppContext';

const GO_HOME_OBJECT = {
  userId: undefined, 
  isProvider: false,
  isClient: false,
}

const Provider = () => {
  const [providerId, setProviderId] = useState(undefined);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const { context, setContext } = useAppContext();
  const { providerAvailability } = context;
  const currentProviderAvailability = find(providerAvailability, (p) => p.providerId == providerId) // Be careful here, it could change to a string or number!

  const handleGoBack = () => {
    setContext(defaultContext)
  }

  const saveAvailability = () => {
    if (!currentProviderAvailability) {
      const newProviderAvailability = {
          providerId,
          startTime,
          endTime,
          confirmedReservations: [],
          unconfirmedReservations: [],
        }
      setContext({
        ...GO_HOME_OBJECT,
        // add availability for new provider
        providerAvailability: [...providerAvailability, newProviderAvailability],
      })
    } else {
      const provider = find(providerAvailability, { providerId });
      const updatedAvailability = {
        ...provider,
        startTime,
        endTime,
      };

      setContext({
        ...GO_HOME_OBJECT,
        // update availability for existing provider
        providerAvailability: providerAvailability.map((p) => p.providerId == providerId ? updatedAvailability : p)
      })
    }
  }

  return (
    <div className="provider-container">
        <Button variant="light" onClick={handleGoBack}>Back</Button>
        <Form onSubmit={saveAvailability}>
          <Form.Group controlId="providerId">
            <Form.Label>Provider Id:</Form.Label>
            <Form.Control aria-describedby="provider-id" value={providerId} onChange={(e) => setProviderId(toNumber(e.target.value))} />
          </Form.Group>

          <Form.Group controlId="startTime">
            <Form.Label>When do you want to start your availability?</Form.Label>
            <DatePicker
              selected={startTime}
              onChange={setStartTime}
              showTimeSelect
              dateFormat="Pp"
              minDate={new Date()}
              timeIntervals={15}
            />
          </Form.Group>

          <Form.Group controlId="startTime">
            <Form.Label>When do you want to end your availability?</Form.Label>
              <DatePicker
                selected={endTime}
                onChange={setEndTime}
                showTimeSelect
                dateFormat="Pp"
                minDate={startTime || new Date()}
                timeIntervals={15}
              />
          </Form.Group>

          <Button variant="primary" onClick={saveAvailability}>Confirm</Button>
        </Form>

    </div>
  );
}


export { Provider };
