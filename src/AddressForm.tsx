import { FormWrapper } from "./FormWrapper";

type AddressData = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};

export function AddressForm({
  street,
  city,
  state,
  zip,
  updateFields,
}: AddressFormProps) {
  return (
    <FormWrapper title="Address Details">
      <label htmlFor="street">Street </label>
      <input
        id="street"
        autoFocus
        required
        type="text"
        value={street}
        placeholder="1 Infinite Loop"
        onChange={(e) => updateFields({ street: e.target.value })}
      />
      <label htmlFor="city">City</label>
      <input
        id="city"
        required
        type="text"
        placeholder="Pootie Toots"
        value={city}
        onChange={(e) => updateFields({ city: e.target.value })}
      />
      <label htmlFor="state">State</label>
      <input
        id="state"
        required
        type="text"
        placeholder="Kentucky"
        value={state}
        onChange={(e) => updateFields({ state: e.target.value })}
      />
      <label htmlFor="zipCode">Zip Code</label>
      <input
        id="zipCode"
        required
        type="text"
        placeholder="90210"
        value={zip}
        onChange={(e) => updateFields({ zip: e.target.value })}
      />
    </FormWrapper>
  );
}
