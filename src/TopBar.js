import React, { useState } from "react";
import logo from "./images/logo.svg";
import down from "./images/down.svg";
import profile from "./images/profile.svg";
import SideBar from "./SideBar";

export const TopBar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <>
      <div className="layout-topbar d-flex">
        <div className="side-menu">
          <SideBar visible={sidebarVisible} setVisible={setSidebarVisible} />
        </div>
        <div className="top-content">
          <div className="layout-topbar-logo">
            <span>
              <img
                src={logo}
                className="ml-3 top-logo"
                style={{ height: "50px", width: "140px" }}
                alt="logo"
              />
            </span>
          </div>
          <div className="">
            <h1 className="top-head">One Stop Portal</h1>
          </div>
          <div className="profile-grp ms-sm-5 hover_cursor d-flex">
            <img
              className="rightLogo  mb-1 "
              height="44"
              width="44"
              src={profile}
            />
            <div className="profile-content">
              <span className="profile-name">Wade Warren</span>
            </div>
            <div className="down-icon">
              <img
                className="rightLogo mr-2 "
                height="24"
                width="24"
                src={down}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
