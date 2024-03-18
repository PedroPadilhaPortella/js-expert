# Commands

- rm -rf
- mv -f

## NPM

- npm install (package.json)
- npm ci (package-lock.json)
- npm login
- npm publish --access=public
- npm outdated
- npm update


# NPM Registry

- npm install -g npmrc
- npm login --scope=@pedropadilhaportella --registry=https://registry.npmjs.org

- npmrc [workspace]

- npm login --registry https://npm.pkg.github.com
- npm publish --registry https://npm.pkg.github.com

- npm config set registry https://npm.pkg.github.com
- npm config set registry https://registry.npmjs.org

- cat ~/.npmrc

- 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

# On Premisse

- npm i -g verdaccio
- npmrc local-registry

- npm adduser --registry http://localhost:4873/
- npm publish --registry http://localhost:4873/
- npm config set registry http://localhost:4873/
5ew 

# Semantic Version (Semver)

- Dependency Hell

- Major.Minor.Patch

- npm version major
- npm version minor
- npm version patch

- https://semver.npmjs.com/

- ^ (Proximo que não for zero)
- ~ (Dentro de um mesmo minor)

- npm rm library_name
- npm update -> Vai atualizar para Wanted

- ">1.0.0 <2.0.1" (Range)

## Links

- https://semver.org/
- https://snyk.io/blog/what-is-package-lock-json/
- https://snyk.io/blog/why-npm-lockfiles-can-be-a-security-blindspot-for-injecting-malicious-modules/
