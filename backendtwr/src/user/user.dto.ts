
export class UserDTO {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    region: string;
    country: string;
    position: string;
}

export type Country= 'India' | 'Pakistan' | 'Bangladesh' | 'Srilanka' | 'Nepal';
export type Position= 'Donor' | 'ID' | 'CEO' | 'RO' | 'COORDINATOR' | 'MANAGER' | 'EXECUTIVE';

// {
//     "email": "samuelj123@gmail.com",
//     "password": "samuelj123@gmail.com",
//     "firstname": "samuelj123@gmail.com",
//     "lastname": "samuelj123@gmail.com",
//     "region": ["samuelj123@gmail.com"],
//     "country": ["India"],
//     "position": ["ceo"]
//     }
