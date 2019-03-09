import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import { cleanup } from 'react-testing-library';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import data from './testData';
import Count from '../client/components/CommentCount/commentCount';
import Input from '../client/components/Input/input';
import Profile from '../client/components/ProfilePicture/profilePicture';

configure({ adapter: new Adapter() });
beforeEach(cleanup);


describe('Count Component tests', () => {
  it('01- Matches Snapshot', () => {
    const props = { count: 100 };
    const wrapper = shallow(<Count {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('02- Text Matches Props', () => {
    const props = { count: 100 };
    const wrapper = shallow(<Count count={100} />);
    expect(wrapper.find('.commentCount').text()).toEqual('100 comments');
  });
});


describe('Input Component tests', () => {
  it('01- Matches Snapshot', () => {
    const props = { username: 'Test', image: data[0].profilePic };
    const wrapper = shallow(<Input {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('02- input value changes', () => {
    const props = { username: 'Test', image: data[0].profilePic };
    const wrapper = mount(<Input {...props} />);
    expect(toJson(wrapper.find('input')).props.value).toEqual('');
    wrapper.find('input').simulate('change', { target: { value: 'test' } });
    expect(toJson(wrapper.find('input')).props.value).toEqual('test');
  });


  describe('Profile Component tests', () => {
    it('01- Matches Snapshot', () => {
      const props = { image: data[0].image, followers: 100, username: 'Test' };
      const wrapper = mount(<Profile {...props} />);
    });

    it('02- Profile renders on hover', () => {
      const props = { image: data[0].image, followers: 100, username: 'Test' };
      const wrapper = mount(<Profile {...props} />);
      wrapper.simulate('mouseEnter');
      expect(toJson(wrapper.find('.profileContainer'))).not.toBe(null);
      wrapper.simulate('mouseleave');
      expect(toJson(wrapper.find('.profileContainer'))).toBe(null);
    });
  });
});
