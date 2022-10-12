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