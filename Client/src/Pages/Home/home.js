// external dependency imports
import { React, useState, useEffect, useReducer, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import date from "date-and-time";

// File Imports
import Dashboard from "../components/Dashboard";
import UserList from "./userlist";
import { checkSesh } from "../../services/AuthService";

// style imports
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";

// socket import
import socket from "../../services/socket";

const reducer = (status, action) => {
  switch (action) {
    case "SUCCESS":
      return {
        error: null,
        hasSesh: true,
        loading: false,
      };
    case "ERROR":
      return {
        error: true,
        hasSesh: false,
        loading: false,
      };
    default:
      return status;
  }
};

export default function Home(props) {
  const navigate = useNavigate();
  const currentUser = useRef(null);

  // checksesh handler
  const [active, setactive] = useState(null);
  const [status, dispatch] = useReducer(reducer, {
    error: null,
    hasSesh: null,
    loading: true,
  });

  useEffect(() => {
    socket.connect();
    checkSesh().then((res) => {
      if (res) {
        dispatch("SUCCESS");
        console.log(res)
        currentUser.current = res;
      } else {
        dispatch("ERROR");
      }
    });
  }, []);

  // appshell tools
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const [pool, setpool] = useState([
    { userName: "Abel", socket: "Hello reciver" },
    { userName: "Abel", socket: "Hello reciver" },
  ]);

  // useEffect(() => {
  //   // const pattern = date.compile('MMM D YYYY h:m:s A');
  //   // const temp = {displayName: 'Abel', message: 'Hello reciver', now: date.format(new Date(), pattern)}
  //   // setSender(s => [...s, temp])
  // }, []);



  // io stuff
  socket.on("UsersList", (data) => {
    setpool(data);
  })

  socket.on("NewUser", (NewUser) => {
    setpool(pool.concat(NewUser));
  })

  // temporary hooooooot fix
  socket.on("ChannelUpdate", ({ userName, newChannel }) => {
    for(let user in pool) {
      if (user.userName === userName) {
        user.channel = newChannel
      }
    }
  })

  socket.on("UserDisconnect", ({ userName }) => {
    setpool(pool.filter((usr) => usr.userName !== userName ))
  })
  // ---------------------------------------
  return (
    <div>
      {status.loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {status.hasSesh ? (
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
                  {pool.map((element, index) => (
                    <UserList
                      // onClick={setactive(element)}
                      key={index}
                      data={element}
                    />
                  ))}
                </Navbar>
              }
              header={
                <Header height={70} padding="md">
                  {/* Handle other responsive styles with MediaQuery component or createStyles function */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
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
              {/* {active &&
                
              } */}
              <Dashboard currentUser={currentUser.current} />
            </AppShell>
          ) : (
            navigate("/")
          )}
        </div>
      )}
    </div>
  );
}
