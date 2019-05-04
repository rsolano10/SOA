<?php
// Test this using following command
// php -S localhost:8080 ./index.php &
// curl http://localhost:8080 -d '{"query": "query { authUser(username: \"Fofo\", password: \"123\") }" }' &
// curl http://localhost:8080 -d '{"query": "query { postUser(username: \"Fofo\", password: \"123\") }" }'

// Project requirements
require_once __DIR__ . '/vendor/autoload.php';

// Use dependencies  of Grap
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\GraphQL;

// Connect to mysql
$conn = new mysqli("localhost", "admin", "dubyduby", "SOA");

// Database connection verification
if($conn->connect_errno) {
    error_log("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

// Send sql query to  mysql server
function sql($query) {
    global $conn;
    echo $query;
    $result = mysqli_query($conn, $query);
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);  

    return $rows;
}

try {
    // Define queryType ObjectType
    $queryType = new ObjectType([
        'name' => 'Query',
        'fields' => [
            'authUser' => [
                'type' => Type::string(),
                'args' => [
                    'username' => ['type' => Type::string()],
                    'password' => ['type' => Type::string()],
                ],
                'resolve' => function($root, $args) {
                    $username = $args['username'];
                    $password = $args['password'];
                    $res = sql("SELECT idUser,username,pwd FROM Users WHERE username = '$username' AND pwd = '$password';")[0]['username'];
                    return $res;
                }
            ],
            'postUser' => [
                'type' => Type::int(),
                'args' => [
                    'username' => ['type' => Type::string()],
                    'password' => ['type' => Type::string()],
                ],
                'resolve' => function($root, $args) {
                    $username = $args['username'];
                    $password = $args['password'];

                    global $conn;
                    
                    //Set sql statement
                    $sql = "INSERT INTO Users(username,pwd) VALUES (?, ?)";

                    //Prepare statement 
                    $stmt     = $conn->prepare($sql);
                    if(!$stmt) {
                        echo 'Error: '.$conn->error;
                    }

                    //Bind parameters
                    $stmt->bind_param('ss',$username,$password);

                    //Execute statement
                    $stmt->execute();

                    return $stmt->insert_id;
                }
            ],
            'updateUser' => [
                'type' => Type::int(),
                'args' => [
                    'username' => ['type' => Type::string()],
                    'password' => ['type' => Type::string()],
                ],
                'resolve' => function($root, $args) {
                    $username = $args['username'];
                    $password = $args['password'];

                    global $conn;
                    
                    //Set sql statement
                    $sql = "UPDATE Users SET pwd = ? WHERE username = ?";

                    //Prepare statement 
                    $stmt     = $conn->prepare($sql);
                    if(!$stmt) {
                        echo 'Error: '.$conn->error;
                    }

                    //Bind parameters
                    $stmt->bind_param('ss',$password,$username);

                    //Execute statement
                    $stmt->execute();

                    return $stmt->affected_rows;
                }
            ],
        ],
    ]);

    // See docs on schema options:
    // http://webonyx.github.io/graphql-php/type-system/schema/#configuration-options
    $schema = new Schema([
        'query' => $queryType
    ]);
    //gets the root of the sent json {"query":"query{accidentsData(...)}"}
    $rawInput = file_get_contents('php://input');
    //decodes the content as JSON
    $input = json_decode($rawInput, true);
    //takes the "query" property of the object
    $query = $input['query'];
    //checks if the input variables are a set
    $variableValues = isset($input['variables']) ? $input['variables'] : null;
    //calls the graphQL PHP libraty execute query with the prepared variables
    $result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
    //converts the result to a PHP array
    $output = $result->toArray();
} catch(\Exception $e) {
    $output = [
        'error' => [
            'message' => $e->getMessage()
        ]
    ];
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);


