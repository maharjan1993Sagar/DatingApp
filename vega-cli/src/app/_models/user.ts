import { Photo } from './Photo';

export interface User {
    id: number;
    age: number;
    username: string;
    knownAs: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    photos: Photo[];
    interests?: string;
    introduction?: string;
    lookingFor?: string;
}
