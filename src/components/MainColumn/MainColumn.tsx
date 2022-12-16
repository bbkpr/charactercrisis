import * as React from 'react';

const MainColumn: React.FC<{ children?: React.ReactNode; title?: string }> = ({ children, title }) => {
  return (
    <div className="column mt-2 mx-5">
      {title && (
        <>
          <h3 className="title is-size-3">{title}</h3>
          <hr />
        </>
      )}
      <div>{children ? children : null}</div>
    </div>
  ) as React.ReactElement;
};

export default MainColumn;
