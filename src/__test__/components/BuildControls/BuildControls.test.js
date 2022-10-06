import {render, screen, } from '@testing-library/react';
import BuildControls from '../../../components/BuildControls/BuildControl'
import userEvent from '@testing-library/user-event';


describe("<BuildControls /> testing",()=>{
    test("should show signup button when not authorize",()=>{
        render(<BuildControls disabled={false} price={100} isAuth={false}/>)
        expect(screen.getByText(/SIGNUP TO ORDER/)).toBeInTheDocument()
    })
    test("should show order button when authorize",()=>{
        render(<BuildControls disabled={false} price={100} isAuth={true}/>)
        screen.debug()
        expect(screen.getByText(/ORDER NOW/)).toBeInTheDocument()
    })
})
