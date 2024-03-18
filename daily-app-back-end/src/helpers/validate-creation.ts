export function validateCreation(type: string, value: string) {
  const regexValidation: any = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  }
  const isValid = regexValidation[type].test(value);
  if (isValid) return value;
  if (type === 'password') {
    throw new Error('Password must have minimum eight characters, at least one uppercase,one lower case, one number and special character')
  }
  throw new Error('Invalid email');
}