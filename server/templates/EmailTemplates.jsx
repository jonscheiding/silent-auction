import React from 'react';

const BaseTemplate = ({ children, auctionTitle, baseUrl }) => (
  <>
    <h1>{auctionTitle}</h1>
    <div>{children}</div>
    <h6><i>{baseUrl}</i></h6>
  </>
);

const ValidationEmail = ({ baseUrl, auctionTitle, validationCode }) => {
  const validateUrl = `${baseUrl}validate/${validationCode}`;

  return (
    <BaseTemplate auctionTitle={auctionTitle} baseUrl={baseUrl}>
      <h2>Thanks for joining us for <b>{auctionTitle}</b>!</h2>
      <h4>
        Please click this link to validate your e-mail address
        so you can start bidding:
      </h4>
      <h3>
        <a href={validateUrl}>{validateUrl}</a>
      </h3>
    </BaseTemplate>
  );
};

ValidationEmail.subject = 'Validate your e-mail address';

const BidEmail = ({ baseUrl, auctionTitle, itemTitle }) => (
  <BaseTemplate auctionTitle={auctionTitle} baseUrl={baseUrl}>
    <h2>Thanks for bidding on {itemTitle}!</h2>
    <h4>We&apos;ll let you know if anybody outbids you.</h4>
  </BaseTemplate>
);

BidEmail.subject = 'Thanks for bidding!';

const OutbidEmail = ({
  baseUrl, auctionTitle, itemId, itemTitle,
}) => {
  const itemUrl = `${baseUrl}items/${itemId}`;

  return (
    <BaseTemplate auctionTitle={auctionTitle} baseUrl={baseUrl}>
      <h2>Someone just outbid you for {itemTitle}!</h2>
      <h4>
        Quick, click here to bid again and make sure you get the item you want!
      </h4>
      <h3>
        <a href={itemUrl}>{itemUrl}</a>
      </h3>
    </BaseTemplate>
  );
};

OutbidEmail.subject = "You've been outbid!";

export { ValidationEmail, OutbidEmail, BidEmail };
