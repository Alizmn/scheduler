// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };

// const interviews =
// {
//   "1":
//     { "id":1,
//       "name":"Sylvia Palmer",
//       "avatar":"https://i.imgur.com/LpaY82x.png"
//     },
//   "2":
//   {"id":2,
//   "name":"Tori Malcolm",
//   "avatar":"https://i.imgur.com/Nmx0Qxo.png"},
//   "3":
//   {"id":3,
//   "name":"Mildred Nazir",
//   "avatar":"https://i.imgur.com/T2WwVfS.png"},
//   "4":
//   {"id":4,
//   "name":"Cohana Roy",
//   "avatar":"https://i.imgur.com/FK8V841.jpg"},
//   "5":
//   {"id":5,
//   "name":"Sven Jones",
//   "avatar":"https://i.imgur.com/twYrpay.jpg"},
//   "6":
//   {"id":6,
//   "name":"Susan Reynolds",
//   "avatar":"https://i.imgur.com/TdOAdde.jpg"},
//   "7":
//   {"id":7,
//   "name":"Alec Quon",
//   "avatar":"https://i.imgur.com/3tVgsra.jpg"},
//   "8":
//   {"id":8,
//   "name":"Viktor Jain",
//   "avatar":"https://i.imgur.com/iHq8K8Z.jpg"},
//   "9":
//   {"id":9,
//   "name":"Lindsay Chu",
//   "avatar":"https://i.imgur.com/nPywAp1.jpg"},
//   "10":
//   {"id":10,
//   "name":"Samantha Stanic",
//   "avatar":"https://i.imgur.com/okB9WKC.jpg"}}

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

// console.log(getInterview(state, state.appointments["3"].interview));