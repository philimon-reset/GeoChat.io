// external dependency imports
import { React, useState, useEffect, useReducer, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import date from "date-and-time";

// File Imports
import Dashboard from "../components/Dashboard";
import Logout from "../components/Logout";
import UserList from "./userlist";
import { checkSesh } from "../../services/AuthService";
import { Provider } from "../components/State_Managment/IsActive";

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
        currentUser.current = res.data.userName;
      } else {
        dispatch("ERROR");
      }
      return () => {
        console.log("cleaned up");
      };
    });
  }, []);

  // appshell tools
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const [pool, setpool] = useState([]);

  // io stuff
  socket.on("UsersList", (data) => {
    setpool(data);
  });

  socket.on("NewUser", (NewUser) => {
    setpool(pool.concat(NewUser));
  });

  const PrivateMsgForward = (message) => {
    setpool(
      pool.map((x) => {
        if (x.userName === message.sender) {
          x.hasNotification = true;
        }
        return x;
      })
    );
  };

  // temporary hooooooot fix
  socket.on("ChannelUpdate", ({ userName, newChannel }) => {
    for (let user in pool) {
      if (user.userName === userName) {
        user.channel = newChannel;
      }
    }
  });

  socket.on("UserDisconnect", ({ userName }) => {
    setpool(pool.filter((usr) => usr.userName !== userName));
  });
  // ---------------------------------------
  return (
    <div>
      {status.loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {status.hasSesh ? (
            <Provider>
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
                      <UserList key={index} data={element} />
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
                        justifyContent: "space-between",
                      }}
                    >
                      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                        <Burger
                          opened={opened}
                          onClick={() => setOpened((o) => !o)}
                          size="sm"
                          color={theme.colors.gray[6]}
                          mr="lg"
                        />
                      </MediaQuery>
                      <Text>{currentUser.current}</Text>
                      <Logout socket={socket} />
                    </div>
                  </Header>
                }
              >
                <Dashboard
                  Forward={PrivateMsgForward}
                  currentUser={currentUser.current}
                />
              </AppShell>
            </Provider>
          ) : (
            navigate("/")
          )}
        </div>
      )}
    </div>
  );
}
