export const APP_TITLE = 'Welcome to Emon Stack!'
export const APP_OUTRO = 'Project created successfully!'

export const next_js_args = [
    'create-next-app@latest',
    responses.projectName,
    responses.codePreferences, // e.g., TypeScript or JavaScript
    responses.framework,      // e.g., Tailwind CSS or plain CSS
    '--no-eslint',
    '--app',
    '--turbopack',
    '--no-src-dir',
    '--no-import-alias',
].filter(Boolean);

export const shadcn_ui_arg = [
    'shadcn@latest',
    'init',
    '-t next',
    '-s',
    '-f',
    '--no-src-dir',
    '--css-variables',
    '-b neutral',
    // component list
    'button',
    'alert',
    'alert-dialog',
    'avatar',
    'badge',
    'card',
    'carousel',
    'checkbox',
    'dialog',
    'dropdown-menu',
    'form',
    'input',
    'label',
    'pagination',
    'progress',
    'select',
    'skeleton',
    'separator',
    'sonner',
    'textarea',
    'tooltip'
]

export const auth_args = [
    'better-auth',
    '@better-fetch/fetch'
]