import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter : new Adapter()})
describe('<NavigationItems />',()=>{
   it('should render two <NavigationItem /> element if not authenticated',()=>{
      const wrapper=shallow(<NavigationItems isAuthenticated={false}/>)
      expect(wrapper.find(NavigationItem)).toHaveLength(2);
   }) 

   it('should render three <NavigationItem /> element if  authenticated',()=>{
      const wrapper=shallow(<NavigationItems isAuthenticated={true}/>)
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
   }) 
})