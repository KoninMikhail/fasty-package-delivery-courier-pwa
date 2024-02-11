interface IEnvironmentChipProperties {
    hideOnEnvs?: string | string[];
}

export const EnvironmentChip: FunctionComponent<IEnvironmentChipProperties> = ({
    hideOnEnvs: hideOnEnvironments,
}) => {
    const { NODE_ENV } = import.meta.env;

    if (hideOnEnvironments.includes(NODE_ENV)) {
        return null;
    }

    return (
        <Chip color="warning" size="sm" className="mb-2">
            {NODE_ENV}
        </Chip>
    );
};
