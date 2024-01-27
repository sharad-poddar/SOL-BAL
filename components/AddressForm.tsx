import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/AddressForm.module.css'

function AddressForm(props: { handler: (address: string) => void }) {

  const [values, setValues] = useState({
    address: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevents the default form submission behavior
    e.preventDefault();
    // calling the refrence function
    props.handler(values.address)
  };

  // passing an event as like react e
  const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Without event.persist(), event properties may become null or undefined
    event.persist();
    setValues((values) => ({
      ...values,
      address: event.target.value,
    }));
  };

  return (
    <div className={styles.Form}>
      <form onSubmit={handleSubmit}>
        <input
          id="public-key"
          className={styles.formField}
          type="text"
          placeholder="Public Address, e.g. 7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp"
          name="firstName"
          value={values.address}
          onChange={handleAddressInputChange}
        />
        <br />
        <button type="submit" className={styles.formButton}>
          Check SOL Balance
        </button>
      </form>
    </div>
  );
}

export default AddressForm;
