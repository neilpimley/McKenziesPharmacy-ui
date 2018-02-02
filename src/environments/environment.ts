// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    callbackURL: 'http://localhost:4200/postback',
    apiUrl: 'http://localhost:60001',
    appInsights: {
        instrumentationKey: 'b0137cf3-7ae6-4309-8925-06a3b1c20508'
    }
};
