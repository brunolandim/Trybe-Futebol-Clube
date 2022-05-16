export default interface IUser {
    id: number;
    username: string;
    role: string;
    email: string;
    password:string;
} 

export default interface IJwtPayload {
    username: string;
    password:string;
}
