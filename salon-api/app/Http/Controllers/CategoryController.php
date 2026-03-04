<?php
namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;
class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categories",
     *     summary="Lista svih kategorija",
     *     tags={"Kategorije"},
     *     @OA\Response(response=200, description="Lista kategorija")
     * )
     */
    public function index()
    {
        return response()->json(Category::all());
    }
}