import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import { useVisualMode } from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";


export default function Appointment(props) {
  function save(name, interviewerId) {

    const interview = {
      student: name,
      interviewer: interviewerId
    };
    props.bookInterview(interview.student, interview.interviewer)
    mode.transition('SHOW');
  }
  let startMode;

  if (props.interview) {
    startMode = SHOW
  } else {
    startMode = EMPTY
  }
  const mode = useVisualMode(startMode);

  const onAdd = () => {
    mode.transition('CREATE');
  }

  const onCancel = () => {
    mode.back();
  }


  return (
    <React.Fragment>
      <Header time={props.time} />
      {mode.mode === "EMPTY" && <Empty onAdd={onAdd} />}


      {mode.mode === "CREATE" && <Form
        name={""}
        interviewers={props.interviewers}
        value={0}
        onSave={save}
        onCancel={onCancel}
      />}


      {mode.mode === "SHOW" && (
        < Show

          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </React.Fragment>
  );
}
