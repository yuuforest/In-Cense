import React, { useState,useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsBell } from "react-icons/bs";
// import { BsFillBellFill } from "react-icons/bs";
import { FlexDiv } from "../common/FlexDiv/FlexDiv";
import { NavWrapper, NavTitle, NavItem, NavLogInStatus } from "./style";
import AlarmModal from "../AlarmModal/AlarmModal";
import { logout } from "../../store/slice/userSlice";
import { initAlarmCount,selectAlarmList,selectAlarmCount } from "../../store/slice/alarmSlice";
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import api from '../../apis/api'

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [alarmOpen, setAlarmOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);
  const alarmList = useSelector(selectAlarmList);
  const alarmCount = useSelector(selectAlarmCount);
  const alarmClick = () => {
    if(alarmOpen===false){
      api.alarm.readAlarmSendAll();
    }
    else{
      dispatch(initAlarmCount());
    }
    setAlarmOpen((prev) => !prev);
  };

  const isAlarmList = () =>{
    const len = alarmList.filter((data)=>data.isReceived===true).length;
    return len>0;
  }

  useEffect(()=>{
      
  },[alarmCount])

  return (
    <>
      <NavWrapper pathname={pathname}>
        <FlexDiv width="auto">
          <NavTitle to="/">
            <img src="/assets/images/Icon.svg" alt="logo" />
          </NavTitle>
          <NavTitle to="/" style={{ paddingLeft: "0" }}>
            In Cense
          </NavTitle>
        </FlexDiv>
        <FlexDiv width="auto">
          <NavItem to="/test">Test</NavItem>
          <NavItem to="/list">Perfumes</NavItem>
          <NavItem to="/share">Share/Sell</NavItem>
          <NavItem to="/profile">My Page</NavItem>
        </FlexDiv>
        <FlexDiv width="auto">
          {isAlarmList? (
            <NotificationAddIcon onClick={alarmClick}/>
          ) : (
            <BsBell onClick={alarmClick} style={{ cursor: "pointer" }} />
          )}

          <NavLogInStatus
            onClick={() => {
              if (isLoggedIn) dispatch(logout());
              else navigate("/login");
            }}
          >
            {isLoggedIn ? "Log out" : "Log in"}
          </NavLogInStatus>
        </FlexDiv>
      </NavWrapper>

      {alarmOpen && <AlarmModal setAlarmOpen={setAlarmOpen} />}

      <div style={{ paddingTop: "var(--nav-height)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
