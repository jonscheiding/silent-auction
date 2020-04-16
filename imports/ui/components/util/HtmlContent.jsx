/* eslint-disable react/no-danger */
import React from 'react';

export const HtmlContent = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);
