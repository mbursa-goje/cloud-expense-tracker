import { useContext } from 'react';
import { ScreenSizeContext } from './ScreenSize';

export function useScreenSize(){
    const context = useContext(ScreenSizeContext);

    if(context === undefined){
        return{
            isMobile: false,
        }
    }

    return context;
}