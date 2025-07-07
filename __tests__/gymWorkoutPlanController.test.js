const gymWorkoutPlan = require('../src/models/mongo/gymWorkoutPlan');
const { User } = require('../src/models');
const controller = require('../src/controllers/gymWorkoutPlanController');

jest.mock('../src/models/mongo/gymWorkoutPlan');
jest.mock('../src/models', () => ({
    User: {
        findOne: jest.fn(),
        findByPk: jest.fn(),
    }
}));

describe('gymWorkoutPlanController.criar', () => {
    const mockReq = {
        body: {
            studentEmail: 'aluno@teste.com',
            trainerId: 42,
            exercises: [{ name: 'Agachamento', sets: 3, reps: 12 }]
        }
    };
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    beforeEach(() => {
        User.findOne.mockResolvedValue({ id: 1, isStudent: true });
        User.findByPk.mockResolvedValue({ id: 42, isTrainer: true });
        gymWorkoutPlan.create.mockResolvedValue({ _id: 'abc123', ...mockReq.body });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um plano e responder com 201 + payload', async () => {
        await controller.criar(mockReq, mockRes);

        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'aluno@teste.com' } });
        expect(User.findByPk).toHaveBeenCalledWith(42);
        expect(gymWorkoutPlan.create).toHaveBeenCalledWith({
            userId: 1,
            trainerId: 42,
            exercises: mockReq.body.exercises
        });

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'abc123' }));
    });
});
