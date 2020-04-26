import React, { FunctionComponent } from "react";

interface Props {
  email: string;
}

const Email: FunctionComponent<Props> = ({ email }) => {
  const realEmail = email.replace("(at)", "@").replace(/\(dot\)/gi, ".");
  return <a href={`mailto:${realEmail}`}>{realEmail}</a>;
};

export default Email;
