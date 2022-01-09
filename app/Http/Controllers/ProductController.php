<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\ProductRepository;
use App\Models\Product;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class ProductController extends Controller
{
    protected $product;

    public function __construct(Product $product){
        $this->product             = new ProductRepository($product);
    }
    public function index(){
        return view('admin.manager.product');
    }
    public function get(){
        $data = $this->product->get_product();
        return $this->product->send_response(201, $data, null);
    }
    public function get_one($id){
        $data = $this->product->get_one($id);
        return $this->product->send_response(200, $data, null);
    }
    public function store(Request $request){
        $data = [
            "name"          => $request->data_name,
            "slug"          => $this->product->to_slug($request->data_name),
            "image"         => $this->product->imageInventor('image-upload', $request->file, 220),
            "prices"        => $request->data_prices,
        ];
        $data_return = $this->product->create($data);
        return $this->product->send_response(201, $data_return, null);
    }
    public function update(Request $request){
        $id                 = $request->data_id;
        
        $data_update   = [
            "name"        => $request->data_name,
            "slug"          => $this->product->to_slug($request->data_name),
            "prices"        => $request->data_prices,
        ];
        if ($request->file != "null") {
            $image_url             = $this->product->imageInventor('image-upload', $request->file, 500);
            $data_update['image']  = $image_url;
        }

        $this->product->update($data_update, $id);

        return $this->product->send_response(200, null, null);
    }
    public function delete($id){
        $data = $this->product->delete($id);
        return $this->product->send_response(200, "Delete successful", null);
    }

}
