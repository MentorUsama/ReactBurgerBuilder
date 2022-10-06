import {render, screen, } from '@testing-library/react';
import BuildControl from '../../../../components/BuildControls/BuildControl/BuildControl'
import userEvent from '@testing-library/user-event';


describe("<BuildControl /> testing",()=>{
    test("There should be a two buttons for increment and decrement",()=>{
        render(<BuildControl disabled={true} />)
        expect(screen.queryAllByRole('button')).toHaveLength(2)
    })
    test("label prop should be shown",()=>{
        render(<BuildControl label='label' disabled={true} />)
        expect(screen.queryByText('label')).toBeInTheDocument()
    })
    test("Ingredient removed button should not be clicked when disabled",()=>{
        const ingredientsRemoved=jest.fn()
        render(<BuildControl disabled={true} ingredientsRemoved={ingredientsRemoved} />)
        userEvent.click(screen.getByText('Less'))
        expect(ingredientsRemoved).toBeCalledTimes(0)
    })
    test("Ingredient removed button should be called when not disabled",()=>{
        const ingredientsRemoved=jest.fn()
        render(<BuildControl disabled={false} ingredientsRemoved={ingredientsRemoved} />)
        userEvent.click(screen.getByText('Less'))
        expect(ingredientsRemoved).toBeCalledTimes(1)
    })
})