export interface ICalendar{
    date: string,
    name: string
    type: string
}

export interface UpdateCalendarListProps {
    updateCalendarList: (calendar: ICalendar) => void;
  }