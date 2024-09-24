import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets'
import '../pages/collection.css'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const Collection = () => {
const {products, search, showSearch}=useContext(ShopContext);
const[showFilter, setShowFilter]= useState(false);
const [filterProducts, setFilterProducts] = useState([]);
const [category, setCategory] =useState([]);
const[subCategory, setSubCategory]=useState([]);
const[sortType, setSortType]=useState('relevant');

{/**to add products in category we are using toggle function so that 
  when we click to add to a cateogry section then products will added to it   */}
  const toggleCategory=(e)=>{
 if(category.includes(e.target.value)){
 setCategory(prev=>prev.filter(item=>item !== e.target.value))
 }
 else{
  setCategory(prev=>[...prev, e.target.value])
 }
  }
const toggleSubCategory=(e)=>{
if(subCategory.includes(e.target.value)){
  setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
}
else{
  setSubCategory(prev=>[...prev, e.target.value])
}
}


const applyFilter = ()=>{
  let productsCopy= products.slice();
  if(showSearch && search){
    productsCopy= productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
  }
  if(category.length>0){
    productsCopy = productsCopy.filter(item=> category.includes(item.category));

  }
  if(subCategory.length>0){
    productsCopy= productsCopy.filter(item=>subCategory.includes(item.subCategory))
  }
setFilterProducts(productsCopy)

}

const sortProducts = ()=>{

  let fpCopy= filterProducts.slice();{/**it is use to make a copy of products after applying filter */}

  switch(sortType){
    case 'low-high':
      setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
      break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
         break;

        default:
          applyFilter();
          break;
  }

}

useEffect(()=>{
setFilterProducts(products)
},[])


useEffect(()=>{
console.log(category);
},[category])
{/**whenever the products will be updates or filters will be updated the below function will run to handle the situation */}
useEffect(()=>{
  applyFilter();
  },[category,subCategory, search,showSearch])

useEffect(()=>{
console.log(subCategory)
},[subCategory])

useEffect(()=>{
sortProducts();
},[sortType])
  {/** using context api we fetch the data so that we can use it in our collection section */}
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border'>
      
      {/** filter option s are created so that we can apply it to filter products */}
      <div className="min-w-60">
        <div className="filter-box">
        <p onClick={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
        </div>
       
        
       
        {/** Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden' } sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>

        {/** subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden' } sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>

{/**write side functions  */}
<div className="flex-1">
  <div className="flex justify-between text-base sm:text-2xl mb-4">
  <Title text1={'ALL'} text2={'COLLECTIONS'}/>
  {/**PRODUCT SHORt */}
  <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2' >
    <option value="relevant">Sort by: Relavent</option>
    <option value="low-high">Sort by: Low to High</option>
    <option value="high-low">Sort by: High to Low </option>
  </select>
  </div>
{/**product display  */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
{
  filterProducts.map((item,index)=>(
    <ProductItem key={index}
     id={item._id}
     name={item.name}
     price={item.price}
     image={item.image}
     />
  ))
}
</div>
</div>

    </div>
  )
}

export default Collection
