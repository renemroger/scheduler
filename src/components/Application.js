import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";

import { getAppointmentsForDay, getInterview } from "helpers/selectors";




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  function bookInterview(id, interview) {


    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
  }

  const setDay = day => setState(prevState => ({ ...prevState, day }));
  const setDays = days => setState(prevState => ({ ...prevState, days }));
  const setAppointments = appointment => setState(prevState => ({ ...prevState, appointment }));

  useEffect(() => {
    const promise1 = axios.get('api/days');
    const promise2 = axios.get('api/appointments');
    const promise3 = axios.get('api/interviewers');

    Promise.all([
      promise1, promise2, promise3
    ]).then((all) => {

      const [days, appointments, interviewers] = all;

      console.log(interviewers.data)
      let interviewersArray = Object.keys(interviewers.data).map((key) => {
        return interviewers.data[key];
      })

      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewersArray
      }));

    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return <Appointment key={appointment.id} interview={interview} appointment={appointment} interviewers={state.interviewers} bookInterview={bookInterview} />;
        })}


      </section>
    </main>
  );
}
