import React from 'react';
import Rating from '../Rating/Rating';
import config from '../config';
import './BookmarkItem.css';
import BookmarksContext from '../BookmarksContext';
import PropTypes from 'prop-types';

function deleteBookmarkRequest(bookmarkId, callback) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
  .then(res => {
    if(!res.ok) {
      // get error message
      return res.json().then(error => {
        throw error
      })
    }
    return res.json()
  })
  .then(data => {
    // call the callback when request is successful
    callback(bookmarkId)
  })
  .catch(error => {
    console.log(error)
  })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
    {(context) => (
      <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button
          className='BookmarkItem__description'
          onClick={() => deleteBookmarkRequest(props.id, context.deleteBookmark)}
        >
          Delete
        </button>
      </div>
    </li>
    )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
  rating: 1,
  description: ""
}

BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: (props, propName, componentName) => {
    const prop = props[propName];
    if(!prop) {
      return new Error(`${propName} is required in ${componentName}`)
    }
    if(typeof prop != 'string') {
      return new Error (`invalid prop, ${propName} is expected to be a string `)
    }

    if(prop.length < 5 || !prop.match(new RegExp(/^https?:\/\//))) {
      return new Error(`Invalid prop, ${propName} must be min length 5 and begin http(s)://. Validation failed`)
    }
  },
  rating: PropTypes.number,
  description: PropTypes.string
}
