const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      const day = action.day;
      return {
        ...state,
        day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days.data,
        appointments: action.appointments.data,
        interviewers: action.interviewers.data
      };
    case SET_INTERVIEW: {
      const appointments = action.appointments;
      const interview = action.interview;

      const newDay = state.days.map(day => {
        if (state.day === day.name) {
          return {
            ...day,
            spots: day.spots + action.value[0]
          };
        } else {
          return day;
        }
      });

      return {
        ...state,
        appointments,
        interview,
        days: newDay
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
