### Deve ser possível criar um usuário [ X ]

### Dever ser possível identificar o usuário entre as requisições [ ]

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

### CRUD refeição [x]

- necessário para realizar CRUD nas refeições -> Confirmar que o usuário esteja logado
- Acrescentar no banco de dados das refs o id do user

### Deve ser possível visualizar todas as refeições de um usuário [x]

### Deve ser possível visualizar uma única refeição [x]

### Deve ser possível visualizar uma refeição do mesmo tipo [X]

### Métricas de um usuário [X]

- Quantidade total de refeições registradas
- Quantidade total de refeições dentro da dieta
- Quantidade total de refeições fora da dieta
- Melhor sequência de refeições dentro da dieta

### O usuário só pode visualizar, editar e apagar as refeições a qual ele criou [x]

### Req.cookies armazenar token [ ]

### Rota de recuperação de senha [ ]

### Rota de Logout [ ]
