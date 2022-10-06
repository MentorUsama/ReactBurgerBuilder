import {render, screen, } from '@testing-library/react';
import BuildControls from '../../../components/BuildControls/BuildControl'

describe("<BuildControls /> testing",()=>{
    test("should show signup button when not authorize",()=>{
        render(<BuildControls disabled={false} price={100} isAuth={false}/>)
        expect(screen.getByText(/SIGNUP TO ORDER/)).toBeInTheDocument()
    })
    test("should show order button when authorize",()=>{
        render(<BuildControls disabled={false} price={100} isAuth={true}/>)
        expect(screen.getByText(/ORDER NOW/)).toBeInTheDocument()
    })
})
