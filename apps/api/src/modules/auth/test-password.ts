import {
    hashPassword,
    verifyPassword,
} from './password.js'

const password = 'my-secret-password'

const hash = await hashPassword(password)

console.log('Password hash:')
console.log(hash)

console.log(
    'Correct password:',
    await verifyPassword(password, hash),
)

console.log(
    'Wrong password:',
    await verifyPassword('wrong-password', hash),
)