export interface UserStoreState {
    nickName: string
    avatar:string
    userId:string

}

export const DEFAULT_USER_STATE:UserStoreState = (() => ({
    nickName: '',
    avatar: 'https://s6.bihukankan.com/common/default.png',
    userId: '',

}))()