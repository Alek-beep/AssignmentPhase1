# Documentation - Angular Architecture
Git Repository URL : https://github.com/Alek-beep/AssignmentPhase2
# Components
The front end of the application is made up of several components.
# The App Component
The app component contains the navigation bar at the top of the page which is present on all of the pages of the application. Also it contains elements such as the app-routing module which contains all of the routes that angular uses to get to the various components of the application. The app component also allows for the user to log out from the navigation bar using the log out link that is associated with a function in app.component.ts
# Login
The login component is the first place the user goes in the application. It contains a form for the entry of a username and email to log in to the system. If a user is successful in logging in, then the users' details are stored in localStorage.
# Account
The account component is the place the user is taken after logging in. It displays the users details and all of the possible functions for the user. It displays functions that only work if a user's role is elevated enough. These functions check once the button is clicked what the user's role is. If the user is allowed to, then they can perform the following functions on this page: Add User, Remove User, Add Group, Add User To Group, Add Channel to Group, Remove Group, Remove User From Group and Remove Channel From Group.
# Chat
This component contains the chat component that utilises sockets to show messages to all those clients who are connected.
# Socket-Service
The socket service is used by the chat component to broadcast messages across clients. There is a initSocket() function that sets up the connection to the server for the socket and disconnects it on disconnect. There is also a send() function. This function emits a message on the socket. The getMessage() function returns the message of a socket as an observable so that when it changes it can be seen that it is different.
# UserService
The User service is used for a few of the database functions and the communication of them. It is only used for the add(), getlist(), and getlistGroups() functions. Each of these functions simply passes on to the routes via http requests to the server.js node backend.