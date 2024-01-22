import type { PropsWithChildren, ReactNode } from 'react';

interface ISectionWithTitleProperties {
    title: string;
    featureSlot?: ReactNode | ReactNode[];
}

const SectionWithTitle: FunctionComponent<
    PropsWithChildren<ISectionWithTitleProperties>
> = ({ children, title, featureSlot }) => {
    return (
        <div className="flex flex-col gap-4 overflow-visible">
            <div className="grid grid-cols-[auto_max-content]">
                <div>
                    <h3 className="px-2 text-xl font-semibold leading-none text-default-600">
                        {title}
                    </h3>
                </div>
                <div>{featureSlot}</div>
            </div>

            <div className="p-2">{children}</div>
        </div>
    );
};

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="h-full w-full">{children}</div>
);

const MainContainer: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-2 lg:mx-auto lg:w-[1200px]">
        {children}
    </main>
);

const Header: FunctionComponent = () => (
    <div className="flex-col px-2 lg:mx-auto lg:w-[1200px]" />
);

export const DesktopRootPageView: FunctionComponent = () => {
    return (
        <Container>
            <Header />
            <MainContainer>..</MainContainer>
        </Container>
    );
};
