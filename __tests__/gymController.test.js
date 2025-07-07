jest.mock('../src/models', () => ({
    Gym: {
        create: jest.fn(),
        findByPk: jest.fn()
    }
}));

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => { }));
afterAll(() => console.error.mockRestore());

const { Gym } = require('../src/models');
const gymController = require('../src/controllers/gymController');

describe('gymController.createGym', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            body: {
                name: ' Academia X ',
                email: ' owner@example.com ',
                password: ' secret123 ',
                endereco: ' Rua Y, 123 ',
                ocupacaoMaxima: '50'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('deve criar a academia com trim e mapping correto', async () => {
        const created = {
            id: 7,
            name: 'Academia X',
            email: 'owner@example.com',
            address: 'Rua Y, 123',
            capacity: 50
        };
        Gym.create.mockResolvedValue(created);

        await gymController.createGym(req, res);

        expect(Gym.create).toHaveBeenCalledWith({
            name: 'Academia X',
            email: 'owner@example.com',
            password: 'secret123',
            address: 'Rua Y, 123',
            capacity: 50
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: 7,
            name: 'Academia X',
            email: 'owner@example.com',
            address: 'Rua Y, 123',
            capacity: 50
        });
    });

    it('deve retornar 400 se faltar algum campo obrigatório', async () => {
        req.body = { name: '', email: '', password: '', endereco: '', ocupacaoMaxima: '' };

        await gymController.createGym(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'name, email, password, endereco e ocupacaoMaxima são obrigatórios'
        });
    });

    it('deve responder 500 com mensagem e detalhes se o create falhar', async () => {
        Gym.create.mockRejectedValue(new Error('DB fail'));

        await gymController.createGym(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Erro ao criar academia',
            details: 'DB fail'
        });
    });
});

describe('gymController.updateGym', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            params: { id: '3' },
            body: { name: ' Nova Gym ', address: ' Av. Nova, 456 ' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('deve retornar 404 se a academia não for encontrada', async () => {
        Gym.findByPk.mockResolvedValue(null);

        await gymController.updateGym(req, res);

        expect(Gym.findByPk).toHaveBeenCalledWith('3');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Academia não encontrada' });
    });

    it('deve aplicar trim, chamar instance.update e retornar o objeto', async () => {
        const instance = {
            id: 3,
            name: 'Old Gym',
            address: 'Old Address',
            update: jest.fn().mockResolvedValue()
        };
        Gym.findByPk.mockResolvedValue(instance);

        await gymController.updateGym(req, res);

        expect(Gym.findByPk).toHaveBeenCalledWith('3');
        expect(instance.update).toHaveBeenCalledWith({
            name: 'Nova Gym',
            address: 'Av. Nova, 456'
        });
        expect(res.json).toHaveBeenCalledWith(instance);
    });

    it('deve responder 500 se o update lançar erro', async () => {
        Gym.findByPk.mockRejectedValue(new Error('crash'));

        await gymController.updateGym(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Erro ao atualizar academia',
            details: 'crash'
        });
    });
});
