import LoadingOrError from '@/shared/ui/components/LoadingOrError';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/app.css';

const Gallery = lazy(async () => import('pages/Gallery'));
const Details = lazy(async () => import('pages/Details'));

/**
 * @name App
 * @constructor
 */
export const App: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingOrError />}>
                <Routes>
                    <Route path="/" element={<Gallery />} />
                    <Route path=":fruitName" element={<Details />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
