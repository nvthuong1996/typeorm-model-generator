/* eslint-disable no-else-return */
import * as Handlebars from "handlebars";
import * as Prettier from "prettier";
import * as changeCase from "change-case";
import * as fs from "fs";
import * as path from "path";
import { EOL } from "os";
import IConnectionOptions from "./IConnectionOptions";
import IGenerationOptions, { eolConverter } from "./IGenerationOptions";
import { Entity } from "./models/Entity";
import { Relation } from "./models/Relation";

const prettierOptions: Prettier.Options = {
    parser: "typescript",
    endOfLine: "auto",
    semi: false,
    trailingComma: "all",
    singleQuote: true,
    printWidth: 95,
    tabWidth: 2,
};

export default function modelGenerationPhase(
    connectionOptions: IConnectionOptions,
    generationOptions: IGenerationOptions,
    databaseModel: Entity[]
): void {
    createHandlebarsHelpers(generationOptions);

    const resultPath = generationOptions.resultsPath;

    if (fs.existsSync(path.resolve(resultPath))) {
        throw new Error("Folder " + resultPath + " already exist");
    }

    if (!fs.existsSync(resultPath)) {
        fs.mkdirSync(resultPath);
    }
    let entitiesPath = resultPath;
    let interfacePath = resultPath;
    let repositoryPath = resultPath;
    if (!generationOptions.noConfigs) {
        createTsConfigFile(resultPath);
        createTypeOrmConfig(resultPath, connectionOptions);

        entitiesPath = path.resolve(resultPath, "./models");
        if (!fs.existsSync(entitiesPath)) {
            fs.mkdirSync(entitiesPath);
        }
        interfacePath = path.resolve(resultPath, "./interface");
        if (!fs.existsSync(interfacePath)) {
            fs.mkdirSync(interfacePath);
        }
        repositoryPath = path.resolve(resultPath, "./repository");
        if (!fs.existsSync(repositoryPath)) {
            fs.mkdirSync(repositoryPath);
        }
    }

    if (generationOptions.indexFile) {
        createIndexFile(databaseModel, generationOptions, entitiesPath);
    }
    generateModels(databaseModel, generationOptions, entitiesPath);
    generateModels2(databaseModel, generationOptions, interfacePath);
    generateModels3(databaseModel, generationOptions, repositoryPath);
    generateContainer(
        databaseModel,
        generationOptions,
        path.resolve(resultPath, "./")
    );
    generateService(
        databaseModel,
        generationOptions,
        path.resolve(resultPath, "./")
    );
}
function generateService(
    databaseModel: Entity[],
    generationOptions: IGenerationOptions,
    entitiesPath: string
) {
    const all: string[] = [];
    const result = `
    'use strict'
    import { getSchema } from 'fastest-validator-decorators'
    import { Context } from 'moleculer'
    import { Method, Service } from 'moleculer-decorators'
    
    import { MoleculerService } from '@Common/class'
    import { ActionMixins } from '@Mixins'
    import { C } from '@Constant'
    import { entityName } from './models'
    import { repositoryName } from './repository'
    import { lazyInject } from './di_container'
    
    @Service({
      name: C.SERVICE_NAME.serviceXYZ,
      settings: {
        entityValidator: getSchema(entityName),
      },
      mixins: [ActionMixins()],
      hooks: {
        before: {},
      },
    })
    class serviceClassName extends MoleculerService {
      @lazyInject(repositoryName)
      protected repository: repositoryName
    }
    export default serviceClassName
    `;

    let constant = "";
    let entity = "";
    databaseModel.forEach((element) => {
        let nameClass = "";
        switch (generationOptions.convertCaseEntity) {
            case "camel":
                nameClass = changeCase.camelCase(element.tscName);
                break;
            case "pascal":
                nameClass = changeCase.pascalCase(element.tscName);
                break;
            case "none":
                nameClass = element.tscName;
                break;
            default:
                throw new Error("Unknown case style");
        }
        const entityName = nameClass;
        const repositoryName = nameClass + "Repository";

        entity += entityName + ",\n";

        constant += `${element.tscName.toUpperCase()} : '${
            element.tscName
        }',\n`;

        all.push(nameClass);

        const k = result
            .replace(/entityName/g, entityName)
            .replace(/repositoryName/g, repositoryName)
            .replace(/serviceClassName/g, nameClass + "ServiceBroken")
            .replace(/serviceXYZ/, element.tscName.toUpperCase());

        const resultFilePath = path.resolve(
            entitiesPath,
            `${element.tscName}.service.ts`
        );
        fs.writeFileSync(resultFilePath, Prettier.format(k, prettierOptions), {
            encoding: "utf-8",
            flag: "w",
        });
    });

    const resultFilePath = path.resolve(entitiesPath, `_constant`);
    const pathEntity = path.resolve(entitiesPath, `_entity`);
    fs.writeFileSync(resultFilePath, constant);
    fs.writeFileSync(pathEntity, `import {${entity}} from './models'`);
}
function generateContainer(
    databaseModel: Entity[],
    generationOptions: IGenerationOptions,
    entitiesPath: string
) {
    const all: string[] = [];
    const result = `
import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'

import {
  abcdez
} from './repository'

const container = new Container()
export const { lazyInject } = getDecorators(container)
abcdezf`;
    databaseModel.forEach((element) => {
        let nameClass = "";
        switch (generationOptions.convertCaseEntity) {
            case "camel":
                nameClass = changeCase.camelCase(element.tscName);
                break;
            case "pascal":
                nameClass = changeCase.pascalCase(element.tscName);
                break;
            case "none":
                nameClass = element.tscName;
                break;
            default:
                throw new Error("Unknown case style");
        }
        nameClass += "Repository";
        all.push(nameClass);
    });
    let a = "";
    let b = "";
    all.forEach((e) => {
        a += e + ",\n";
        b += `container.bind<${e}>(${e}).toSelf()\n`;
    });

    const k = result.replace("abcdez", a).replace("abcdezf", b);

    const resultFilePath = path.resolve(entitiesPath, `di_container.ts`);
    fs.writeFileSync(resultFilePath, Prettier.format(k, prettierOptions), {
        encoding: "utf-8",
        flag: "w",
    });
}
function generateModels3(
    databaseModel: Entity[],
    generationOptions: IGenerationOptions,
    entitiesPath: string
) {
    const entityTemplatePath = path.resolve(
        __dirname,
        "templates",
        "repository.mst"
    );
    const entityTemplate = fs.readFileSync(entityTemplatePath, "utf-8");
    const entityCompliedTemplate = Handlebars.compile(entityTemplate, {
        noEscape: true,
    });
    let indexRepository = "";
    databaseModel.forEach((element) => {
        let casedFileName = "";
        switch (generationOptions.convertCaseFile) {
            case "camel":
                casedFileName = changeCase.camelCase(element.tscName);
                break;
            case "param":
                casedFileName = changeCase.paramCase(element.tscName);
                break;
            case "pascal":
                casedFileName = changeCase.pascalCase(element.tscName);
                break;
            case "none":
                casedFileName = element.tscName;
                break;
            default:
                throw new Error("Unknown case style");
        }
        indexRepository += `\nexport * from './${casedFileName}.repository'`;
        const resultFilePath = path.resolve(
            entitiesPath,
            `${casedFileName}.repository.ts`
        );
        const rendered = entityCompliedTemplate(element);
        const withImportStatements = removeUnusedImports(
            EOL !== eolConverter[generationOptions.convertEol]
                ? rendered.replace(
                      /(\r\n|\n|\r)/gm,
                      eolConverter[generationOptions.convertEol]
                  )
                : rendered
        );
        let formatted = "";
        try {
            formatted = Prettier.format(
                withImportStatements.replace("{}", ""),
                prettierOptions
            );
        } catch (error) {
            console.error(
                "There were some problems with model generation for table: ",
                element.sqlName
            );
            console.error(error);
            formatted = withImportStatements;
        }
        fs.writeFileSync(resultFilePath, formatted, {
            encoding: "utf-8",
            flag: "w",
        });
    });
    const resultFilePath = path.resolve(entitiesPath, `index.ts`);
    fs.writeFileSync(
        resultFilePath,
        Prettier.format(indexRepository, prettierOptions),
        {
            encoding: "utf-8",
            flag: "w",
        }
    );
}
function generateModels2(
    databaseModel: Entity[],
    generationOptions: IGenerationOptions,
    entitiesPath: string
) {
    const entityTemplatePath = path.resolve(
        __dirname,
        "templates",
        "interface.mst"
    );
    const entityTemplate = fs.readFileSync(entityTemplatePath, "utf-8");
    const entityCompliedTemplate = Handlebars.compile(entityTemplate, {
        noEscape: true,
    });
    let indexInterface = "";
    databaseModel.forEach((element) => {
        let casedFileName = "";
        switch (generationOptions.convertCaseFile) {
            case "camel":
                casedFileName = changeCase.camelCase(element.tscName);
                break;
            case "param":
                casedFileName = changeCase.paramCase(element.tscName);
                break;
            case "pascal":
                casedFileName = changeCase.pascalCase(element.tscName);
                break;
            case "none":
                casedFileName = element.tscName;
                break;
            default:
                throw new Error("Unknown case style");
        }
        indexInterface += `\nexport * from './${casedFileName}.interface'`;
        const resultFilePath = path.resolve(
            entitiesPath,
            `${casedFileName}.interface.ts`
        );
        const rendered = entityCompliedTemplate(element);
        const withImportStatements = removeUnusedImports(
            EOL !== eolConverter[generationOptions.convertEol]
                ? rendered.replace(
                      /(\r\n|\n|\r)/gm,
                      eolConverter[generationOptions.convertEol]
                  )
                : rendered
        );
        let formatted = "";
        try {
            formatted = Prettier.format(
                withImportStatements.replace("{}", ""),
                prettierOptions
            );
        } catch (error) {
            console.error(
                "There were some problems with model generation for table: ",
                element.sqlName
            );
            console.error(error);
            formatted = withImportStatements;
        }
        fs.writeFileSync(resultFilePath, formatted, {
            encoding: "utf-8",
            flag: "w",
        });
    });
    const resultFilePath = path.resolve(entitiesPath, `index.ts`);
    fs.writeFileSync(
        resultFilePath,
        Prettier.format(indexInterface, prettierOptions),
        {
            encoding: "utf-8",
            flag: "w",
        }
    );
}
function generateModels(
    databaseModel: Entity[],
    generationOptions: IGenerationOptions,
    entitiesPath: string
) {
    const entityTemplatePath = path.resolve(
        __dirname,
        "templates",
        "entity.mst"
    );
    const entityTemplate = fs.readFileSync(entityTemplatePath, "utf-8");
    const entityCompliedTemplate = Handlebars.compile(entityTemplate, {
        noEscape: true,
    });
    let indexModel = "";
    databaseModel.forEach((element) => {
        let casedFileName = "";
        switch (generationOptions.convertCaseFile) {
            case "camel":
                casedFileName = changeCase.camelCase(element.tscName);
                break;
            case "param":
                casedFileName = changeCase.paramCase(element.tscName);
                break;
            case "pascal":
                casedFileName = changeCase.pascalCase(element.tscName);
                break;
            case "none":
                casedFileName = element.tscName;
                break;
            default:
                throw new Error("Unknown case style");
        }
        indexModel += `\nexport * from './${casedFileName}.entity'`;
        const resultFilePath = path.resolve(
            entitiesPath,
            `${casedFileName}.entity.ts`
        );
        const rendered = entityCompliedTemplate(element);
        const withImportStatements = removeUnusedImports(
            EOL !== eolConverter[generationOptions.convertEol]
                ? rendered.replace(
                      /(\r\n|\n|\r)/gm,
                      eolConverter[generationOptions.convertEol]
                  )
                : rendered
        );
        let formatted = "";
        try {
            formatted = Prettier.format(withImportStatements, prettierOptions);
        } catch (error) {
            console.error(
                "There were some problems with model generation for table: ",
                element.sqlName
            );
            console.error(error);
            formatted = withImportStatements;
        }
        fs.writeFileSync(resultFilePath, formatted, {
            encoding: "utf-8",
            flag: "w",
        });
    });
    const resultFilePath = path.resolve(entitiesPath, `index.ts`);
    fs.writeFileSync(
        resultFilePath,
        Prettier.format(indexModel, prettierOptions),
        {
            encoding: "utf-8",
            flag: "w",
        }
    );
}

