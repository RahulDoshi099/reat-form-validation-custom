import { useState } from "react";
import useInput from "./hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset:resetNameInput
  } = useInput(value => value.trim() !== "");

  
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setenteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } 

  
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };


  const emailInputBlurHandler = (event) => {
    setenteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }
    console.log(enteredName, enteredEmail);

    resetNameInput();

    setEnteredEmail("");
    setenteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name"> Your Name </label>
        <input
          type="text"
          id="name"
          onBlur={nameBlurHandler}
          onChange={nameChangedHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text"> Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email"> Your E-mail</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Please enter valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
