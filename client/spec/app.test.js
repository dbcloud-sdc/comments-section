/* eslint-disable import/no-named-as-default */
// /* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import { cleanup } from 'react-testing-library';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import App from '../client/app';
import Comment from '../client/comment';
import data from './testData';


configure({ adapter: new Adapter() });
beforeEach(cleanup);
const AppComponent = mount(<App />);
AppComponent.state().comments = data;
AppComponent.state().displayedComments = data;
AppComponent.state().count = 90;
AppComponent.onScroll = jest.fn();
AppComponent.handleScroll = jest.fn();
AppComponent.instance().forceUpdate();
AppComponent.update();

describe('basic render test', () => {
  it('01- renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('App Component tests', () => {
  it('01- Matches Snapshot', () => {
    expect(toJson(AppComponent)).toMatchSnapshot();
  });

  it('02- Has correct state', () => {
    expect(AppComponent.state()).not.toBe(null);
  });

  it('03- Renders Children', () => {
    expect(AppComponent.find('Comment')).not.toBe(null);
    expect(AppComponent.find('Loader')).not.toBe(null);
    expect(AppComponent.find('CommentCount')).not.toBe(null);
  });

  it('04- Calls component functions', () => {
    console.log(toJson(AppComponent.find('.container')).props.onScroll);
    toJson(AppComponent.find('.container')).props.onScroll();

    expect(toJson(AppComponent.find('.container')).props.onScroll).not.toBeFalsy();
  });
});

describe('Comment Component tests', () => {
  it('01- Comment Component renders Correctly', () => {
    const singleComment = data[0];
    const wrapper = mount(<Comment
      image={singleComment.profilePic}
      username={singleComment.username}
      songTime={singleComment.songTime}
      comment={singleComment.message}
      followers={singleComment.followers}
      postedAt={singleComment.postedAt}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('02- renders mouse events', () => {
    const singleComment = data[0];
    const wrapper = mount(
      <Comment
        image={singleComment.profilePic}
        username={singleComment.username}
        songTime={singleComment.songTime}
        comment={singleComment.message}
        followers={singleComment.followers}
        postedAt={singleComment.postedAt}
      />,
    );
    wrapper.simulate('mouseEnter');
    expect(toJson(wrapper.find('.reply-container'))).not.toBe(null);
    wrapper.simulate('mouseleave');
    expect(toJson(wrapper.find('.reply-container'))).toBe(null);
  });
});
