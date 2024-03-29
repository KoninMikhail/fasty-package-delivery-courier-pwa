import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { Spacer } from '@nextui-org/react';

export const ErrorPolicyLoad: FunctionComponent = () => (
    <div className="py-16 text-center text-content3">
        <MdOutlineReportGmailerrorred className="mx-auto text-7xl" />
        <div className="font-bold">
            Ошибка загрузки политики конфиденциальности
        </div>
        <Spacer y={1} />
    </div>
);
