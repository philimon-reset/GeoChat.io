// external dependency imports
import {React, useState, useEffect} from "react";
import date from 'date-and-time';
// import { io } from "socket.io-client";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// File Imports
import Dashboard from '../components/Dashboard'

// style imports
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';

export default function Home(props) {

  const [loggedIn, setIn] = useState(true);
  const [opened, setOpened] = useState(false);
  const [sender, setSender] = useState([]);
  const theme = useMantineTheme();

  useEffect(() => {
    const pattern = date.compile('MMM D YYYY h:m:s A');
    const temp = {displayName: 'Abel', message: 'Hello reciver', now: date.format(new Date(), pattern)}
    axios.get('/isIn').then(
      setIn(true)
    ).catch();
    setSender(s => [...s, temp])
  }, [])
  console.log(sender)

  // let sock = io();

  // let sendForm = document.getElementById("form");
  // let input = document.getElementById("input");
  // let logout = document.getElementById("logout");

  // sendForm.addEventListener("submit", function (event) {
  //   event.preventDefault();

  //   if (input.value) {
  //     sock.emit("chat message", input.value);
  //     input.value = "";
  //   }
  // });

  if (loggedIn) {
    return (
      <AppShell
        // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
        navbarOffsetBreakpoint="sm"
        // fixed prop on AppShell will be automatically added to Header and Navbar
        fixed
        navbar={
          <Navbar
            padding="md"
            // Breakpoint at which navbar will be hidden if hidden prop is true
            hiddenBreakpoint="sm"
            // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
            hidden={!opened}
            // when viewport size is less than theme.breakpoints.sm navbar width is 100%
            // viewport size > theme.breakpoints.sm – width is 300px
            // viewport size > theme.breakpoints.lg – width is 400px
            width={{ sm: 300, lg: 400 }}
          >
            <Text>Application navbar</Text>
          </Navbar>
        }
        header={
          <Header height={70} padding="md">
            {/* Handle other responsive styles with MediaQuery component or createStyles function */}
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text>Application header</Text>
            </div>
          </Header>
        }
      >
        <Dashboard section={sender}/>
      </AppShell>
    );
  } else {
    return(
      <Navigate to={"/login"} />
    );
  }
}