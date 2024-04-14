## Como tornar um arquivo .js em um executável do sistema

1. Configure `#!/usr/bin/env node` na primeira linha do arquivo javascript.

2. Em um terminal Linux ou no Bash, execute `chmod +x <filename>.js` e depois `<filename>.js`para testar se o arquivo está sendo executado.

3. No package.json do projeto, configure a seguinte propriedade:
```json
{
  "name": "@pedropadilhaportella/codegen",
  "version": "1.0.0",
  "bin": {
    "codegen": "./src/index.js"
  },
  "scripts": {}
}
```

4. Execute `npm link` para instalar esse pacote no na sua máquina e adicionar às variáveis de ambiente.

4. E depois é ó usar, crie um projeto com `npm init -y` e gere o código, como exemplo `codegen skeleton --c heroes -c villains -c players`.

5. Você pode usar `npm unlink -g @pedropadilhaportella/codegen` para remover esse pacote da sua máquina.