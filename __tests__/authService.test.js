process.env.JWT_SECRET = 'minha_chave_teste';

jest.mock('jsonwebtoken');

const jwt = require('jsonwebtoken');

const { generateToken, verifyToken } = require('../src/utils/jwt');

describe('JWT Utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('generateToken deve chamar jwt.sign com payload, secret e expiresIn', () => {

        const payload = { sub: 1, email: 'user@example.com' };
        jwt.sign.mockReturnValue('fake.token');

        const token = generateToken(payload);

        expect(jwt.sign).toHaveBeenCalledWith(
            payload,
            'minha_chave_teste',
            { expiresIn: '1d' }
        );
        expect(token).toBe('fake.token');
    });

    it('verifyToken deve chamar jwt.verify com token e secret', () => {

        const decoded = { sub: 1, email: 'user@example.com' };
        jwt.verify.mockReturnValue(decoded);

        const result = verifyToken('fake.token');

        expect(jwt.verify).toHaveBeenCalledWith(
            'fake.token',
            'minha_chave_teste'
        );
        expect(result).toEqual(decoded);
    });
});
