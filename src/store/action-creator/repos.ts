import axios, { CancelTokenSource } from "axios";
import {Dispatch} from "redux";
import {ReposAction, ReposActionTypes, Repos} from "../../types/repos";

const _URL = 'https://api.github.com/search/repositories';
const CANCEL_FETCH = 'CancelFetching';
let source: CancelTokenSource | undefined;

export const fetchRepos = (searchQuery: string | number, page: number) => {
    const pre = `${searchQuery}-${page}`;

    if(!searchQuery){
        return async (dispatch: Dispatch<ReposAction>) => {
            dispatch({
                type: ReposActionTypes.FETCH_REPOS_RESET
            });
        }
    }

    if(localStorage && Object.keys(localStorage).includes(pre) ){
        const cashedData = JSON.parse(localStorage.getItem(pre) as string);
        const poppedEl = cashedData.pop();

        return async (dispatch: Dispatch<ReposAction>) => {
            dispatch({
                type: ReposActionTypes.FETCH_REPOS_SUCCESS,
                payload: cashedData.slice(0,-1),
            });
            dispatch({
                type: ReposActionTypes.FETCH_REPOS_TOTAL_COUNT,
                payload: poppedEl.total,
            });

        }
    }

    return async (dispatch: Dispatch<ReposAction>) => {
        try {
            dispatch({
                type: ReposActionTypes.FETCH_REPOS
            });

            if(source){
                source.cancel(CANCEL_FETCH)
            }

            source = axios.CancelToken.source();

            const responseUrl = `${_URL}?q=${searchQuery}&page=${page}&per_page=10&sort=stars`;
            const {data} = await axios.get(responseUrl,{ cancelToken: source.token });

            source = undefined;

            const {items, total_count} : Repos = data;

            dispatch({
                type: ReposActionTypes.FETCH_REPOS_SUCCESS,
                payload: items,
            });

            dispatch({
                type: ReposActionTypes.FETCH_REPOS_TOTAL_COUNT,
                payload: total_count,
            });

            localStorage.setItem(`${searchQuery}-${page}`, JSON.stringify([...items, {total: total_count}]));
        } catch (e: any) {
            if(e.message !== CANCEL_FETCH){
                dispatch({
                    type: ReposActionTypes.FETCH_REPOS_ERROR,
                    payload: 'Fetch Repos Error!!!'
                })
            }
        }
    }
}

export const setReposPage = (page: number): ReposAction => ({
    type: ReposActionTypes.SET_REPOS_PAGE,
    payload: page
});

