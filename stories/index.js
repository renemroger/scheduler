import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";

import Appointment from "components/Appointment/index";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Header from "components/Appointment/Header";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0
  }
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={action("setInterviewer")}
    />
  ));

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "5pm",
    interview: {
      student: "Jone-Jones",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action("setInterviewer")}
    />
  ));

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("callback")} mode={"EMPTY"} />)
  .add("Show", () => (
    <Show
      mode={"SHOW"}
      student="Lydia Miller-Jones"
      interviewer={{
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }}
      onEdit={action("callback")}
      onDelete={action("callback")}
    />
  ))
  .add("Confirm", () => (
    <Confirm
      message={"Delete the appointment?"}
      onCancel={action("callback")}
      onConfirm={action("callback")}
    />
  ))
  .add("Error", () => (
    <Error
      message={"Could not delete appointment"}
      onClose={action("callback")}
    />
  ))
  .add("Status", () => <Status message={"Deleting"} />)

  .add("CREATE", () => (
    <Form
      name={""}
      interviewers={interviewers}
      value={0}
      onSave={action("setInterviewer")}
      onCancel={action("setInterviewer")}
    />
  ))
  .add("EDIT", () => (
    <Form
      name={"Some Random Name"}
      interviewers={interviewers}
      interviewer={2}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Appointment Empty", () => (
    <React.Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </React.Fragment>
  ))
  .add("First Appointment Booked", () => (
    <>
      <Appointment id={appointments[0].id} time={appointments[0].time} />
      <Appointment id="last" time="1pm" />
    </>
  ))
  .add("Second Appointment Booked", () => (
    <>
      <Appointment
        id={appointments[1].id}
        time={appointments[1].time}
        interview={{
          student: appointments[1].interview.student,
          interviewer: appointments[1].interview.interviewer
        }}
      />
      <Appointment id="last" time="1pm" />
    </>
  ))
  .add("Third Appointment Booked", () => (
    <>
      <Appointment
        id={appointments[2].id}
        time={appointments[2].time}
        interview={{
          student: appointments[2].interview.student,
          interviewer: appointments[2].interview.interviewer
        }}
      />
      <Appointment id="last" time="1pm" />
    </>
  ))
  .add("Fourth Appointment Booked", () => (
    <>
      <Appointment
        key={appointments[3].id}
        id={appointments[3].id}
        time={appointments[3].time}
        interview={{
          student: appointments[3].interview.student,
          interviewer: appointments[3].interview.interviewer
        }}
      />
      <Appointment id="last" time="1pm" />
    </>
  ));
