import React from 'react';

export const List = ({calls}) => {
  return (
    <ul>
      {calls &&
        calls.map((el) => (
          <li className="list" key={`${el._id}`}>
            <span className="column">{el._id}</span>
            <span className="column">{el.START_DATE}</span>
            <span className="column">{el.END_DATE}</span>
            <span className="column">{el.STATUS}</span>
            <span className="column">{el.SUPPORT_AGENT_ID}</span>
          </li>
        ))}
    </ul>
  );
};
