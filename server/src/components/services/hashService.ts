import bcrypt from 'bcrypt';

let saltRounds: number;

const hash = async (password: string): Promise<string> => {
    if (process.env.SALT_ROUNDS) {
        saltRounds = parseInt(process.env.SALT_ROUNDS)
    } else {
    throw new Error("saltRounds environment variable is not set")
    }

    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}
    
const compare = (password: string, hash: string): Promise<boolean> => {
    const match = bcrypt.compare(password, hash);
    return match;
}
    
const hashService = {
    hash,
    compare
};

export default hashService;