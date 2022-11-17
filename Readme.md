
API for:

User adding-
    METHOD: "POST"
    Url: "/user/add"    
    Type of Input-  {
                        "name": "some title",    //where name is unique
                        "password": "some password"
                    }

Find all Users-
    METHOD: "GET"
    Url: "/user/findall"

Login a user-
    METHOD: "POST"
    Url: "/user/login"    
    Type of Input-  {
                        "name": "some title",    //where name is unique
                        "password": "some password"
                    }

Get Details of A specific User-
    METHOD: "POST"
    Url: "/user/find"
    Headers: {
        authorization: //containing the authtoken we get in login
        }

Update Details of specific user-
    METHOD: "POST"
    Url: "/user/update" 
    Headers: {
        authorization: //containing the authtoken we get in login
        }
   

Delete Details of specific user-
    METHOD: "DELETE"
    Url: "/user/delete"  
    Headers: {
        authorization: //containing the authtoken we get in login
        }

    
Delete all Users-
    METHOD: "DELETE"
    Url: "/user/deleteall"

