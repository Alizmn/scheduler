import React from "react";
import useVisualMode from "../../hooks/useVisualMode"

import "./styles.scss";


import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";


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
      .then((res) => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
    
  };
  const deleteWarning = () => {
    transition(CONFIRMING);
  };
  const deleteInterview = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
    
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteWarning}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          />
      )}
      {mode === EDIT && (
        <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          />
      )}
      {mode === SAVING && <Status message="Saving ..." />}
      {mode === DELETING && <Status message="Deleting ..." />}
      {mode === CONFIRMING && <Confirm message="Are you sure? there is no comming back from this action" onCancel={back} onConfirm={deleteInterview} />}
      {(mode === ERROR_DELETE || mode === ERROR_SAVE) && (
        <Error onClose={() => back()}
        message="Oops something went wrong, please try again!" />
      )}


    </article>
  );
};