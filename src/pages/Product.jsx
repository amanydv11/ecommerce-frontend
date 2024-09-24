import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {

  const{productId}= useParams();
  console.log(productId)
  const{products, currency,addToCart}=useContext(ShopContext);
  const[productData, setProductData]=useState(false);
  const[image,setImage]=useState('')
  const[size,setSize]=useState('')
  const fetchProductData= async()=>{
  products.map((item)=>{
    if(item._id=== productId){
      setProductData(item)
      setImage(item.image[0])
      return null;
    }
  })
  }
  useEffect(()=>{
fetchProductData();
  },[productId,products])
  return productData?  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
<div className="flex gap-10 sm:gap-10 flex-col sm:flex-row">
  <div className="flex  flex-col-reverse gap-3 sm:flex-row">
    <div className=" flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[17.8%] w-full">
 {
  productData.image.map((item,index)=>(
    <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
  ))
 }
    </div>
    <div className="w-full sm:w-[80%]">
      <img className='w-full h-auto' src={image} alt="" />
    </div>
  </div>
  {/**............product infomation........ */}
  <div className=" flex-2">
    <h1 className='font-medium text-xl mt-2'>{productData.name}</h1>
    <div className="flex items-center gap-1 mt-2">
      <img src={assets.star_icon} alt="" className="w-3 5" />
      <img src={assets.star_icon} alt="" className="w-3 5" />
      <img src={assets.star_icon} alt="" className="w-3 5" />
      <img src={assets.star_icon} alt="" className="w-3 5" />
      <img src={assets.star_dull_icon} alt="" className="w-3 5" />
      <p className='pl-2'>(122)</p>
    </div>
    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
 <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
 <div className="flex flex-col gap-4 my-8">
  <p>Select Size</p>
  <div className="flex gap-4">
    {productData.sizes.map((item,index)=>(
      <button onClick={()=>setSize(item)} className={`border py-2 px-3.5 bg-gray-100 ${item===size? 'border-orange-500': ''}`} key={index}>{item}</button>
    ))}
  </div>
 </div>
 <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
 <hr className='mt-8 sm:w-4/5'/>
 <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
  <p>100% Original product.</p>
  <p>Cash on delivery is available on this product.</p>
  <p>Easy return and exchange policy within 7 days.</p>

 </div>
 </div>
  </div>
  {/**review and discription section */}
  <div className="mt-20">
    <div className="flex">
      <b className='border px-5 py-3 text-sm'>Description</b>
      <p className='border text-gray-500 px-5 py-3 text-sm'>Reviews(122)</p>
    </div>
    <div className="border gap-4 px-6 py-6 text-sm text-gray-500">
      <p>Welcome to our luxury clothing e-commerce website, where timeless style meets modern sophistication. We offer an exclusive range of meticulously crafted apparel, designed for those who appreciate quality, elegance, and unparalleled craftsmanship. Our collection is carefully curated to bring you the finest in fashion, blending classic designs with contemporary trends to create wardrobe staples that last.</p>
      <br></br>
      <p>Join us in celebrating the art of fashion, and explore our collection to discover pieces that are crafted to make you look and feel your best. Elevate your wardrobe with the best in luxury fashion</p>
    </div>
    </div>
    {/**display related products  */}
    <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ):<div className='opacity-0'></div>
}

export default Product
