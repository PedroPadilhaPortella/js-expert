import Util from "../util.js";

const componentNameAnchor = '$$componentName';
const currentContextAnchor = '$$currentContextAnchor';
const repositoryAnchor = '$$repositoryAnchor';

const template = `
export default class $$componentNameService {

  constructor({ repository: $$repositoryAnchor }) {
    $$currentContextAnchor = $$repositoryAnchor;
  }

  create(data) {
    return $$currentContextAnchor.create(data);
  }

  read(query) {
    return $$currentContextAnchor.read(query);
  }

  update(id, data) {
    return $$currentContextAnchor.update(id, data);
  }

  delete(id) {
    return $$currentContextAnchor.delete(id);
  }
}`

export function serviceTemplate(componentName, repositoryName) {
  return {
    fileName: `${componentName}Service`,
    template: template
      .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
      .replaceAll(currentContextAnchor, `this.${repositoryName}`)
      .replaceAll(repositoryAnchor, repositoryName)
  }
}