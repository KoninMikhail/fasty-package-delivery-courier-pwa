import useKeyPress from './useKeyPress';

export default function Component() {
    useKeyPress(['Enter', 'Escape'], () => {
        console.log('Hello World!');
    });

    return 'Hello World!';
}
