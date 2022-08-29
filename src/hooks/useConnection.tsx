import {useAppSelector} from "./index";


export function useConnection(url: string) {
    return useAppSelector(store => store.ws.openConnections[url]);
}