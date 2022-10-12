# Assignment phase 2

# Documentation - Git
Git Repository URL : https://github.com/Alek-beep/AssignmentPhase2
# Layout
My GitHub repository is arranged so that it is the equivalent to the source folder of the angular project. This was done to make it simpler to push changes to the repository from my local repository. The files for the back-end server are in the server folder and the src folder in the repository is the src folder of the front-end angular app. In the AssignmentPhase1/src/assets folder there are the .json files for the groups and users data structures. Also, all of the documentation for the assignment is located in the Assignment/Phase1/Assignment Documentation folder
# Version Control Approach
My approach towards version control was as follows; I would commit and push from my local repository after a milestone like a creating a set of functions that would be a good checkpoint to go back to in case anything went seriously wrong with the development.

# Documentation - Data Structures
Git Repository URL : https://github.com/Alek-beep/AssignmentPhase2
# Main Data Structures
In assignment phase 2 I used mongoDB to store the data for in the assignment. There are two collections: users, and groups. These collections are collections of objects that go off of defined models in the source code.
# Users
A user has a template class called UserModel. A UserModel object is made up of a username, an email, an id, a role and a password. These attributes are all assignable in the constructor for the class. 
# Channels
A channel has a template class called ChannelModel. A ChannelModel object is made up of a channel name string and an array of user objects, each one being an instance of the UserModel class. These attributes are all assignable in the constructor for the class. 
# Groups
A group has a template class called Group Model. A GroupModel is made up of a name which is a string, an array of users, each user being an instance of the UserModel class, and an array of channels, each channel being an instance of the ChannelModel class. These attributes are all assignable in the constructor for the class. 


# Documentation - REST API
Git Repository URL : https://github.com/Alek-beep/AssignmentPhase2
# Routes in the application
The angular front end communicates with the back-end node.js server using routes. The system utilizes the RESTful system. Firstly it separates the concerns of the user interface from the data storage which is all done on the backend node.js server using the ability of javascript to read in from and write to a mongoDB database made up of two collections, users and groups. Mongo functions are called which allow for interaction between this NoSQL database. This makes the processing of the data much easier, and also keeps it away from the user interface elements. The system is also stateless. Each request from the front end to the back end contains all of the information necessary for the request.
# /api/getlist
Thie /api/getList route simply returns the list of all users in the users collection of the database. This route is used for testing purposes. It takes no parameters and simply calls the collection.find({}) function to return all the items of a collection.
# /api/getlistGroups
Thie /api/getList route simply returns the list of all groups in the groups collection of the database. This route is used for testing purposes. It takes no parameters and simply calls the collection.find({}) function to return all the items of a collection.
# /api/chat
The/api/chat route takes in the user name of the currently logged in user as a parameter. This is then used to find the channel to put the user in when the chat functionality is called. The groups collection is searched and when the channel is found that contains the user, the socket is initiated. Then the chat component is loaded.
# /api/auth
The /api/auth route takes in the entered username and email on the user interface from the login form. It then checks if the request body contains data. The users collection is searched, and if a user is found, the password is checked and if it is correct the user is allowed to log in.
# /api/add
The /api/add route is used for adding a user to the system by storing it in the users collection of the mongodb database. The route takes in a user object as a parameter. It then checks if the request body contains data. The users collection is checked against the user id of the incoming user object and if there is no duplicate the user is inserted into the collection using insertOne(). The appropriate JSON return values are then passed onwards for error validation.
# /api/remove_user
This route takes in a username from the front-end in the request body parameter. The users collection is then searched for a user with a matching name. If the count of the users with this name is greater than one, then a single entry for that user name is deleted from the collection using the deleteOne function.
# /api/add_group
The /api/add route is used for adding a gropu to the system by storing it in the groups collection of the mongodb database. The route takes in a group object as a parameter. It then checks if the request body contains data. The group collection is checked against the group name  of the incoming user object and if there is no duplicate the group is inserted into the collection using insertOne(). The appropriate JSON return values are then passed onwards for error validation.
# /api/remove_group
This route takes in a group from the front-end in the request body parameter. The groups collection is then searched for a group with a matching name. If the count of the groups with this name is greater than one, then a single entry for that user name is deleted from the collection using the deleteOne function.
# /api/remove_user_from_group
This route is for removing a single user from a group. It takes in as parameters from the front-end the group name and the user to remove via the request body. It then checks if the request body contains data. The users collection is searched to check for a matching user. Then the groups collection is searched using the groupName input parameter. The users list is searched for the returned group from this search and if there is a user in this list matching the input user, then the user is removed from the users list array. After the user is removed from this list, then the users list of the group is updated with this new information.
# /api/remove_channel_from_group
This route is for removing a single channel from a group. It takes in as parameters from the front-end the group name and the channel to remove via the request body. It then checks if the request body contains data. Then the groups collection is searched using the groupName input parameter. The channels list is searched for the returned group from this search and if there is a channel in this list matching the input channel, then the channel is removed from the channels list array. After the channel is removed from this list, then the channels list of the group is updated with this new information.
# /api/add_user_to_group
This route is for adding a single user from a group. It takes in as parameters from the front-end the group name and the user to remove via the request body. It then checks if the request body contains data. The users collection is searched to check for a matching user. Then the groups collection is searched using the groupName input parameter. The users list is returned and the new used is pushed to it. After the users list is appended to, the users list of the group is updated with this new information.
# /api/add_channel_to_group
This route is for adding a single channel to a group. The channel name, and the group name of the new channel and existing group is passed as input parameters. The group is found with the correct name and then the channels list is pulled out. The new channel object is appended to this array and then the original group channel list is updated with this new channel list.

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


