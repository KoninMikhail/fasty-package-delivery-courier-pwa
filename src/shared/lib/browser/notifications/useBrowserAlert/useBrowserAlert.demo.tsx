import useBrowserAlert from './useBrowserAlert';

function Component() {
    const { createAlert } = useBrowserAlert();

    return (
        <button
            type="button"
            onClick={() => createAlert('This is a test alert')}
        >
            Click me!
        </button>
    );
}

export default Component;
