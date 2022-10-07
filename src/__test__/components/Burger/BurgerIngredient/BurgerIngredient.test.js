import {render } from '@testing-library/react';
import BurgerIngredient from "../../../../components/Burger/BurgerIngredient/BurgerIngredient"

describe("Burger Ingredients test",()=>{
    test("should return null for unknown burger ingredients",()=>{
        const {container}=render(<BurgerIngredient type='unknown ingredients'/>)
        expect(container.hasChildNodes()).toBeFalsy()
    })
    test("should return something if right props passed",()=>{
        var {container:container_1}=render(<BurgerIngredient type='bread-bottom'/>)
        expect(container_1.hasChildNodes()).toBeTruthy()

        const {container:container_2}=render(<BurgerIngredient type='bread-top'/>)
        expect(container_2.hasChildNodes()).toBeTruthy()

        const {container:container_3}=render(<BurgerIngredient type='meat'/>)
        expect(container_3.hasChildNodes()).toBeTruthy()

        const {container:container_4}=render(<BurgerIngredient type='cheese'/>)
        expect(container_4.hasChildNodes()).toBeTruthy()

        const {container:container_5}=render(<BurgerIngredient type='salad'/>)
        expect(container_5.hasChildNodes()).toBeTruthy()

        const {container:container_6}=render(<BurgerIngredient type='bacon'/>)
        expect(container_6.hasChildNodes()).toBeTruthy()
    })
})
