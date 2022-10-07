import NavigationItems from "../../../../components/Navigation/NavigationItems/NavigationItems";
import {render,screen } from '@testing-library/react';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
      ...originalModule,
      NavLink: props => <div >{props.children}</div>
    };
  });
describe("NavigationItems testing",()=>{
    test("Order navigation item should not be shown when not authenticated",()=>{
        render(<NavigationItems isAuthenticated={false} />)
        expect(screen.queryByText(/Orders/)).toBeNull()
    })
    test("Logout should not be shown if not authenticated",()=>{
        render(<NavigationItems isAuthenticated={false} />)
        expect(screen.queryByText(/Logout/)).toBeNull()
    })
})
