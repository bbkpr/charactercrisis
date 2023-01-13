import cx from 'classnames';
const blueSpinner = require('../images/blue-spinner.gif');
export interface LoaderProps {
  className?: string;
  message?: string;
}
export function Loader(props?: LoaderProps) {
  return (
    <div className={cx('d-flex align-items-center', props.className)}>
      <img loading="eager" className="blue-spinner object-fit-contain" src={blueSpinner} alt={props.message}></img>
      <div className="ml-1">{props.message != null ? props.message : 'Loading...'}</div>
    </div>
  );
}
