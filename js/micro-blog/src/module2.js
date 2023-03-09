export const person = {
    name: 'Alberuni',
    email: 'azad.bbc@gmail.com'
}

export const person2 = {
    name: 'Zenaul',
    email: 'zenaul@gmail.com'
}

const person3 = {
    name: 'Ashim',
    email: 'ashim@gmail.com'
}

export default person3; // exporting the person3 module into the file, so don't need to use {} where it is calling

export function sayHello(){
    return `Hello ${person2.name}`; 
}