const bcrypt = require('bcrypt');

const senhaDeTeste = 'teste123'; // Senha que você usará para cadastrar e logar
const saltRounds = 10; // O mesmo saltRounds que você usa no seu código (10)

console.log('--- Teste de Consistência do bcrypt ---');
console.log(`Senha de teste: "${senhaDeTeste}"`);
console.log(`Salt Rounds: ${saltRounds}`);

async function runBcryptTest() {
    try {
        // --- ETAPA 1: SIMULAR O CADASTRO (GERAR HASH) ---
        console.log('\n--- Simulação de Cadastro (Gerando Hash) ---');
        const hashedPasswordCadastro = await bcrypt.hash(senhaDeTeste, saltRounds);
        console.log(`Hash Gerado no Cadastro: "${hashedPasswordCadastro}"`);

        // --- ETAPA 2: SIMULAR O LOGIN (COMPARAR HASH) ---
        console.log('\n--- Simulação de Login (Comparando Hash) ---');
        const passwordMatchLogin = await bcrypt.compare(senhaDeTeste, hashedPasswordCadastro);
        console.log(`Comparando "${senhaDeTeste}" com o hash do cadastro...`);
        console.log(`Resultado da comparação: ${passwordMatchLogin}`); // DEVE SER TRUE!

        if (passwordMatchLogin) {
            console.log('\n*** SUCESSO: bcrypt.compare() funcionou corretamente neste teste! ***');
            console.log('Isso sugere que o problema está na forma como a senha é passada ou salva na sua aplicação principal.');
        } else {
            console.log('\n*** FALHA CRÍTICA: bcrypt.compare() retornou FALSE neste teste! ***');
            console.log('Isso indica um problema fundamental com a sua instalação do bcrypt ou ambiente.');
        }

        // --- Teste com senha incorreta ---
        console.log('\n--- Teste com Senha Incorreta ---');
        const senhaIncorreta = 'senhaerrada';
        const passwordMatchIncorreta = await bcrypt.compare(senhaIncorreta, hashedPasswordCadastro);
        console.log(`Comparando "${senhaIncorreta}" com o hash do cadastro...`);
        console.log(`Resultado da comparação (senha incorreta): ${passwordMatchIncorreta}`); // DEVE SER FALSE!

    } catch (error) {
        console.error('\n*** ERRO INESPERADO DURANTE O TESTE DO bcrypt ***');
        console.error(error);
    }
}

runBcryptTest();