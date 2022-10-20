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
      <label>First Name</label>
      <input
        type="text"
        value={firstName}
        placeholder="Jazzy"
        autoFocus
        required
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        placeholder="Pants"
        required
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <label>Age</label>
      <input
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
