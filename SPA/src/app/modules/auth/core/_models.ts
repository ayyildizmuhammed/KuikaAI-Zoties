export interface AuthModel {
    api_token: string
    refreshToken?: string
}

export interface UserModel {
    id: number
    email: string
    fullname?: string
    accountName?: string
    roles?: Array<string>
    pic?: string
    auth?: AuthModel
}

// export interface UserAddressModel {
//     addressLine: string
//     city: string
//     state: string
//     postCode: string
// }

// export interface UserCommunicationModel {
//     email: boolean
//     sms: boolean
//     phone: boolean
// }

// export interface UserSocialNetworksModel {
//     linkedIn: string
//     facebook: string
//     twitter: string
//     instagram: string
// }

// export interface UserEmailSettingsModel {
//     emailNotification?: boolean
//     sendCopyToPersonalEmail?: boolean
//     activityRelatesEmail?: {
//         youHaveNewNotifications?: boolean
//         youAreSentADirectMessage?: boolean
//         someoneAddsYouAsAsAConnection?: boolean
//         uponNewOrder?: boolean
//         newMembershipApproval?: boolean
//         memberRegistration?: boolean
//     }
//     updatesFromKeenthemes?: {
//         newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
//         tipsOnGettingMoreOutOfKeen?: boolean
//         thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
//         newsAboutStartOnPartnerProductsAndOtherServices?: boolean
//         tipsOnStartBusinessProducts?: boolean
//     }
// }