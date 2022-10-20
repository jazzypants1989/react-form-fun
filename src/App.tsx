import { FormEvent, useState } from "react";
import { AccountForm } from "./AccountForm";
import { AddressForm } from "./AddressForm";
import { FormWrapper } from "./FormWrapper";
import { useMultiStepForm } from "./useMultiStepForm";
import { UserForm } from "./UserForm";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const {
    steps,
    activeStep,
    step,
    forward,
    previous,
    isFirstStep,
    isLastStep,
    goToStep,
  } = useMultiStepForm([
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />,
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      forward();
    } else {
      alert("Check the Console ♥");
      console.table(data);
    }
  }
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
      }}
    >
      <form onSubmit={onSubmit}>
        <div
          style={{
            position: "absolute",
            top: ".5rem",
            right: ".5rem",
            fontSize: "1.5rem",
          }}
        >
          {activeStep + 1}/{steps.length}
        </div>
        <div
          className="progressbar"
          style={{
            background: `linear-gradient(to right, blue 0%, red ${
              ((activeStep + 1) / (steps.length - 1)) * 100
            }%, blue ${
              ((activeStep + 1) / (steps.length - 1)) * 100
            }%, red 100%)`, // this is the magic
            height: ".8rem",
            width: `${(98 / (steps.length - 1)) * activeStep}%`, // Full bar is 98% because the user hasn't finished the form until they submit it on the last step
            transition: "width ease-in-out .2s", // cool animation
            borderRadius: ".3rem", // round the edges
            fontSize: ".8rem", // match the font size to the height of the bar
            paddingLeft: ".1rem", // just to make it look better
          }}
        >
          {isFirstStep
            ? "0%"
            : `You are ${
                (98 / (steps.length - 1)) * activeStep
              }% of the way there!`}
        </div>
        {step}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button onClick={previous} type="button">
              Previous
            </button>
          )}
          {
            <button type="submit">
              {!isLastStep ? "Forward" : "Yay, we're done!"}
            </button>
          }
        </div>
      </form>
    </div>
  );
}

export default App;
