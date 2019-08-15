import React from "react";

import "components/Appointment/styles.scss";
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button
          danger
          onClick={() => {
            props.onCancel("onCancel Callback");
          }}
        >
          Cancel
        </Button>
        <Button
          data-testid="confirm-button"
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
