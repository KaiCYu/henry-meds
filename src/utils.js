import { formatDate, isBefore, setHours, setMinutes, setSeconds, addMinutes, setMilliseconds } from 'date-fns'

const createTimeslots = ({ start, end, interval, timeFormat }) => {
    const setTime = (x, h = 0, m = 0, s = 0, ms = 0) => setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h)

    const from = setTime(new Date(), start);
    const to = setTime(new Date(), end);
    const step = (x) => addMinutes(x, interval);
  
    const blocks = [];
  
    let cursor = from;
  
    while (isBefore(cursor, to)) {
      blocks.push(formatDate(cursor, timeFormat));
      cursor = step(cursor);
    }
  
    return blocks;
}


export default createTimeslots;