#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function askQuestions() {
	const questions = [
		{
			name: 'projectName',
			type: 'input',
			message: chalk.cyan('Nombre del proyecto:'),
			validate: function (input) {
				if (input.trim() === '') {
					return chalk.red(
						'El nombre del proyecto no puede estar vacío'
					);
				}
				if (fs.existsSync(input)) {
					return chalk.red(
						'El directorio ya existe. Elige otro nombre.'
					);
				}
				return true;
			},
		},
		{
			name: 'installDependencies',
			type: 'confirm',
			message: chalk.blue('¿Quieres instalar las dependencias?'),
		},
		{
			name: 'packageManager',
			type: 'list',
			message: chalk.magenta('Elige un gestor de paquetes:'),
			choices: ['npm', 'yarn', 'pnpm'],
			when: function (answers) {
				return answers.installDependencies;
			},
		},
	];

	return inquirer.prompt(questions);
}

function copyFiles(src, dest) {
	fs.readdirSync(src).forEach((file) => {
		const srcFile = path.join(src, file);
		const destFile = path.join(dest, file);
		if (fs.lstatSync(srcFile).isDirectory()) {
			if (!fs.existsSync(destFile)) {
				fs.mkdirSync(destFile);
			}
			copyFiles(srcFile, destFile);
		} else {
			fs.copyFileSync(srcFile, destFile);
		}
	});
}

async function main() {
	const answers = await askQuestions();
	const projectName = answers.projectName;
	const projectPath = path.join(process.cwd(), projectName);

	fs.mkdirSync(projectPath);

	const srcDir = path.join(__dirname, 'plantilla');
	copyFiles(srcDir, projectPath);

	console.log(
		'\n' +
			'\n' +
			chalk.bold.green(
				`Proyecto ${projectName} inicializado con éxito.`
			) +
			'\n'
	);

	if (answers.installDependencies) {
		const packageManager = answers.packageManager;
		try {
			console.log(
				chalk.bold.magenta(
					`Instalando dependencias con ${packageManager}...`
				)
			);
			execSync(`${packageManager} install`, {
				stdio: 'inherit',
				cwd: projectPath,
			});
			console.log(
				'\n' +
					'\n' +
					chalk.bold.green('Dependencias instaladas') +
					'\n' +
					'\n' +
					chalk.bold.magenta('cd ') +
					projectName +
					'\n' +
					'\n' +
					chalk.bold.magenta(packageManager) +
					' start para iniciar el proyecto.' +
					'\n' +
					'\n'
			);
		} catch (error) {
			console.error('Error al instalar dependencias:', error);
		}
	} else {
		console.log(
			'\n' +
				'\n' +
				chalk.bold.magenta('cd ') +
				projectName +
				'\n' +
				'\n' +
				'Ejecuta ' +
				chalk.bold.magenta('npm o yarn o pnpm') +
				' install para instalar las dependencias.' +
				'\n' +
				'\n' +
				'Y luego ejecuta ' +
				chalk.bold.magenta('npm o yarn o pnpm') +
				' start para iniciar el proyecto.' +
				'\n' +
				'\n'
		);
	}
}

main();
