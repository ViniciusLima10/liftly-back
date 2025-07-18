const mockUser = {
  id: 1,
  name: 'Aluno Teste',
  email: 'aluno@teste.com',
  password: '$2b$10$123456789012345678901uKvzW12bIYt1X.1W/fakehashOf123', // bcrypt hash fictício
  isStudent: true,
  isPersonal: false,
  isNutritionist: false,
  isOwner: false,
};


const request = require('supertest');
const app = require('../src/app');


describe('Fluxo Completo: Login + Agendamento + Cancelamento', () => {
    let tokenAluno = '';
    let aulaId = '';
    let agendamentoId = '';

    test('Deve logar aluno e obter token JWT', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: 'aluno@teste.com',
                password: '123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        tokenAluno = res.body.token;
    });

    test('Middleware deve autorizar acesso às rotas protegidas', async () => {
        const res = await request(app)
            .get('/usergym/my-gym')
            .set('Authorization', `Bearer ${tokenAluno}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.gymId).toBeDefined();
    });

    test('Deve buscar aulas disponíveis', async () => {
        const res = await request(app)
            .get('/schedules/available-classes?gymId=1')
            .set('Authorization', `Bearer ${tokenAluno}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        aulaId = res.body[0]?.id;
        expect(aulaId).toBeDefined();
    });

    test('Deve agendar uma aula', async () => {
        const res = await request(app)
            .post('/schedules/book')
            .send({ classId: aulaId })
            .set('Authorization', `Bearer ${tokenAluno}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toContain('agendado');

        // DICA: no seu back-end, inclua o ID do agendamento no response de sucesso para capturar aqui.
    });

    test('Deve listar meus agendamentos', async () => {
        const res = await request(app)
            .get('/schedules')
            .set('Authorization', `Bearer ${tokenAluno}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        const agendamento = res.body.find(item => item.classId === aulaId);
        expect(agendamento).toBeDefined();

        agendamentoId = agendamento.id;
    });

    test('Deve cancelar o agendamento', async () => {
        const res = await request(app)
            .put(`/schedules/cancel/${agendamentoId}`)
            .set('Authorization', `Bearer ${tokenAluno}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toContain('cancelado');
    });
});
