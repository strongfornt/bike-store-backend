export interface IDeactivatedUserIntoDB {
    userId: string;
    data: {
        isBlocked: boolean
    },
    actionAdminId: string;
}