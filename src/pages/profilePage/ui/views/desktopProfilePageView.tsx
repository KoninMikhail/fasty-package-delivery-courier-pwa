import type { PropsWithChildren } from 'react';

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="h-full w-full">{children}</div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[1200px]">
        {children}
    </main>
);

const Header: FunctionComponent = () => (
    <div className="flex-col px-2 lg:mx-auto lg:w-[1200px]">sdf</div>
);

export const DesktopProfilePageView: FunctionComponent = () => {
    return (
        <Container>
            <Header />
            <MainContainer>..</MainContainer>
        </Container>
    );
};
