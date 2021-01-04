import React from "react";
import useVisualMode from "../../hooks/useVisualMode"

import "./styles.scss";


import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student : name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    
  };
  const deleteWarning = () => {
    transition(CONFIRMING);
  };
  const deleteInterview = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
    
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          // onDelete={deleteInterview}
          onDelete={deleteWarning}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          />
      )}
      {mode === SAVING && <Status message="Saving ..." />}
      {mode === DELETING && <Status message="Deleting ..." />}
      {mode === CONFIRMING && <Confirm message="Are you sure? there is no comming back from this action" onCancel={back} onConfirm={deleteInterview} />}


    </article>
  );
};