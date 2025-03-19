import fs from "fs-extra";
import path from "path";
import {fileURLToPath} from "url";
import ora from "ora";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function addingTemplate(templateName) {
    const spinner = ora(`Copying "${templateName}" template...`).start();

    try {
        const templatePath = path.resolve(__dirname, '../templates', templateName);
        const targetPath = process.cwd();

        // if (!fs.existsSync(templatePath)) {
        //     spinner.fail(`Template "${templateName}" does not exist!`);
        //     return;
        // }

        await fs.copySync(templatePath, targetPath);
        spinner.succeed(`Template "${templateName}" added successfully!`);
    } catch (error) {
        spinner.fail(`Error copying template: ${error.message}`);
    }
}
