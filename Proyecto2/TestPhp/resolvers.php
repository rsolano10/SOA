<?php

use Overblog\DataLoader\DataLoader;

return [
    'Person' => [
        'username' =>  function($root, $args, $context) {
            return DataLoader::await($context['userLoader']->load($root['idUser']));
        },
    ],
    'Query' => [
        'getUser' => function($root, $args, $context) {
            return $context['sql']("SELECT idUser,username,pwd FROM Users");
        }
    ]
];