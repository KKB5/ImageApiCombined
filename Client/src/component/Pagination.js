import React, { useState, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { ImageContext } from '../App';

const Pagination = () => {
    
    const { setSetpage } = useContext(ImageContext);

    const handlePageClick = (data) => {
        setSetpage(data.selected + 1)
    }

    return (
        <div className='p-5'>
            <ReactPaginate previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={25}
                marginPagesDisplayed={3}
                pageRangeDisplayed={10}
                onPageChange={handlePageClick}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                containerClassName={'pagination justify-content-center'}
            />
        </div>
    )
}

export default Pagination