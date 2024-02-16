import { Input } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { useUnit } from 'effector-react';
import { viewerProfileModel } from '@/entities/viewer';
import { UserAvatar } from '@/entities/user/ui/UserAvatar/UserAvatar';
import { WelcomeTopbarGate } from './model';

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="w-full">{children}</div>;
};

export const WelcomeTopbar: FunctionComponent = () => {
    const profile = useUnit(viewerProfileModel.$profileDataStore);
    const viewerName = profile?.first_name || '';

    return (
        <Root>
            <WelcomeTopbarGate />
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
                    <UserAvatar user={profile} isBordered />
                </div>
            </div>
            <div>
                <Input
                    type="email"
                    label="Email"
                    placeholder="00000000"
                    labelPlacement="outside"
                    startContent="#"
                />
            </div>
        </Root>
    );
};