function createIndexFile(
    databaseModel: Entity[],
    generationOptions: IGenerationOptions,
    entitiesPath: string
) {
    const templatePath = path.resolve(__dirname, "templates", "index.mst");
    const template = fs.readFileSync(templatePath, "utf-8");
    const compliedTemplate = Handlebars.compile(template, {
        noEscape: true,
    });
    const rendered = compliedTemplate({ entities: databaseModel });
    const formatted = Prettier.format(rendered, prettierOptions);
    let fileName = "index";
    switch (generationOptions.convertCaseFile) {
        case "camel":
            fileName = changeCase.camelCase(fileName);
            break;
        case "param":
            fileName = changeCase.paramCase(fileName);
            break;
        case "pascal":
            fileName = changeCase.pascalCase(fileName);
            break;
        default:
    }
    const resultFilePath = path.resolve(entitiesPath, `${fileName}.ts`);
    fs.writeFileSync(resultFilePath, formatted, {
        encoding: "utf-8",
        flag: "w",
    });
}

function removeUnusedImports(rendered: string) {
    const openBracketIndex = rendered.indexOf("{") + 1;
    const closeBracketIndex = rendered.indexOf("}");
    const imports = rendered
        .substring(openBracketIndex, closeBracketIndex)
        .split(",");
    const restOfEntityDefinition = rendered.substring(closeBracketIndex);
    const distinctImports = imports.filter(
        (v) =>
            restOfEntityDefinition.indexOf(`@${v}(`) !== -1 ||
            (v === "BaseEntity" && restOfEntityDefinition.indexOf(v) !== -1)
    );
    return `${rendered.substring(0, openBracketIndex)}${distinctImports.join(
        ","
    )}${restOfEntityDefinition}`;
}

