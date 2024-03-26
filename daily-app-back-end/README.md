### Deve ser possível criar um usuário [X]

### Dever ser possível identificar o usuário entre as requisições [X]

- Criar token após realizar o login [FEITO]
- Expira em 5 dias [FEITO]
- Autentificação com JWT [FEITO]
- Finalizar rota POST user/login/:id [FEITO]

### Deve ser possível um usuário remover sua conta [X]

### Deve ser possível registrar uma refeição feita[X] :

- Nome
- Descrição
- Data e Hora
- Está dentro da dieta -> Adicionar ao banco de dados:
  yarn run knex -- migrate:make create_isDiet_column

### CRUD refeição [X]

- necessário para realizar CRUD nas refeições -> Confirmar que o usuário esteja logado
- Acrescentar no banco de dados das refs o id do user

### Deve ser possível visualizar todas as refeições de um usuário [X]

### Deve ser possível visualizar uma única refeição [X]

### Deve ser possível visualizar uma refeição do mesmo tipo [X]

### Métricas de um usuário [X]

- Quantidade total de refeições registradas
- Quantidade total de refeições dentro da dieta
- Quantidade total de refeições fora da dieta
- Melhor sequência de refeições dentro da dieta

### O usuário só pode visualizar, editar e apagar as refeições a qual ele criou [X]

### Res.cookies armazenar token [X]

### Rota de recuperação de senha [ ]

### Rota de Logout [X]

### Criação do ambiente de testes [ ]

- [ ] Criação de usuários
- [ ] Mostrar perfil do usuário
- [ ] Login do usuário
- [ ] Criação de refeição por usuário
- [ ] Mostrar refeição específica
- [ ] Filtrar refeições do mesmo tipo
- [ ] Filtrar refeições de mesma data
- [ ] Filtrar refeições na dieta
- [ ] Listagem de refeições por usuário
- [ ] Modificação da refeição por usuário
- [ ] Apagar refeição
- [ ] Carregar métricas do usuário
- [ ] Logout do usuário
- [ ] Remoção do usuário e suas dietas
