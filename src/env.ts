type Params = Readonly<{
    env: string | undefined;
    name: string;
}>;

const generateError = (
    { name, env }: Params,
    type: 'string' | 'number' | 'boolean'
) =>
    new TypeError(
        `Expect process.env.${name} to be ${type}, got typeof "${typeof env}" with value of "${env}" instead`
    );

const parseAsStringEnv = ({ env, name }: Params) => {
    if (typeof env === 'string') {
        return env;
    }
    throw generateError({ env, name }, 'string');
};

const parseAsBooleanEnv = ({ env, name }: Params) => {
    if (env === 'true' || env === 'false') {
        return JSON.parse(env);
    }
    throw generateError({ env, name }, 'boolean');
};

const parseAsNumEnv = ({ env, name }: Params) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (env && !isNaN(env)) {
        return Number(env);
    }
    throw generateError({ env, name }, 'number');
};

export { parseAsNumEnv, parseAsBooleanEnv, parseAsStringEnv };
