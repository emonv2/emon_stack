import { confirm, select, text} from "@clack/prompts"

export async function getProjectName(){
    return text({
        message: 'What will your project be called?',
        placeholder:'emon-stack',
        validate: (value) => (value.length < 3 ? "Project name must be at least 3 characters long." : undefined)
    })
}

export async function getCodePreferences(){
    return select({
        message: 'Will you be using TypeScript or JavaScript?',
        options: [
            {
                value: '--ts',
                label: 'TypeScript'
            },
            {
                value: '--js',
                label: 'JavaScript'
            }
        ],
    })
}

export async function getOrmPreferences(){
    return select({
        message: 'What database ORM would you like to use?',
        options: [
            {
                value: 'drizzle',
                label: 'Drizzle'
            }
        ],
    })
}

export async function getAuthPreferences(){
    return select({
        message: 'What authentication provider would you like to use?',
        options: [
            {
                value: 'none',
                label: 'None'
            },
            {
                value: 'better_auth',
                label: 'Better Auth'
            }
        ],
    })
}

export async function getTrpcPreferences(){
    return confirm({
        message: 'Would you like to use trpc?',
    })
}

export async function getFrontEndFramworkPreferences(){
    return select({
        message: 'What Front-End Frameworks would you like to use?',
        options: [
            {
                value: '--tailwind',
                label: 'Tailwind css'
            }
        ],
    })
}