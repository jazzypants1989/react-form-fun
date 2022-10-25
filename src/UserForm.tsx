import { FormWrapper } from "./FormWrapper";

type userData = {
  firstName: string;
  lastName: string;
  age: string;
};
type UserFormProps = userData & {
  updateFields: (fields: Partial<userData>) => void;
};

export function UserForm({
  firstName,
  lastName,
  age,
  updateFields,
}: UserFormProps) {
  return (
    <FormWrapper title="User Details">
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        value={firstName}
        placeholder="Jazzy"
        autoFocus
        required
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        value={lastName}
        placeholder="Pants"
        required
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <label htmlFor="age">Age</label>
      <input
        id="age"
        min={1}
        type="number"
        value={age}
        placeholder="100"
        required
        onChange={(e) => updateFields({ age: e.target.value })}
      />
    </FormWrapper>
  );
}
