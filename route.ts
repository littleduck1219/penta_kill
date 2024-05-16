export type GnbRootListItem = {
    path: string;
    route: string;
};

export const gnbRootList: GnbRootListItem[] = [
    {
        path: "/",
        route: "경기일정",
    },
    {
        path: "/match",
        route: "승부예측",
    },
    {
        path: "/player",
        route: "팀정보",
    },
    /**{
        path: "/arena",
        route: "투기장",
    },*/
];
