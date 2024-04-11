import {PageState} from "@/pages/deliveries/singleDeliveryDetailsPage/types";

export const handleDeliveryNotLoaded = (error: unknown): PageState => {
    if (error instanceof Error && error.message === 'NOT_FOUND_IN_CACHE') {
        return PageState.NOT_LOADED;
    }
    return PageState.Error;
}