import { Image } from '@nextui-org/react';
import { userUi } from '@/entities/user';
import { Link } from 'react-router-dom';

const { UserCardRow } = userUi;

export const NavbarDesktop: FunctionComponent = () => {
    return (
        <header className="grid w-full grid-cols-[max-content_auto_max-content] items-center gap-4">
            <div className="grid grid-flow-col items-center gap-4">
                <Image
                    width={80}
                    alt="NextUI hero Image"
                    src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                />
                <h1 className="text-2xl font-semibold leading-none text-default-600">
                    Доставка
                </h1>
            </div>
            <div className="grid justify-center">
                <nav className="flex flex-wrap items-center justify-between">
                    <Link
                        to="/"
                        className="mr-6 flex flex-shrink-0 items-center"
                    >
                        Биржа
                    </Link>
                    <Link
                        to="/"
                        className="mr-6 flex flex-shrink-0 items-center"
                    >
                        Мои доставки
                    </Link>
                </nav>
            </div>
            <div className="grid grid-flow-col items-center gap-4">
                <div>asds</div>
                <div>увед</div>
                <div>
                    <UserCardRow
                        account={{
                            name: 'Mike Konin',
                            email: 'dev.konin@gmail.com',
                            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                        }}
                        avatarPosition="right"
                    />
                </div>
            </div>
        </header>
    );
};
