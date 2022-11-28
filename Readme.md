API for:

User adding-
METHOD: "POST"
Url: "/users"  
 Type of Input- {
"name": "some title", //where name is unique
"password": "some password"
}

Find all Users-
METHOD: "GET"
Url: "/users"

Login a user-
METHOD: "POST"
Url: "/users/login"  
 Type of Input- {
"name": "some title", //where name is unique
"password": "some password"
}

Get Details of A specific User-
METHOD: "POST"
Url: "/users/:id" //unique id of every user
Headers: {
authorization: //containing the authtoken we get in login
}

Update Details of specific user-
METHOD: "PUT"
Url: "/users/:id" //unique id of every user
Headers: {
authorization: //containing the authtoken we get in login
}

Delete Details of specific user-
METHOD: "DELETE"
Url: "/users/:id" //unique id of every user
Headers: {
authorization: //containing the authtoken we get in login
}

Delete all Users-
METHOD: "DELETE"
Url: "/users"
