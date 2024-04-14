import Util from "../util.js";

const componentNameAnchor = '$$componentName';
const repositoryNameAnchor = '$$repositoryNameAnchor';
const serviceNameAnchor = '$$serviceNameAnchor';
const repositoryDepAnchor = '$$repositoryDepAnchor';
const serviceDepAnchor = '$$serviceDepAnchor';

const template = `
import $$serviceNameAnchor from '../service/$$serviceDepAnchor.js';
import $$repositoryNameAnchor from '../repository/$$repositoryDepAnchor.js';

export default class $$componentNameFactory {

  static getInstance() {
    const repository = new $$repositoryNameAnchor();
    const service = new $$serviceNameAnchor({ repository });
    return service;
  }
}`

export function factoryTemplate(componentName, repositoryName, serviceName) {
  return {
    fileName: `${componentName}Factory`,
    template: template
      .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
      .replaceAll(repositoryDepAnchor, Util.lowerCaseFirstLetter(repositoryName))
      .replaceAll(serviceDepAnchor, Util.lowerCaseFirstLetter(serviceName))
      .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
      .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
  }
}