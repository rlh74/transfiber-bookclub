import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CollectionItem extends Component {

  removeFromCollection = () => {
    const book = this.props.book
    this.props.dispatch({type: 'REMOVE_FROM_COLLECTION', payload: book.book_id})
  }

  render() {
      const book = this.props.book
    return (
      <div>
          {book.img_url ? <img src={book.img_url} alt="thumbnail"></img> : ''}
          {book.title ? book.title : ''}, {book.author}, {book.publisher}, {book.publishe_date}, {book.description ? book.description : 'N/A'}, {book.pageCount}
          <button onClick={this.removeFromCollection}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(CollectionItem));
