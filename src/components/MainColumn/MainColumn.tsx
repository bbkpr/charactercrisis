import classNames from 'classnames';
import * as React from 'react';

const MainColumn: React.FC<{ children?: React.ReactNode; className?: string; title?: string }> = ({
  children,
  className,
  title
}) => {
  return (
    <div className={classNames('mt-2 mx-3', className)}>
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
