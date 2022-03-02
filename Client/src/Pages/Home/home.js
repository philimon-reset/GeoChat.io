// external dependency imports
import {React, useState, useEffect, useReducer} from "react";
import { useNavigate } from "react-router-dom";
import date from 'date-and-time';

// File Imports
import Dashboard from '../components/Dashboard';
import UserList from './userlist'
import { checkSesh } from '../../services/AuthService';

// style imports
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';


// socket import
import socket from "../../services/socket";


const reducer = (state, action) => {
  switch(action) {
    case "SUCCESS":
      return {
        error: null,
        hasSesh: true,
        loading: false
      }
    case "ERROR":
      return {
        error: true,
        hasSesh: false,
        loading: false
      }
    default:
      return state
  }
}

export default function Home(props) {

  const navigate = useNavigate();

  // checksesh handler
  const [ state, dispatch ] = useReducer(reducer, {
    error: null,
    hasSesh: null,
    loading: true
  })

  useEffect(() => {
    checkSesh().then((res) => {
      if (res) {
        dispatch("SUCCESS")
      }
      else {
        dispatch("ERROR")
      }
    })
  }, [])

  // appshell tools
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [active, setactive] = useState(null);

  const [pool, setpool] = useState([{displayName: 'Abel', socket: 'Hello reciver'}, {displayName: 'Abel', socket: 'Hello reciver'}]);

  useEffect(() => {
    // const pattern = date.compile('MMM D YYYY h:m:s A');
    // const temp = {displayName: 'Abel', message: 'Hello reciver', now: date.format(new Date(), pattern)}
    // setSender(s => [...s, temp])
    socket.connect();
  }, []);

  const handleActive = (element) => {
    setactive(element)
  };
  // socket.on("UsersList", (data) => {
  //   setpool(data);
  // })

  return (
    <div>
      {state.loading ? <p>loading...</p>: <div>
        {state.hasSesh ? 
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
            <Text>Active Users</Text>
            {pool.map((element, index) => <UserList  onClick={() => handleActive(element)} key={index} data={element}/>)}
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
        {active && <Dashboard to={active} currentUser={props.currentUser}/>}
      </AppShell>: navigate('/')
      }
        </div>}
    </div>
  );
}