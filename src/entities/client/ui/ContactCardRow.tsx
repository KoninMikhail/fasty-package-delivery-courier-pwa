interface IContact {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface IContactCardProperties {
    contact: IContact;
    onContactSelect: (contact: IContact) => void;
}
export const ContactCardRow: FunctionComponent<IContactCardProperties> = ({
    contact,
    onContactSelect,
}) => {
    return (
        <div className="contact-card" onClick={() => onContactSelect(contact)}>
            <div className="contact-card__avatar">
                <img src={contact.avatar} alt={contact.name} />
            </div>
            <div className="contact-card__info">
                <h4>{contact.name}</h4>
                <p>{contact.email}</p>
            </div>
        </div>
    );
};
