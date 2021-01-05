const days = [
  {
    "id": 1,
    "name": "Monday",
    "appointments": [
      1,
      2,
      3,
      4,
      5
    ],
    "interviewers": [
      1,
      3,
      4,
      7,
      9
    ],
    "spots": 3
  },
  {
    "id": 2,
    "name": "Tuesday",
    "appointments": [
      6,
      7,
      8,
      9,
      10
    ],
    "interviewers": [
      1,
      2,
      8,
      9,
      10
    ],
    "spots": 2
  },
  {
    "id": 3,
    "name": "Wednesday",
    "appointments": [
      11,
      12,
      13,
      14,
      15
    ],
    "interviewers": [
      2,
      3,
      4,
      5,
      9
    ],
    "spots": 3
  },
  {
    "id": 4,
    "name": "Thursday",
    "appointments": [
      16,
      17,
      18,
      19,
      20
    ],
    "interviewers": [
      1,
      2,
      6,
      8,
      10
    ],
    "spots": 4
  },
  {
    "id": 5,
    "name": "Friday",
    "appointments": [
      21,
      22,
      23,
      24,
      25
    ],
    "interviewers": [
      3,
      6,
      7,
      8,
      9
    ],
    "spots": 3
  }
];
const spotModifier = (appointmentId, add ) => {
  return days.map((el) => {
    if (el.id === days.find((day) => (day.appointments.includes(appointmentId))).id) {
      return {...el, spots: el.spots + add};
    } else {
      return el;
    }
  })
};

console.log(spotModifier(1,1));