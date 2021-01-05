import {useState, useEffect} from 'react';
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState({ ...state, day });  

  const spotModifier = (appointmentId, days, appointments ) => {
    const newSpots = days.find((day) => day.appointments.includes(appointmentId)).appointments.filter((appointment) => (!appointments[appointment].interview)).length;
  
    return days.map((el) => {
      if (el.id === days.find((day) => (day.appointments.includes(appointmentId))).id) {
        return {...el, spots: newSpots };
      } else {
        return el;
      }
    })
  };

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
         .then(() => setState(state => ({...state, appointments})))
         .then(() => setState(state => ({...state, days: spotModifier(id, state.days, state.appointments)})));
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
    .then(() => setState(state => ({...state, appointments})))
    .then(() => setState(state => ({...state, days: spotModifier(id, state.days, state.appointments)})));
  };

  useEffect(() => {
    Promise.all([
      axios('http://localhost:8001/api/days'),
      axios('http://localhost:8001/api/appointments'),
      axios('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}))});
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
};