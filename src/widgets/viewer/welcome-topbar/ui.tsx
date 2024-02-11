import { Avatar } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { useGate, useUnit } from 'effector-react';
import { viewerProfileModel } from '@/entities/viewer';
import { WelcomeTopbarGate } from './model';

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="w-full">{children}</div>;
};

export const WelcomeTopbar: FunctionComponent = () => {
    const profile = useUnit(viewerProfileModel.profileDataStore);

    const viewerName = profile?.first_name || 'Гость';
    const viewerInitials = `${profile?.first_name?.charAt(0)}${profile?.last_name?.charAt(0)}`;
    const viewerAvatar = profile?.avatar || '';

    useGate(WelcomeTopbarGate);

    return (
        <Root>
            <div className="mx-auto grid w-full grid-cols-[auto_max-content] items-center gap-2 text-white lg:w-[750px]">
                <div>
                    <div>
                        <span className="font-bold">{`Здравствуйте, ${viewerName}`}</span>
                    </div>
                    <div>
                        <span className="font-bold">Желаем хорошего дня!</span>
                    </div>
                </div>
                <div>
                    <Avatar
                        isBordered
                        name={viewerInitials}
                        as="button"
                        className="transition-transform"
                        src={viewerAvatar}
                    />
                </div>
            </div>
        </Root>
    );
};
