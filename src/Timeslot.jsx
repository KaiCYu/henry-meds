import { Button } from 'react-bootstrap';
import { format } from 'date-fns';

const Timeslot = ({ timeslot, onClick }) => {
  return (
    <Button onClick={() => onClick(timeslot)} className="d-flex bg-primary p-2 rounded m-2 text-light border-0">
      {format(timeslot, 'MM/dd/yyyy HH:mm')}
    </Button>
  )
}

export { Timeslot }