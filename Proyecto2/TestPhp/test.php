<?php

$MyDB = new mysqli("localhost", "admin", "dubyduby", "SOA");

if ($MyDB->connect_errno) {
    error_log("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

function sql($query) {
    global $MyDB;
    echo $query;
    $result = mysqli_query($MyDB, $query);
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);  

    return $rows;
}

$username = "Fofo2";
$password = "12";

// $res = sql("SELECT idUser,username,pwd FROM Users WHERE username = '$username' AND pwd = '$password';")[0]['username'];
// echo print_r($res, true);


//Set sql statement
$sql = "UPDATE Users SET pwd = ? WHERE username = ?";

//Prepare statement 
$stmt     = $MyDB->prepare($sql);
if(!$stmt) {
    echo 'Error: '.$MyDB->error;
}

//Bind parameters
$stmt->bind_param('ss',$password,$username);

//Execute statement
$stmt->execute();

echo print_r($stmt->affected_rows, true);