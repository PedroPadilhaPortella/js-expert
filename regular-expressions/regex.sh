# Adicionar o 'use strict' na primeira linha dos arquivos .js
# npm i -g ipt
CONTENT = "'use strict';"

find . -name *.js -not -path '*node_modules**' | ipt -o  \
xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\/g' {file}
