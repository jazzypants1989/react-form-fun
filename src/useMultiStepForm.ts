import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const [activeStep, setActiveStep] = useState(0);

  function forward() {
    setActiveStep((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function previous() {
    setActiveStep((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goToStep(step: number) {
    setActiveStep(step);
  }

  return {
    activeStep,
    steps,
    step: steps[activeStep],
    goToStep,
    forward,
    previous,
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === steps.length - 1,
  };
}
