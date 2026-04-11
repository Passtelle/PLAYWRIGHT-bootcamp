import { fakerEN_US as faker } from '@faker-js/faker';

export interface UserData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;   // Full name: 'Texas', 'California'
  zipCode: string; // US 5-digit: '90210'
  phone: string;   // Raw digits only: '5551234567'
  ssn: string;     // Formatted: 'XXX-XX-XXXX'
}

export function generateUserData(): UserData {
  const ssnPart1: string = faker.string.numeric(3);
  const ssnPart2: string = faker.string.numeric(2);
  const ssnPart3: string = faker.string.numeric(4);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number({ style: 'human' }).replace(/\D/g, ''),
    ssn: `${ssnPart1}-${ssnPart2}-${ssnPart3}`,
  };
}

export function generateUniqueUsername(): string {
  return `user_${Date.now()}`;
}
