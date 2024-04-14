import http from 'http';

// curl "localhost:3000?salary=3000&discount=15"

// node inspect index.mjs

// debug> setBreakpoint(19) ou sb(19)
// debug> clearBreakpoint('index.mjs', 19)
// debug> breakpoints
// debug> cont

// debug> exec req.url
// debug> exec new URLSearchParams(req.url)
// debug> exec new URLSearchParams(req.url).get('discount')
// debug> exec Object.fromEntries(new URLSearchParams(req.url))  
// debug> next
// debug> repl

// repl> data  trás o objeto data { salary: '3000', discount: '15' }
// repl> netSalary  trás a referencia da funcao netSalary [Function: netSalary]
// repl> netSalary(data)  faz o calculo e retorna 2550


function netSalary({ discount, salary }) {
  const percent = (discount / 100)
  const cost = salary * percent
  const result = salary - cost
  return result
}

http.createServer((req, res) => {
  const url = req.url.replace('/', '')
  const params = new URLSearchParams(url)
  const data = Object.fromEntries(params)
  const result = netSalary(data);
  res.end(`O seu salário final, descontanto ${data.discount}% de imposto, é de R$${result}`)
})
  .listen(3000, () => console.log('Server running at http://localhost:3000'))