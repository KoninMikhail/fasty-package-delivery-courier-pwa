import useBrowserPrompt from './useBrowserPrompt';

const Component = () => {
    const [value, showPrompt] = useBrowserPrompt();

    const handleButtonClick = (): void => {
        showPrompt('Please enter your name:');
    };

    return (
        <div>
            <button type="button" onClick={handleButtonClick}>
                Show Prompt
            </button>
            {value && <p>Welcome, {value}!</p>}
        </div>
    );
};

export default Component;
