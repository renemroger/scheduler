import axios from "axios";
import { useEffect, useReducer } from "react";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
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

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const day = state.day;

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, appointments, value: [-1] });
    });
  }

  function removeInterview(interview) {
    const appointments = {
      ...state.appointments
    };

    appointments[interview].interview = null;

    return axios.delete(`/api/appointments/${interview}`).then(() => {
      dispatch({ type: SET_INTERVIEW, interview, appointments, value: [1] });
    });
  }

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([promise1, promise2, promise3]).then(all => {
      const [days, appointments, interviewers] = all;

      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers
      });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    removeInterview
  };
}
