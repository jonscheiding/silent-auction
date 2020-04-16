import React, { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const BidEntry = ({
  minimumAmount, initialAmount, enteredAmount, onEnteredAmountChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleEnteredAmountFocus = () => setIsFocused(true);

  const handleEnteredAmountChange = (e) => onEnteredAmountChange(Number(e.target.value));

  const handleEnteredAmountBlur = (e) => {
    onEnteredAmountChange(Number(e.target.value).toFixed(0));
    setIsFocused(false);
  };

  useEffect(() => {
    if (isFocused) { return; }
    onEnteredAmountChange(initialAmount);
  }, [initialAmount]);

  return (
    <Form.Group>
      <Form.Label as="h5">Your Bid</Form.Label>
      <h3>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            value={enteredAmount}
            onChange={handleEnteredAmountChange}
            onFocus={handleEnteredAmountFocus}
            onBlur={handleEnteredAmountBlur}
            min={minimumAmount}
            step={1}
            required
            className="text-right"
          />
          <InputGroup.Append>
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </h3>
    </Form.Group>
  );
};
