import './leftSidebar.scss';

import cx from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StickyBox from 'react-sticky-box';

function LeftSidebar() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <StickyBox offsetBottom={0} offsetTop={0}>
      <section id="left-sidebar">
        <div className="pt-4 pr-0 pb-0 pl-4 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-flex-start">
          <div className="menu is-flex is-flex-direction-column">
            <h4 className="title is-4 pt-2 pb-0 pl-2 mb-0">
              <strong>
                <a href="/">Character Crisis</a>
              </strong>
            </h4>
            <hr></hr>
            <ul className="menu-list">
              <li className="menu-item">
                <Link className={cx({ active: path === '/characters' })} to="/characters">
                  <strong>Characters</strong>
                </Link>
              </li>
              <li className="menu-item">
                <Link className={cx({ active: path === '/games' })} to="/games">
                  <strong>Games</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </StickyBox>
  ) as React.ReactElement;
}

export default LeftSidebar;
