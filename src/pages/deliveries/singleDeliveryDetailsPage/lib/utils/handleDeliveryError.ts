import { PageState } from "../../types";

export const handleDeliveryError = (error: unknown): PageState => {
    if (error instanceof Error && error.message === 'DELIVERY_NOT_FOUND') {
        return PageState.NotFound;
    }
    return PageState.Error;
}