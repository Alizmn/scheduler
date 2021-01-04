import React , { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay,getInterview, getInterviewersForDay} from "../helpers/selectors" 

const axios = require("axios");

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Ali Zamani",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Sepideh ZamanVaziri",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Amin Zamani",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];


export default function Application(props) {

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState ([]);
  // const [appointments, setAppointments]= useState();

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(perv => ({ ...perv, days }));
  // const setAppointments = appointments => setState({ ...state, appointments });
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: {...interview}})
         .then(() => setState((state) => ({...state, appointments})))
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState((state) => ({...state, appointments})))
  };

  const dailyAppointments = getAppointmentsForDay({days: state.days, appointments: state.appointments, interviewers: state.interviewers},state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day)
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  

  useEffect(() => {
    Promise.all([
      axios('http://localhost:8001/api/days'),
      axios('http://localhost:8001/api/appointments'),
      axios('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}))});
  }, []);
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/* {dailyAppointments.map((appointment) => <Appointment key={appointment.id} {...appointment}/>)} */}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
