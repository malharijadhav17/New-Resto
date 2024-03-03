import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaEdit, FaTrash,FaSearch,FaPlus } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useState,useEffect } from 'react';
import Rash from '../data/rash.jpg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// import { useStateContext } from "../contexts/ContextProvider";


const RelationshipDetails = () => {

  
const [RelationShipData, setRelationShipData] = useState([]);

const fetchDataToday = async () => {
  try {
    axios.get('http://127.0.0.1:8000/api/getRelationShipToday')
    .then((res) => {
      console.log(res.data);
      setRelationShipData(res.data);

    })
    .catch((error) => {
      console.log(error.response.data);

    });
    
  } catch (error) {
    console.log('Error:', error.response.data);
  }
};

const activeLink =
  "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
const normalLink =
  "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  
const ITEMS_PER_PAGE = 6; // Number of shops to display per page
const ROW_ITEMS = 3; // Number of shops per row


  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedShops = RelationShipData?.slice(offset, offset + ITEMS_PER_PAGE);

  const pageCount = Math.ceil(RelationShipData?.length / ITEMS_PER_PAGE);

  // Group shops into rows
  const rows = [];
  for (let i = 0; i < ROW_ITEMS; i++) {
    const row = [];
    for (let j = i; j < paginatedShops?.length; j += ROW_ITEMS) {
      row.push(paginatedShops[j]);
    }
    rows.push(row);
  }


  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`inline-block px-3 py-1 ${
            currentPage === i ? 'font-bold' : ''
          }`}
          onClick={() => handlePageChange({ selected: i })}
        >
          {i + 1}
        </li>
      );
    }
    return pageNumbers;
  };


  useEffect(() => {
    fetchDataToday();
  }, []);

  const getImageUrl = (imagePath) => {
    const baseUrl = "http://127.0.0.1:8000/"; // Replace with your base URL
    return baseUrl + imagePath;
  };
  
  return (

<div className="m-2 mt-20 p-2">
  <div className="border-gray-400 shadow-lg rounded">
    <div className="bg-gray-700 font-bold text-white p-2 rounded-t">
      Search Relationship Partner
    </div>
    <div className="p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex flex-col items-center sm:flex-row gap-4 mb-4 sm:mb-0">
        <input
          type="date"
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          placeholder="From"
        />
        <input
          type="date"
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          placeholder="To"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
  <FaSearch className="mr-2" />
  <span>Search</span>
</button>
<input
          type="text"
          className="bg-white focus:outline-none mr-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block mb-4 sm:mb-0 appearance-none leading-normal"
          placeholder="Search"
        />
        <select
          className="bg-white focus:outline-none mr-2 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
        >
          <option value="">All</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="flex flex-col  sm:flex-row mt-4 sm:mt-0">
        
        
      <NavLink to="/AddNewRelationship" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center" activeClassName="active">
      <FaPlus  className="mr-2" />
      <span>Add New</span>
    </NavLink>

      </div>
    </div>
  </div>


      {/* ShopList */}
      <div className="mt-3 overflow-x-auto">
        <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              {RelationShipData && RelationShipData.map((items, index) => (
                <div key={items.id} className="mx-3 mt-4 mb-5 sm:mb-0 shadow-lg">
                  <div className="border-gray-400 rounded-lg">
                    <div className="bg-gray-700 font-bold text-white p-2 rounded-t flex items-center">
                      <h2>{items.ShopName}</h2>
                    </div>                    
                    <div className="p-4 sm:flex sm:flex-row sm:justify-between">
                      <div className="mb-4 sm:mr-4 sm:w-1/3">
                      {/* <img
            className="w-full h-auto rounded mb-4 sm:mb-0" src={getImageUrl(imagePath)} alt="Image"
               /> */}
                      </div>
                      <div className="sm:w-2/3">
                        <div className="text-center">
                          <h3 className='font-bold'>{items.ShopType}</h3>
                        </div>
                        <div className="mb-4">
                          <p className="font-bold">Contact:</p>
                          <p>{items.OwnerContact}</p>
                        </div>
                        <div className="mb-4">
                          <p className="font-bold">Address:</p>
                          <p>{items.Address}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="flex items-center">
                          <button className="mr-6 text-blue-500 absolute bottom-0 right-0">
                            <FaEdit  size={17}/>
                          </button>
                          <button className="mr-0 text-red-500 absolute bottom-0 right-0">
                            <FaTrash size={17}/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-5">
          <ul className="flex items-center">
            {currentPage > 0 && (
              <>
                <li
                  className="inline-block px-3 py-1"
                  onClick={() => handlePageChange({ selected: 0 })}
                >
                  <FaAngleDoubleLeft />
                </li>
                <li
                  className="inline-block px-3 py-1"
                  onClick={() => handlePageChange({ selected: currentPage - 1 })}
                >
                  <FaAngleLeft />
                </li>
              </>
            )}
            {renderPageNumbers()}
            {currentPage < pageCount - 1 && (
              <>
                <li
                  className="inline-block px-3 py-1"
                  onClick={() => handlePageChange({ selected: currentPage + 1 })}
                >
                  <FaAngleRight />
                </li>
                <li
                  className="inline-block px-3 py-1"
                  onClick={() => handlePageChange({ selected: pageCount - 1 })}
                >
                  <FaAngleDoubleRight />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RelationshipDetails;
