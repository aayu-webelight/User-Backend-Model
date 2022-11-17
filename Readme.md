
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
    Url: "/user/find/:name"    //where ":name" is replaced by user's name

Update Details of specific user-
    METHOD: "POST"
    Url: "/user/update/:name"    //where ":name" is replaced by user's name

Delete Details of specific user-
    METHOD: "DELETE"
    Url: "/user/delete/:name"    //where ":name" is replaced by user's name
    
Delete all Users-
    METHOD: "DELETE"
    Url: "/user/deleteall"

