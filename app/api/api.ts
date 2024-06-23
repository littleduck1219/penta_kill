"use client";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import axios from "axios";
import Cookies from "js-cookie";

const API_ENDPOINT = process.env.NEXT_PUBLIC_URL;

const PENTAAPI = axios.create({
    baseURL: API_ENDPOINT,
});

// 회원가입
export type RegisterParams = {
    username: string;
    email: string;
    password: string;
};

export const userRegister = async ({
    username,
    email,
    password,
}: RegisterParams): Promise<RegisterParams> => {
    try {
        const response = await axios.post("/users/signup", {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 로그인
type LoginParams = Pick<RegisterParams, "email" | "password">;

export const userLogin = async ({ email, password }: LoginParams) => {
    try {
        const response = await axios.post("/users/login", {
            email,
            password,
        });

        // Extract the token from the Authorization header
        const authHeader = response.headers["authorization"];
        const accessToken = authHeader && authHeader.split(" ")[1];

        if (accessToken) {
            Cookies.set("Access_Token", accessToken, { sameSite: "strict" });
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

// 승부예측(일정)
export const getMatchPredictionList = async () => {
    try {
        const response = await axios.get("/bets/recentTournament/schedules");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 베팅하기
export const postBettingPoint = async (data: {
    matchId: string;
    teamCode: string;
    point: number;
}) => {
    try {
        const response = await axios.post("/points/bettings", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 경기일정
export const fetchMatchSchedule = async ({
    page,
    size,
    year,
    month,
}: {
    page: number;
    size: number;
    year: number;
    month: number;
}) => {
    try {
        const response = await PENTAAPI.get(`/schedules/leagues`, {
            params: { page, size, year, month },
        });
        console.log("경기일정", response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 펜타톡
export const fetchPosts = async ({
    page,
    size,
}: {
    page: number;
    size: number;
}) => {
    try {
        const response = await PENTAAPI.get(`/posts`, {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 게시글 상세
export const fetchPost = async (id: number) => {
    try {
        const response = await PENTAAPI.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 댓글목록
export const fetchComments = async (
    postId: number,
    page: number,
    size: number,
) => {
    try {
        const response = await PENTAAPI.get(`/posts/${postId}/comments`, {
            params: { page, size },
        });
        console.log("댓글통신", response.data);
        return response.data;
    } catch (error) {
        console.error("댓글에러", error);
        throw error;
    }
};
