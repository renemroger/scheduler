import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = props.days.map(day => (
    <DayListItem
      selected={day.name === props.day}
      key={day.id}
      name={day.name}
      spots={day.spots}
      setDay={props.setDay}
    />
  ));

  return <ul>{days}</ul>;
}
