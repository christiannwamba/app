import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import Comment from './Comment';

const SAD_EMOJI = [55357, 56864];
const HAPPY_EMOJI = [55357, 56832];
const NEUTRAL_EMOJI = [55357, 56848];

class CommentsWidget extends Component {

  state = { comments: [], person: null }

  componentDidMount() {
    this.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER,
      encrypted: true
    });

    this.channel = this.pusher.subscribe('post-comments');

    this.channel.bind('new-comment', ({ comment = null }) => {
      const { comments } = this.state;
      comment && comments.push(comment);
      this.setState({ comments });
    });

    this.pusher.connection.bind('connected', () => {
      axios.post('/comments')
        .then(response => {
          const comments = response.data.comments;
          this.setState({ comments });
        });
    })
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

  handleKeyUp = evt => {
    const value = evt.target.value;

    if (evt.keyCode === 13 && !evt.shiftKey) {
      const { person } = this.state;
      const comment = { person, comment: value, timestamp: +new Date };

      evt.target.value = '';
      this.setState({ person: null }, () => axios.post('/comment', comment));
    }
  }

  render() {

    const people = [ 'Stephanie', 'John', 'Steve', 'Anna', 'Margaret', 'Felix', 'Chris', 'Jamie', 'Rose', 'Bob', 'Vanessa', '9lad', 'Bridget', 'Sebastian', 'Richard' ];

    const nameBadgeStyles = {
      fontSize: '0.8rem',
      height: 40,
      borderRadius: 20,
      cursor: 'pointer'
    };

    const choosePersona = person => evt => this.setState({ person });

    const randomPeople = count => {
      const selected = [];
      let i = 0;

      count = Math.max(0, Math.min(count, people.length));

      while (i < count) {
        const index = Math.floor(Math.random() * people.length);
        if (selected.includes(index)) continue;
        ++i && selected.push(index);
      }

      return selected.map(index => {
        const person = people[index];
        const className = 'd-block d-flex align-items-center text-center text-white bg-secondary font-weight-bold py-2 px-4 mr-3';

        return <span key={index} className={className} style={nameBadgeStyles} title={person} onClick={choosePersona(person)}>{person}</span>
      });
    };

    return <Fragment>

      <div className="border-bottom border-gray w-100 px-2 d-flex align-items-center bg-white justify-content-between" style={{ height: 90 }}>
        <h2 className="text-dark mb-0 mx-4">Comments</h2>
        <span class="badge badge-pill badge-primary mx-4" style={{ fontSize: '1.2rem' }}>{ this.state.comments.length }</span>
      </div>

      <div className="px-4 pb-4 w-100 d-flex flex-row flex-wrap align-items-start align-content-start position-relative" style={{ height: 'calc(100% - 250px)', overflowY: 'scroll' }}>

        { this.state.comments.map((comment, index) => {

          const mood = comment.sentiment > 0 ? HAPPY_EMOJI : (comment.sentiment === 0 ? NEUTRAL_EMOJI : SAD_EMOJI);

          return (
            <Fragment key={index}>

              <div className={`d-flex justify-content-start align-items-center w-100 font-weight-bold text-dark mt-4 pb-1 px-1`} style={{ fontSize: '0.9rem' }}>
                <span className="d-inline-block pr-1" style={{ fontSize: '1.25rem' }}>{String.fromCodePoint(...mood)}</span>
                <span className="align-middle" style={{ lineHeight: '1.25rem' }}>{comment.person || 'Anonymous'}</span>
              </div>

              <Comment text={comment.comment} />

            </Fragment>
          );

        }) }

      </div>

      <div className="border-top border-gray w-100 px-4 d-flex flex-wrap align-items-center align-content-center bg-light" style={{ height: 160 }}>
        { !this.state.person && <span className="text-dark py-2" style={{ fontSize: '1.5rem', fontWeight: 500 }}>Choose your Persona</span> }
        <div className="w-100 py-2 pb-3 d-flex justify-content-start">
          {
            this.state.person
              ? <span className="d-block d-flex align-items-center text-center text-white bg-primary font-weight-bold py-2 px-4 mr-3" style={nameBadgeStyles} title={this.state.person}>{this.state.person}</span>
              : randomPeople(4)
          }
        </div>
        { this.state.person && <textarea className="form-control px-3 py-2" onKeyUp={this.handleKeyUp} placeholder="Make a comment" style={{ resize: 'none' }}></textarea> }
      </div>

    </Fragment>
  }

};

export default CommentsWidget;
