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

const appointments = {
    "1": {
      "id": 1,
      "time": "12pm",
      "interview": {
        "student": "sfddsfsdf",
        "interviewer": 9
      }
    },
    "2": {
      "id": 2,
      "time": "1pm",
      "interview": null
    },
    "3": {
      "id": 3,
      "time": "2pm",
      "interview": null
    },
    "4": {
      "id": 4,
      "time": "3pm",
      "interview": null
    },
    "5": {
      "id": 5,
      "time": "4pm",
      "interview": null
    },
    "6": {
      "id": 6,
      "time": "12pm",
      "interview": {
        "student": "asdsadsad",
        "interviewer": 10
      }
    },
    "7": {
      "id": 7,
      "time": "1pm",
      "interview": {
        "student": "Jamal Jordan",
        "interviewer": 1
      }
    },
    "8": {
      "id": 8,
      "time": "2pm",
      "interview": {
        "student": "Leopold Silvers",
        "interviewer": 8
      }
    },
    "9": {
      "id": 9,
      "time": "3pm",
      "interview": {
        "student": "asdasdasda",
        "interviewer": 1
      }
    },
    "10": {
      "id": 10,
      "time": "4pm",
      "interview": {
        "student": "Liam Martinez",
        "interviewer": 2
      }
    },
    "11": {
      "id": 11,
      "time": "12pm",
      "interview": {
        "student": "Lydia Miller-Jones",
        "interviewer": 3
      }
    },
    "12": {
      "id": 12,
      "time": "1pm",
      "interview": null
    },
    "13": {
      "id": 13,
      "time": "2pm",
      "interview": null
    },
    "14": {
      "id": 14,
      "time": "3pm",
      "interview": null
    },
    "15": {
      "id": 15,
      "time": "4pm",
      "interview": null
    },
    "16": {
      "id": 16,
      "time": "12pm",
      "interview": null
    },
    "17": {
      "id": 17,
      "time": "1pm",
      "interview": null
    },
    "18": {
      "id": 18,
      "time": "2pm",
      "interview": null
    },
    "19": {
      "id": 19,
      "time": "3pm",
      "interview": null
    },
    "20": {
      "id": 20,
      "time": "4pm",
      "interview": {
        "student": "Michael Chan-Montoya",
        "interviewer": 6
      }
    },
    "21": {
      "id": 21,
      "time": "12pm",
      "interview": {
        "student": "Richard Wong",
        "interviewer": 7
      }
    },
    "22": {
      "id": 22,
      "time": "1pm",
      "interview": {
        "student": "sddsasdas",
        "interviewer": 9
      }
    },
    "23": {
      "id": 23,
      "time": "2pm",
      "interview": null
    },
    "24": {
      "id": 24,
      "time": "3pm",
      "interview": null
    },
    "25": {
      "id": 25,
      "time": "4pm",
      "interview": null
    }
};


const spotModifier = (appointmentId, days, appointments ) => {
  const newSpots = days.find((day) => day.appointments.includes(appointmentId)).appointments.filter((appointment) => (!appointments[appointment].interview)).length;

  return days.map((el) => {
    if (el.id === days.find((day) => (day.appointments.includes(appointmentId))).id) {
      return {...el, spots: newSpots + 1};
    } else {
      return el;
    }
  })
};

console.log(spotModifier(23));