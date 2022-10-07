import {updateObject,checkValidity} from '../../shared/utility'
describe("Utility functions testing",()=>{
    test("updateObject function should update new key value",()=>{
        // Arrange
        const oldObject={key1:"key1",key2:"key2",key3:"key3"}
        const updatedProperty={key2:"key2.2",key3:"key3.2"}
        const finalResult={key1:"key1",key2:"key2.2",key3:"key3.2"}
        // Action
        const response=updateObject(oldObject,updatedProperty)
        // Assert
        expect(response).toMatchObject(finalResult)
    })
    test("checkValidaty should return false of string is empty and required is set",()=>{
        expect(checkValidity('',{required:true})).toBeFalsy()
    })
    test("checkValidaty should return false if min or max length not match",()=>{
        expect(checkValidity('a',{minLength:2})).toBeFalsy()
        expect(checkValidity('a2',{maxLength:1})).toBeFalsy()
    })
    test("checkValidaty should validate email correctly",()=>{
        expect(checkValidity('a',{isEmail:true})).toBeFalsy()
        expect(checkValidity('a@gmail.com',{isEmail:true})).toBeTruthy()
    })
    test("checkValidaty should validate number correctly",()=>{
        expect(checkValidity(2,{isNumeric:true})).toBeTruthy()
        expect(checkValidity('a@gmail.com',{isNumeric:true})).toBeFalsy()
    })
})