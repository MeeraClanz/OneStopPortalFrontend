import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import constants from "./components/constants/constants";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const googleToken = localStorage.getItem("googleToken");

  const openApp = async (appUrl) => {
    if (!googleToken) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    // Send token to application backend for authentication
    try {
      const response = await fetch(constants.URL.autoLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${googleToken}`,
        },
      });

      if (response.ok) {
        window.open(appUrl, "_blank");
      } else {
        alert("Auto-login failed. Please login manually.");
      }
    } catch (error) {
      console.error("Auto-login error:", error);
    }
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMenuItemClick = (url) => {
    window.open(url, "_blank");
    setActiveMenu(null); // ✅ Reset active menu after clicking the item
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      label: (
        <div
          className={`part-menu ${
            activeMenu === "Production" ? "active-menu" : ""
          }`}
          onClick={() => handleMenuClick("Production")}
        >
          <span
            className={`product-logo ${
              activeMenu === "Production" ? "active-logo" : ""
            }`}
          />
          <span
            className={`project-title ${
              activeMenu === "Production" ? "active-title" : ""
            }`}
          >
            Production
          </span>
        </div>
      ),
      items: [
        {
          label: (
            <div
              className="product-submenu"
              // onClick={() => handleMenuItemClick("http://3.7.231.138:3000/#/")}
              onClick={() => openApp("https://agaram.clanizon.com/#/")}
            >
              <span className="submenu1-logo" />
              <span className="submenu1-lbl">
                Production Monitoring system LV
              </span>
            </div>
          ),
        },
        {
          label: (
            <>
              <div
                className="product-submenu"
                onClick={() =>
                  handleMenuItemClick("http://52.66.153.167:3001/#/", "_blank")
                }
              >
                <span className="submenu1-logo" />
                <span className="submenu1-lbl">Zone LV</span>
              </div>
            </>
          ),
        },
        {
          label: (
            <>
              <div
                className="product-submenu"
                style={{ alignItems: "center" }}
                onClick={() =>
                  handleMenuItemClick("http://43.204.192.103:3000/#/", "_blank")
                }
              >
                <span className="submenu2-logo" />
                <span className="submenu1-lbl ml-2">
                  Production Monitoring system EV
                </span>
              </div>
            </>
          ),
        },
        {
          label: (
            <>
              <div
                className="product-submenu"
                style={{ alignItems: "center" }}
                onClick={() =>
                  handleMenuItemClick("http://43.204.192.103:3001/#/", "_blank")
                }
              >
                <span className="submenu2-logo" />
                <span className="submenu1-lbl ml-2">Zone EV</span>
              </div>
            </>
          ),
        },
        {
          label: (
            <>
              <div
                className="product-submenu"
                onClick={() =>
                  handleMenuItemClick("http://43.205.0.47:3000/#/", "_blank")
                }
              >
                <span className="submenu3-logo" />
                <span className="submenu1-lbl ml-2 mt-1">Amphe ATS</span>
              </div>
            </>
          ),
        },
      ],
    },

    {
      label: (
        <div
          className={`training-menu ${
            activeMenu === "Training" ? "active-menu" : ""
          }`}
          onClick={() => handleMenuClick("Training")}
        >
          <span
            className={`training-logo ${
              activeMenu === "Training" ? "active-logo" : ""
            }`}
          />
          <span
            className={`project-title ${
              activeMenu === "Training" ? "active-title" : ""
            }`}
          >
            Training
          </span>
        </div>
      ),
      items: [
        {
          label: (
            <>
              <div
                className="training-submenu"
                onClick={() =>
                  handleMenuItemClick("http://13.202.143.30:3000/#/", "_blank")
                }
              >
                <span className="submenu4-logo" />
                <span className="submenu1-lbl ml-2">
                  Training Module Admin(Game)
                </span>
              </div>
            </>
          ),
        },
        {
          label: (
            <>
              <div
                className="training-submenu"
                onClick={() =>
                  handleMenuItemClick("http://3.7.231.138:3000/#/", "_blank")
                }
              >
                <span className="submenu5-logo" />
                <span className="submenu1-lbl ml-2">
                  Staff Improvement Plan
                </span>
              </div>
            </>
          ),
        },
        {
          label: (
            <>
              <div
                className="training-submenu"
                onClick={() =>
                  handleMenuItemClick("http://3.7.231.138:3000/#/", "_blank")
                }
              >
                <span className="submenu5-logo" />
                <span className="submenu1-lbl ml-2">APQP</span>
              </div>
            </>
          ),
        },
        {
          label: (
            <>
              <div
                className="training-submenu"
                onClick={() =>
                  handleMenuItemClick("http://3.7.231.138:3000/#/", "_blank")
                }
              >
                <span className="submenu3-logo ml-1" />
                <span className="submenu1-lbl  mb-2">Kaizon Management</span>
              </div>
            </>
          ),
        },
        {
          label: (
            <>
              <div
                className="training-submenu"
                onClick={() =>
                  handleMenuItemClick("http://3.7.231.138:3001/#/", "_blank")
                }
              >
                <span className="submenu6-logo" />
                <span className="submenu1-lbl ml-2">Suggestion System</span>
              </div>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <div className="app-container">
      <div className="topbar">
        <Button
          icon="pi pi-bars"
          className="p-button-rounded p-button-text topbar-toggle"
          onClick={() => setSidebarVisible((prev) => !prev)}
        />
        {/* <hr className="hr-line"></hr> */}
      </div>

      <Sidebar
        visible={sidebarVisible}
        className="custom-sidebar"
        modal={false}
        showCloseIcon={false}
        onHide={() => {}}
      >
        <div ref={sidebarRef}>
          <TieredMenu model={menuItems} className="custom-tiered-menu" />
        </div>
      </Sidebar>
    </div>
  );
}
