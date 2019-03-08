import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faReply, faCommentAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Comment from './comment';
import CommentCount from './components/CommentCount/commentCount.jsx';
import * as _ from 'lodash';
import moment from 'moment';
import Loader from './components/Loader/loader';
import axios from 'axios';

library.add(faReply);
library.add(faUserFriends);
library.add(faCommentAlt);

export default class CommentSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      count: '',
      displayedComments: [],
      commentCount: 20, 
      loading: true
    };
  }


  componentDidMount() {
    this.getComments();
    this.getCommentCount();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  getComments = () => {
    axios.get(`${window.location.pathname}/comments`)
    .then((res) => {
      console.log(res);
      const sortedComments = _.sortBy(res.data, (i) => {
        return new moment(i.postedAt)
      }).reverse();
      console.log(sortedComments);
      this.setState({
        comments: sortedComments
      })
    })
    .then(() => {
      this.renderComments()
    })
  }

  getCommentCount = () => {
    axios.get(`${window.location.pathname}/commentCount`)
    .then((response) => {
      this.setState({
        count: response.data.count
      })
    })
  }

  handleScroll = () => {
    if(this.state.commentCount !== this.state.comments.length){
      if(this.state.commentCount + 20 > this.state.comments.length){
        this.setState(state => {
          state.loading = false
          state.commentCount = state.commentCount = this.state.comments.length;
        }, () => this.renderComments());
      }else{
        // this.setState(state => state.commentCount = state.commentCount + 20, () => this.renderComments());
        this.setState(state => {
          state.commentCount = state.commentCount = state.commentCount + 20;
        }, () => this.renderComments());
      }
    }
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) 
    ) {
      this.handleScroll()
    }
  }
  
  renderComments = () => {
    this.setState({displayedComments: []}, () => {
      for (let i = 0; i < this.state.commentCount; i++) {
        this.setState(state => {
          return state.displayedComments.push(state.comments[i])
        })
      }
    })
  }

  render() {
    return (
      <div style={{paddingLeft: '50px'}} className={'containerKevin'} onScroll={this.handleScroll}>
      {this.state.count &&
        <CommentCount className='commentCount' count={this.state.count} />
      }
      {this.state.displayedComments && 
      this.state.displayedComments.map((i, index) => (
        <Comment 
        key={index}
        image={i.profilePic}
        username={i.username}
        songTime={i.songTime}
        comment={i.message}
        followers={i.followers}
        postedAt={i.postedAt}
        />
      ))}
        <Loader loading={this.state.loading} />
      </div>
    );
  }
}
