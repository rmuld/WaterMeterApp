import bcrypt from 'bcrypt';

const saltRounds = process.env.SALTROUNDS || 10;

const hashService = {
    hash: async (password: string): Promise<string> => {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
      },
    compare: (password: string, hash: string): Promise<boolean> => {
        const match = bcrypt.compare(password, hash);
        return match;
    }
};

export default hashService;