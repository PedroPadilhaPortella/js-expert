# Expressões Regulares - Regex

[Regex 101](https://regex101.com)

`^\d{3}.\d{3}.\d{3}-\d{2}$`

> Retorna o padrão dos CPFs
> 123.123.123-14
> 321.321.321-12
> 467.453.981-15

#### VSCode ReplaceAll

> Portella, Pedro
> Wendel, Erick
> Cruz, Marcos

Usando o VSCode ReplaceAll com a expressão `^(\w+),\s(\w+)$` configurada para trocar os nomes para um objeto javascript `{firstName: "$2"}, {lastName: "$1"}`

> {firstName: "Pedro"}, {lastName: "Portella"}
> {firstName: "Erick"}, {lastName: "Wendel"}
> {firstName: "Marcos"}, {lastName: "Cruz"}

#### Convertendo Links de um Markdown para Html usando Groups

> O [Erick Wendel](https://erickwendel.com) faz palestras sobre NodeJS, siga ele no [Linkedin](https://www.linkedin.com/in/erickwendel) e no [Google](https://google.com), vai que vai!

``

Usando o VSCode ReplaceAll com a expressão `\[(.*?)\]\(([http|https].*?)\)` configurada para trocar os nomes para um objeto javascript `<a href="$2">"$1"</a>`

#### How a RegEx can bring your Node.js service down

[How a RegEx can bring your Node.js service down](https://medium.com/@lirantal/node-js-pitfalls-how-a-regex-can-bring-your-system-down-cbf1dc6c4e02)