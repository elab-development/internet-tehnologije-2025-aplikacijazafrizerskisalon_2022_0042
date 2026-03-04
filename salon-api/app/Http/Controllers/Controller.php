<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="Salon API",
 *     version="1.0.0",
 *     description="API za upravljanje frizerskim salonom"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer"
 * )
 * @OA\PathItem(path="/api")
 */
abstract class Controller
{
    //
}