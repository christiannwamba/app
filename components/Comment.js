import React, { Component } from 'react';

class Comment extends Component {

  render() {
    const { text } = this.props;

    return <div className="w-100 mx-4 d-flex">
      <div className="w-100 px-2">
        <span className="d-block text-secondary" style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{text}</span>
      </div>
    </div>
  }

}

export default Comment;
