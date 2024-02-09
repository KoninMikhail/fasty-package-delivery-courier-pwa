interface IDayProperties {
    selected: boolean;
}
export const Day: FunctionComponent = () => {
    return (
        <div className="flex h-16 w-16 flex-col items-center justify-center">
            <span className="text-2xl font-bold">1</span>
            <span className="text-sm font-medium">Пн</span>
        </div>
    );
};
