# Documentation - Data Structures
Git Repository URL : https://github.com/Alek-beep/AssignmentPhase1
# Main Data Structures
There are two main data structures for assignment phase 1. Both data structures are .json files for the storage of what should in the future be stored in relational tables. The first .json file is the users.json file which is used to store an array of JSON objects containing a username, email, id and role for each user. The other main data structure is a .json file which stores an Array of JSON objects for every group which contains the name of the group, all the users in that group and the channels for the group stored in their own nested array of JSON objects which includes the name for each channel along with the users that are in the respective channels.
# The template for a single user is :
[{"username":"User1","email":"user1@user.com","Id":4,"Role":"User"}]
# The template for a group is :
[{
"name":"Group 1","users":["Alek"],
"channels":[{"channelName":"Channel 2","users":["User1", "User2"]},]{"channelName":"Channel 1","users":["User1", "User2"]}]
}]
