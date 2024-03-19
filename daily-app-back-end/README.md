### Deve ser possível criar um usuário [ X ]

### Dever ser possível identificar o usuário entre as requisições [ ]

- Criar token após realizar o login [FEITO]
- Expira em 5 dias [FEITO]
- Autentificação com JWT [FEITO]
- Finalizar rota POST user/login/:id [FEITO]
- Armazenar token no LocalStorage ou em Cookies ? []

### Deve ser possível um usuário remover sua conta [ ]

- Necessário fazer login + token

### Deve ser possível registrar uma refeição feita[ ] :

- Nome
- Descrição
- Data e Hora
- Está dentro da dieta -> Adicionar ao banco de dados:
  yarn run knex -- migrate:make create_isDiet_column

### CRUD refeição [ ]

- necessário para realizar CRUD nas refeições -> Confirmar que o usuário esteja logado
- Acrescentar no banco de dados das refs o id do user

### Deve ser possível visualizar todas as refeições de um usuário [ ]

### Deve ser possível visualizar uma única refeição [ ]

### Deve ser possível visualizar uma refeição do mesmo tipo [ ]

### Métricas de um usuário [ ]

- Quantidade total de refeições registradas
- Quantidade total de refeições dentro da dieta
- Quantidade total de refeições fora da dieta
- Melhor sequência de refeições dentro da dieta

### O usuário só pode visualizar, editar e apagar as refeições a qual ele criou [ ]
