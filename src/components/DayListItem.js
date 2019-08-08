import React from "react";

import "components/DayListItem.scss";
const classnames = require("classnames");

/*
name:String the name of the day
spots:Number the number of spots remaining
selected:Boolean true or false declaring that this day is selected
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
*/

const formatSpots = function(spots) {
  if (!spots) {
    return "no spots remaining";
  } else if (spots === 1) {
    return `1 spot remaining`;
  } else {
    return `${spots} spots remaining`;
  }
};

export default function DayListItem(props) {
  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li
      onClick={() => {
        props.setDay(props.name);
      }}
      className={dayListItemClass}
      selected={props.selected}
    >
      <h2>{props.name}</h2>
      <p>{formatSpots(props.spots)}</p>
    </li>
  );
}
