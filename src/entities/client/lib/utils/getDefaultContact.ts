import {Contact} from "@/shared/api";

export const getDefaultContact = (contacts: Contact[]) => {
    const defaultContact = contacts.find(contact => contact.default);
    if (defaultContact) {
        return defaultContact;
    }
    return contacts[0];
}