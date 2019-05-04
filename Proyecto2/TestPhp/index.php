<?php

require_once 'vendor/autoload.php';

use Siler\Graphql;
use GraphQL\GraphQL as WGraphql;
use Siler\Http\Request;
use Siler\Http\Response;
use Overblog\DataLoader\DataLoader;
use Overblog\DataLoader\Promise\Adapter\Webonyx\GraphQL\SyncPromiseAdapter;
use Overblog\PromiseAdapter\Adapter\WebonyxGraphQLSyncPromiseAdapter;

Response\header('Access-Control-Allow-Origin', '*');
Response\header('Access-Control-Allow-Headers', 'content-type');

$MyDB = new mysqli("localhost", "admin", "dubyduby", "SOA");

if ($MyDB->connect_errno) {
    error_log("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}

function sql($query) {
    global $MyDB;
    $result = mysqli_query($MyDB, $query);
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);  

    return $rows;
}

$graphQLSyncPromiseAdapter = new SyncPromiseAdapter();
$promiseAdapter = new WebonyxGraphQLSyncPromiseAdapter($graphQLSyncPromiseAdapter);

$userLoader = new DataLoader(function ($keys) use ($promiseAdapter ) {
    $ids = join(',', $keys);
    $idMap = array_flip($keys);
    $rows = sql("SELECT idUser, username, pwd FROM Users WHERE idUser = ({$ids});");
    foreach ($rows as $r) {
        $idMap[$r['idUser']] = $r;
    }
    return $promiseAdapter->createAll(array_values($idMap));
 }, $promiseAdapter);

WGraphQL::setPromiseAdapter($graphQLSyncPromiseAdapter);

$context = [
    'userLoader' => $userLoader,
    'sql' => function ($query) {
        return sql($query);
    }
];

if (Request\method_is('post')) {
    $schema = include __DIR__.'/schema.php';

    Graphql\init($schema, null, $context);
}