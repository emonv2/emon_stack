#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra"
import {execa} from "execa";
import chalk from "chalk";
import path from "path";
import {fileURLToPath} from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.resolve(__dirname, "templates");

const question = [
    {
        type: 'input',
        name: 'project_name',
        message: 'What is your project?',
        default: 'emonsas',
    },
    {
        type: 'list',
        name: 'orm',
        message: 'What is your database orm?',
        choices: ['drizzle','prisma'],
    },
    {
        type: 'list',
        name: 'auth',
        message: 'What is your auth system?',
        choices: ['better-auth','next-auth','none'],
    },
    {
        type: 'confirm',
        name: 'trpc',
        message: 'Do you want to use trpc?',
        default: false,
    }
]

async function scaffoldProject(answers) {
    const { project_name,orm,trpc,auth } = answers;

    console.log(chalk.green('Creating new project...'));
    await execa('npx',['create-next-app@latest',project_name],{
        stdio: 'inherit',
    })
    process.chdir(project_name)

    if (orm === 'prisma') {
        console.log(chalk.blue('Adding prisma...'));
    }else if (orm === 'drizzle') {
        console.log(chalk.blue('Adding prisma...'));
    }

    if(auth === 'better-auth'){
        console.log(chalk.blue('Adding better auth...'));

        fs.copySync(path.join(templateDir,'auth'),process.cwd());
    }else if (auth === 'next-auth'){
        console.log(chalk.blue('Adding next auth...'));
    }

    if(trpc){
        console.log(chalk.blue('Adding trpc to this project...'));
    }

    console.log(chalk.green('Project setup complete!'));
}

async function main(){
    const answers = await inquirer.prompt(question);
    await scaffoldProject(answers);
}
main().catch((err) => {
    console.error(chalk.red('Error : ',err));
})