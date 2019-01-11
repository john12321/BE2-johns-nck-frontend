import React, { Component } from 'react';

class PagesNav extends Component {
  state = {
    articles: [],
    currentPage: 1,
    lastPage: false,

  };

  render() {
    return (
      <div>
        <button
          className='leftButton'
        // onClick={this.handlePrevPage}
        // disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className='rightButton'
        // onClick={this.handleNextPage}
        // disabled={lastPage === true}
        >
          Next Page
        </button>
      </div>
    );

  }
}

export default PagesNav;