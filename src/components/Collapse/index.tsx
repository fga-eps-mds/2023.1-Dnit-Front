import React, { useState } from 'react';
import "./style.css"
const Collapse = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="collapse-example">
      <div
        className="align-items-center br-item"
        role="listitem"
        onClick={toggleCollapse}
      >
        <div className="content">
          <div className="flex-fill">RÓTULO</div>
          <i
            className={`fas ${isCollapsed ? 'fa-angle-down' : 'fa-angle-up'}`}
            aria-hidden="true"
          ></i>
        </div>
      </div>
      {isCollapsed && (
        <div className="br-list" role="list" data-sub="data-sub">
          <div className="align-items-center br-item" role="listitem">
            <div className="row align-items-center">
              <div className="col-auto">
                <i className="fas fa-heartbeat" aria-hidden="true"></i>
              </div>
              <div className="col">Sub-item</div>
            </div>
          </div>
          <span className="br-divider"></span>
          
        </div>
      )}
    </div>
  );
};

export default Collapse;
