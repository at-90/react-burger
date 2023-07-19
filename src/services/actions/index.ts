
export const APP_MESSAGE:'APP/APP_MESSAGE' = `APP/APP_MESSAGE`;
export const CLEAR_APP_MESSAGES:`APP/CLEAR_APP_MESSAGES` = `APP/CLEAR_APP_MESSAGES`;

export type TAppActions=
    {type: typeof  APP_MESSAGE, message: string} |
    {type: typeof  CLEAR_APP_MESSAGES, message: string}