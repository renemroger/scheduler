import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import { useVisualMode } from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const DELETE = "DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  let startMode;

  if (props.interview) {
    startMode = SHOW;
  } else {
    startMode = EMPTY;
  }
  const mode = useVisualMode(startMode);

  function deleteInterview() {
    mode.transition(DELETE, true);
    props.removeInterview &&
      props
        .removeInterview(props.id)
        .then(() => mode.transition(EMPTY))
        .catch(error => mode.transition(ERROR_DELETE, true));
  }

  function onEdit() {
    mode.transition("EDIT");
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    mode.transition(SAVING);
    props.bookInterview &&
      props
        .bookInterview(props.id, interview)
        .then(() => mode.transition(SHOW))
        .catch(error => mode.transition(ERROR_SAVE, true));
  }

  const onAdd = () => {
    mode.transition("CREATE");
  };

  const onDelete = () => {
    mode.transition("CONFIRMDELETE");
  };

  const onCancel = () => {
    mode.back();
  };

  return (
    <article data-testid="appointment">
      <Header time={props.time} />
      {mode.mode === "EMPTY" && <Empty onAdd={onAdd} />}

      {mode.mode === "CREATE" && (
        <Form
          interviewers={props.interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={onCancel}
        />
      )}

      {mode.mode === "EDIT" && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          value={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={onCancel}
        />
      )}

      {mode.mode === "SAVING" && <Status message={"Saving"} />}

      {mode.mode === "DELETE" && <Status message={"Deleting"} />}

      {mode.mode === "ERROR_DELETE" && (
        <Error message={"ERROR WHILE DELETING"} onClose={onCancel} />
      )}

      {mode.mode === "ERROR_SAVE" && (
        <Error message={"ERROR WHILE SAVING"} onClose={onCancel} />
      )}

      {mode.mode === "CONFIRMDELETE" && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onConfirm={() => deleteInterview()}
          onCancel={onCancel}
        />
      )}

      {mode.mode === "SHOW" && props.interview && (
        <Show
          onDelete={() => onDelete()}
          onEdit={() => onEdit()}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
}
