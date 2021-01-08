# Interview Scheduler
Scheduler is a single-page application built with React that allows users to book appointments throughout the week within a specified time frame. Users select an empty time slot, enter their name and select the interviewer from those available on a given day. Users can also edit and cancel appointments. The list of days updates the list of remaining interview spots for each day based on user actions.

## Screen Shots

!["Screenshot of Display Appointments"](https://github.com/alizmn/scheduler/blob/master/docs/01.png?raw=true)
!["Screenshot of Edit/Create Appointment Form"](https://github.com/alizmn/scheduler/blob/master/docs/02.png?raw=true)
!["Screenshot of Delete Appointment"](https://github.com/alizmn/scheduler/blob/master/docs/03.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Dependencies

- axios
- classnames
- normalize.css
- react ^16.9.0
- react-dom ^16.9.0
- react-scripts
- jest
- cypress