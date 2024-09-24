import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {
    const {products}= useContext(ShopContext);
    const [bestSeller, setBestSeller]=useState([]);

    useEffect(()=>{
        const bestProducts= products.filter((item)=>(item.bestSeller));
        setBestSeller(products.slice(0,5));
    },[])
    console.log('hello')
  return (
    <div className='my-10'>
        <div className="text-center text-3xl py-8">
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='W-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            "Explore our best-selling luxury clothing collection, crafted with premium materials and timeless designs"
            </p>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
      { 
          bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller
