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
            }%, red ${
              ((activeStep + 1) / (steps.length - 1)) * 100
            }%, blue 100%)`, // this is the magic
            height: "1rem",
            width: `${(100 / steps.length) * activeStep}%`, // divide 100 by the number of steps and multiply by the current step
            transition: "width ease-in-out 1s", // cool animation
            borderRadius: ".3rem", // round the edges
            fontSize: "1rem", // match the font size to the height of the bar
            paddingLeft: ".1rem", // just to make it look better
            textAlign: "left", // align the text to the left
            color: "white", // make the text white
            fontWeight: "bold", // make the text bold
          }}
        >
          {isFirstStep
            ? ""
            : `You are ${Math.floor(100 / steps.length) * activeStep}% done!`}
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
