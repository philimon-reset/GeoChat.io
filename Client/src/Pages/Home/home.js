// external dependency imports
import { React, useState, useEffect, useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";

// app shell components
import Dashboard from "../components/Dashboard";
import Logout from "../components/Logout";
import UserList from "./userlist";

// auth services
import { checkSesh } from "../../services/AuthService";

// global state manager
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
  Avatar,
} from "@mantine/core";

// socket import
import socket from "../../services/socket";

// reducer to check auth state
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

// Home page
export default function Home() {
  const navigate = useNavigate();
  const currentUser = useRef(null);

  // checksesh handler
  const [status, dispatch] = useReducer(reducer, {
    error: null,
    hasSesh: null,
    loading: true,
  });

  // connect to users socket and procees with auth handling
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

  // function to update notification signs for new messages
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

  // temporary hooooooot fix !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
                style={{
                  backgroundColor: "#314E52",
                  color: "#F6F2D4",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                }}
                // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
                navbarOffsetBreakpoint="sm"
                // fixed prop on AppShell will be automatically added to Header and Navbar
                fixed
                navbar={
                  <Navbar
                    style={{
                      backgroundColor: "#314E52",
                    }}
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
                    <Text
                      style={{
                        fontSize: "1.5em",
                        fontWeight: "lighter",
                        textAlign:"center",
                        paddingBottom: '2px',
                        borderBottom: "0.5px #F6F2D4 solid"
                      }}
                    >
                      Active Chats
                    </Text>
                    {pool.map((element, index) => (
                      <UserList key={index} data={element} />
                    ))}
                  </Navbar>
                }
                header={
                  <Header
                    height={70}
                    padding="md"
                    style={{ backgroundColor: "#314E52" }}
                  >
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
                      <Avatar>
                        {currentUser.current ? currentUser.current[0] : ""}
                      </Avatar>
                      <Text
                        style={{
                          fontSize: "2em",
                          fontWeight: "bolder",
                        }}
                      >
                        Welcome {currentUser.current} 👋
                      </Text>
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
