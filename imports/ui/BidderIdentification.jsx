import React, { useState, useEffect } from 'react';

export const BidderIdentification = () => {
  var [bidderEmail, setBidderEmail] = useState(
    localStorage.getItem('bidderEmail') || null
  );

  var [inputEmail, setInputEmail] = useState();

  useEffect(() => {
    localStorage.setItem('bidderEmail', bidderEmail);
  }, [bidderEmail]);

  handleInputEmailChange = (event) => {
    setInputEmail(event.target.value);
  };

  handleSubmitClick = () => {
    setBidderEmail(inputEmail);
  };

  if (bidderEmail == null) {
    return (
      <div>
        <input type="text" value={inputEmail} onChange={handleInputEmailChange} />
        <button onClick={handleSubmitClick}>Submit</button>
      </div>
    )
  }

  return (<div>{bidderEmail}</div>);
};
