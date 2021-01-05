import {useState, useEffect} from 'react';

const axios = require("axios");

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(perv => ({ ...perv, days }));
  // const setAppointments = appointments => setState({ ...state, appointments });
  
  // const spotModifier = (appointmentId, add = true) => {
  //   const currentSpots = state.days.find((day) => {
  //     day.appointments.includes(appointmentId)
  //   })
  // };

  const spotModifier = (appointmentId, add ) => {
    return state.days.map((el) => {
      if (el.id === state.days.find((day) => (day.appointments.includes(appointmentId))).id) {
        return {...el, spots: el.spots + add};
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
         .then(() => setState((state) => {
           const days = spotModifier(id, -1);
           return {...state, appointments, days}
        }))
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
      .then(() => {
        const days = spotModifier(id, 1);
        return setState((state) => ({...state, appointments, days}))
      })
  };

  useEffect(() => {
    Promise.all([
      axios('http://localhost:8001/api/days'),
      axios('http://localhost:8001/api/appointments'),
      axios('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}))});
  }, []);

  
  // useEffect(() => {

  //   axios('http://localhost:8001/api/days')
  //     .then((res) => {
  //       console.log(res.data[0].spots);
  //       setState(days => ({...days, days: res.data}))
  //     });

  // }, [state.appointments]);

  return {state, setDay, bookInterview, cancelInterview};
};