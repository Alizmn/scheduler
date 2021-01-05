
 export function getAppointmentsForDay(state, day) {
  const getForDay = state.days.filter((el) => el.name === day)[0]
  if (getForDay) {
    return getForDay.appointments.map((el) => state.appointments[el]);
  } else {
    return [];
  }
  
}
 export function getInterview(state, interview) {
   if (interview) {
     const {student, interviewer} = interview;
     return {student, interviewer: state.interviewers[interviewer]};
   } else {
     return null;
   }
 }

 export function getInterviewersForDay(state, day) {
  const getForDay = state.days.filter((el) => el.name === day)[0]
  if (getForDay) {
    return getForDay.interviewers.map((el) => state.interviewers[el]);
  } else {
    return [];
  }
  
}
