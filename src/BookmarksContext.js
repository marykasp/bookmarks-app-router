import React, { Component } from 'react';

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: () => {}
})

export default BookmarksContext;