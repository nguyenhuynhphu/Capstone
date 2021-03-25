import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const myEventsList = [
  {
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    title:
      'DTS STARTDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSS',
    start: new Date(2020, 12, 13, 0, 0, 0),
    end: new Date(2020, 12, 20, 0, 0, 0),
  },
  {
    title:
      'DTS STARTDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSS',
    start: new Date(2020, 12, 13, 0, 0, 0),
    end: new Date(2020, 12, 20, 0, 0, 0),
  },
  {
    title:
      'DTS STARTDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSS',
    start: new Date(2020, 12, 13, 0, 0, 0),
    end: new Date(2020, 12, 20, 0, 0, 0),
  },
  {
    title:
      'DTS STARTDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSS',
    start: new Date(2020, 12, 13, 0, 0, 0),
    end: new Date(2020, 12, 20, 0, 0, 0),
  },
  {
    title:
      'DTS STARTDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSDTS STARTSS',
    start: new Date(2020, 12, 13, 0, 0, 0),
    end: new Date(2020, 12, 20, 0, 0, 0),
  },
];
interface MyCalendarProps{
  selectedDate: any
}
interface MyCalendarState{
  
}
class MyCalendar extends React.Component<MyCalendarProps, MyCalendarState> {
  constructor(props: any){
    super(props);
    
  }
  render() {

    return (
      <div className={'myCalendar'}>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          views={{month: true}}
          date={this.props.selectedDate}
          onNavigate={(date: any) => alert(date)}
          navigate={new Date(2021, 1, 30)}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    );
  }
}
export default MyCalendar;
