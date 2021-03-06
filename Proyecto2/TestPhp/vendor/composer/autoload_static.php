<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit035aba712587403b69e3123139877271
{
    public static $files = array (
        '625767ee32589091312b4f81c394cb8e' => __DIR__ . '/..' . '/leocavalcante/siler/src/Container/Container.php',
        'a6763048ebd6f6db73908c9aeaf523c6' => __DIR__ . '/..' . '/leocavalcante/siler/src/Diactoros/Diactoros.php',
        '7304b8c5be2b81b6cc64c45da152dec2' => __DIR__ . '/..' . '/leocavalcante/siler/src/Dotenv/Dotenv.php',
        'c7aeb74efa59ec95abef54a0800d45ae' => __DIR__ . '/..' . '/leocavalcante/siler/src/Functional/Functional.php',
        'fa5241aeb4ddbe24a4e23463194158e5' => __DIR__ . '/..' . '/leocavalcante/siler/src/Functional/Monad/Monad.php',
        '3fb0b3e812a8576a28078af106ecb90f' => __DIR__ . '/..' . '/leocavalcante/siler/src/Graphql/Graphql.php',
        'a9e8d1aa40eb759bf70c823f0dbeab03' => __DIR__ . '/..' . '/leocavalcante/siler/src/Http/Http.php',
        '9e4a9bcf2d310f409cea2bc9a3a8455b' => __DIR__ . '/..' . '/leocavalcante/siler/src/Http/Request.php',
        'c9f0fdbb3695ff6ec5eb95869c2c8da3' => __DIR__ . '/..' . '/leocavalcante/siler/src/Http/Response.php',
        '65f030ae2f0aef0673cd40c2a328f932' => __DIR__ . '/..' . '/leocavalcante/siler/src/Jwt/Jwt.php',
        'f19643525426fa39dc527eacf7def648' => __DIR__ . '/..' . '/leocavalcante/siler/src/Ratchet/Ratchet.php',
        'ae063a9e7311ba8f8f22a18f3fc99b14' => __DIR__ . '/..' . '/leocavalcante/siler/src/Route/Route.php',
        '671f27b10beca1fbee888aebc293e01d' => __DIR__ . '/..' . '/leocavalcante/siler/src/Siler.php',
        '8b2eeb0829fb552bb33e813f8894be3b' => __DIR__ . '/..' . '/leocavalcante/siler/src/Twig/Twig.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Siler\\' => 6,
        ),
        'O' => 
        array (
            'Overblog\\PromiseAdapter\\' => 24,
            'Overblog\\DataLoader\\' => 20,
        ),
        'G' => 
        array (
            'GraphQL\\' => 8,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Siler\\' => 
        array (
            0 => __DIR__ . '/..' . '/leocavalcante/siler/src',
        ),
        'Overblog\\PromiseAdapter\\' => 
        array (
            0 => __DIR__ . '/..' . '/overblog/dataloader-php/lib/promise-adapter/src',
        ),
        'Overblog\\DataLoader\\' => 
        array (
            0 => __DIR__ . '/..' . '/overblog/dataloader-php/src',
        ),
        'GraphQL\\' => 
        array (
            0 => __DIR__ . '/..' . '/webonyx/graphql-php/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit035aba712587403b69e3123139877271::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit035aba712587403b69e3123139877271::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
