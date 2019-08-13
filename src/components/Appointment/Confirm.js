import React from "react";

import "components/Appointment/styles.scss";
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section class="appointment__actions">
        <Button
          danger
          onClick={() => {
            props.tra("onCancel Callback");
          }}
        >
          Cancel
        </Button>
        <Button
          danger
          onClick={() => {
            props.onConfirm("onConfirm Callback");
          }}
        >
          Confirm
        </Button>
      </section>
    </main>
  );
}
