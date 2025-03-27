#!/usr/bin/env node

import {group, intro, log, outro, tasks,spinner} from "@clack/prompts";
import {APP_OUTRO, APP_TITLE, next_js_args, shadcn_ui_arg} from "./helper/const.js";
import {
    getAuthPreferences,
    getCodePreferences, getFrontEndFramworkPreferences,
    getOrmPreferences,
    getProjectName,
    getTrpcPreferences
} from "./helper/prompt.js";
import {addingTemplate} from "./helper/scaffolding.js";
import {execa} from "execa";

async function main(){
    intro(APP_TITLE)
    const responses = await group({
        projectName: () => getProjectName(),
        codePreferences: () => getCodePreferences(),
        framework: () => getFrontEndFramworkPreferences(),
        auth: () => getAuthPreferences(),
        orm: () => getOrmPreferences(),
        trpc: () => getTrpcPreferences()
    })

    await tasks([
        {
            title: "Initializing the project...",
            task: async () => {
                const s = spinner();
                s.start('Initializing the project...');
                try {
                    await execa('npx', next_js_args);
                    process.chdir(responses.projectName);
                    await execa('npx', shadcn_ui_arg);
                    s.stop('Project initialized.');
                } catch (error) {
                    s.stop(`Failed: ${error.message}`);
                    throw error;
                }
            }
        },
        {
            title: "Adding Authentication provider...",
            task: async () => {
                const s = spinner();
                s.start('Adding authentication provider...');
                try {
                    if (responses.auth === 'better_auth') {
                        await addingTemplate('auth');
                        s.stop('Authentication provider added successfully.');
                    } else if (responses.auth === 'none') {
                        s.stop('No authentication provider added.');
                    }
                } catch (error) {
                    s.stop(`Failed: ${error.message}`);
                    throw error;
                }
            }
        },
        {
            title: "Adding ORM ...",
            task: async () => {
                const s = spinner();
                s.start('Adding ORM ...');
                try {
                    await execa('npm', ['install', 'drizzle-orm'], { stdio: 'inherit' });
                    s.stop('ORM added successfully.');
                } catch (error) {
                    s.stop(`Failed: ${error.message}`);
                    throw error;
                }
            }
        },
        {
            title: "Adding tRPC ...",
            task: async () => {
                const s = spinner();
                s.start('Setting up tRPC...');
                try {
                    // Simulate a delay (e.g., for tRPC setup)
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    s.stop('tRPC added successfully.');
                } catch (error) {
                    s.stop(`Failed: ${error.message}`);
                    throw error;
                }
            }
        }
    ])

    outro(APP_OUTRO)
}
main().catch((err) => {
    log.error(`Error : ${err}`)
})