import Burger from '../../../components/Burger/Burger'
import {render,screen } from '@testing-library/react';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
      ...originalModule,
      withRouter: jest.fn( Component => props => <Component {...props} /> ),};
  });
describe("Burger component testing",()=>{
    test("There should be atleast two ingredients if no ingredeint passed",()=>{
        render(<Burger ingredients={{salad: 0, bacon: 0, cheese:0, meat: 0}}/>)
        expect(screen.getAllByTestId('BurgerIngredient')).toHaveLength(2)
    })
    test("There should be total 6 ingredients if each ingredients passed",()=>{
        render(<Burger ingredients={{salad: 1, bacon: 1, cheese:1, meat: 1}}/>)
        expect(screen.getAllByTestId('BurgerIngredient')).toHaveLength(6)
    })
})

