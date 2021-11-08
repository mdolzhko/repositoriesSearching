export interface ReposState {
    repos: Repo[];
    loading: boolean;
    error: null | string;
    page: number;
    totalRepos: number;
}

export enum ReposActionTypes {
    FETCH_REPOS = 'FETCH_REPOS',
    FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS',
    FETCH_REPOS_TOTAL_COUNT = 'FETCH_REPOS_TOTAL_COUNT',
    FETCH_REPOS_RESET = 'FETCH_REPOS_RESET',
    FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR',

    SET_REPOS_PAGE = 'SET_REPOS_PAGE',
}
interface FetchReposAction {
    type: ReposActionTypes.FETCH_REPOS
}
interface FetchReposSuccessAction {
    type: ReposActionTypes.FETCH_REPOS_SUCCESS;
    payload: Repo[];
}
interface FetchTotalReposAction {
    type: ReposActionTypes.FETCH_REPOS_TOTAL_COUNT;
    payload: number;
}
export interface Repos {
    items: Repo[];
    total_count: number;
}
export interface Repo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    watchers: number;
}

interface FetchReposErrorAction {
    type: ReposActionTypes.FETCH_REPOS_ERROR;
    payload: string;
}
interface FetchReposResetAction {
    type: ReposActionTypes.FETCH_REPOS_RESET
}
interface SetReposPage {
    type: ReposActionTypes.SET_REPOS_PAGE;
    payload: number;
}

export type ReposAction =
    FetchReposAction |
    FetchReposSuccessAction |
    FetchTotalReposAction |
    FetchReposErrorAction |
    FetchReposResetAction |
    SetReposPage;