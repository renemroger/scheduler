import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  InterviewerList.prototype = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  const interviewers = props.interviewers.map(interviewer => {
    if (interviewer) {
      return (
        <InterviewerListItem
          key={interviewer.id}
          selected={interviewer.id === props.value}
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={event => props.onChange(interviewer.id)}
        />
      );
    } else {
      return <></>;
    }
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