function createHandlebarsHelpers(generationOptions: IGenerationOptions): void {
    Handlebars.registerHelper("json", (context) => {
        const json = JSON.stringify(context);
        const withoutQuotes = json.replace(/"([^(")"]+)":/g, "$1:");
        return withoutQuotes.slice(1, withoutQuotes.length - 1);
    });

    Handlebars.registerHelper("isUpdate", (str) => {
        if (str === "created_at") {
            return true;
        } else {
            return false;
        }
    });

    Handlebars.registerHelper("isQueryOperator", (str: string) => {
        if (str.includes("|")) {
            return false;
        } else {
            return true;
        }
    });

    Handlebars.registerHelper("upperCase", (str: string) => {
        return str.toUpperCase();
    });
    Handlebars.registerHelper("toEntityName", (str) => {
        let retStr = "";
        switch (generationOptions.convertCaseEntity) {
            case "camel":
                retStr = changeCase.camelCase(str);
                break;
            case "pascal":
                retStr = changeCase.pascalCase(str);
                break;
            case "none":
                retStr = str;
                break;
            default:
                throw new Error("Unknown case style");
        }
        return retStr;
    });
    Handlebars.registerHelper("toClassName", (str) => {
        let retStr = "";
        switch (generationOptions.convertCaseEntity) {
            case "camel":
                retStr = changeCase.camelCase(str);
                break;
            case "pascal":
                retStr = changeCase.pascalCase(str);
                break;
            case "none":
                retStr = str;
                break;
            default:
                throw new Error("Unknown case style");
        }
        return retStr;
    });
    Handlebars.registerHelper("handleColumn", (str) => {
        if (str === "created_at") {
            return "CreateDateColumn";
        } else if (str === "updated_at") {
            return "UpdateDateColumn";
        }
        return "Column";
    });
    Handlebars.registerHelper("curly", function (object, open) {
        return open ? "{" : "}";
    });
    Handlebars.registerHelper("curlyclose", function (open) {
        return "}";
    });
    Handlebars.registerHelper("showType", (str) => {
        if (str === "created_at" || str === "updated_at") {
            return false;
        } else {
            return true;
        }
    });
    Handlebars.registerHelper("toFileName", (str) => {
        let retStr = "";
        switch (generationOptions.convertCaseFile) {
            case "camel":
                retStr = changeCase.camelCase(str);
                break;
            case "param":
                retStr = changeCase.paramCase(str);
                break;
            case "pascal":
                retStr = changeCase.pascalCase(str);
                break;
            case "none":
                retStr = str;
                break;
            default:
                throw new Error("Unknown case style");
        }
        return retStr;
    });
    Handlebars.registerHelper("printPropertyVisibility", () =>
        generationOptions.propertyVisibility !== "none"
            ? `${generationOptions.propertyVisibility} `
            : ""
    );
    Handlebars.registerHelper("toPropertyName", (str) => {
        return changeCase.snakeCase(str);
    });
    Handlebars.registerHelper("toFieldRelationName", (str) => {
        return changeCase.snakeCase(str);
    });
    Handlebars.registerHelper(
        "toRelation",
        (entityType: string, relationType: Relation["relationType"]) => {
            let retVal = entityType;
            if (relationType === "ManyToMany" || relationType === "OneToMany") {
                retVal = `${retVal}[]`;
            }
            if (generationOptions.lazy) {
                retVal = `Promise<${retVal}>`;
            }
            return retVal;
        }
    );
    Handlebars.registerHelper("defaultExport", () =>
        generationOptions.exportType === "default" ? "default" : ""
    );
    Handlebars.registerHelper("localImport", (entityName: string) =>
        generationOptions.exportType === "default"
            ? entityName
            : `{${entityName}}`
    );
    Handlebars.registerHelper("strictMode", () =>
        generationOptions.strictMode !== "none"
            ? generationOptions.strictMode
            : ""
    );
    Handlebars.registerHelper({
        and: (v1, v2) => v1 && v2,
        eq: (v1, v2) => v1 === v2,
        gt: (v1, v2) => v1 > v2,
        gte: (v1, v2) => v1 >= v2,
        lt: (v1, v2) => v1 < v2,
        lte: (v1, v2) => v1 <= v2,
        ne: (v1, v2) => v1 !== v2,
        or: (v1, v2) => v1 || v2,
    });
}

function createTsConfigFile(outputPath: string): void {
    const templatePath = path.resolve(__dirname, "templates", "tsconfig.mst");
    const template = fs.readFileSync(templatePath, "utf-8");
    const compliedTemplate = Handlebars.compile(template, {
        noEscape: true,
    });
    const rendered = compliedTemplate({});
    const formatted = Prettier.format(rendered, { parser: "json" });
    const resultFilePath = path.resolve(outputPath, "tsconfig.json");
    // fs.writeFileSync(resultFilePath, formatted, {
    //     encoding: "utf-8",
    //     flag: "w",
    // });
}
function createTypeOrmConfig(
    outputPath: string,
    connectionOptions: IConnectionOptions
): void {
    const templatePath = path.resolve(__dirname, "templates", "ormconfig.mst");
    const template = fs.readFileSync(templatePath, "utf-8");
    const compliedTemplate = Handlebars.compile(template, {
        noEscape: true,
    });
    const rendered = compliedTemplate(connectionOptions);
    const formatted = Prettier.format(rendered, { parser: "json" });
    const resultFilePath = path.resolve(outputPath, "ormconfig.json");
    // fs.writeFileSync(resultFilePath, formatted, {
    //     encoding: "utf-8",
    //     flag: "w",
    // });
}
