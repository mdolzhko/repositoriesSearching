import {ReposAction, ReposActionTypes, ReposState} from "../../types/repos";

const initialState: ReposState = {
    repos: [],
    page: 1,
    error: null,
    loading: false,
    totalRepos: 0
}

export const reposReducer = (state= initialState, action: ReposAction): ReposState => {
    switch (action.type){
        case ReposActionTypes.FETCH_REPOS:
            return {
                ...state,
                loading: true
            }
        case ReposActionTypes.FETCH_REPOS_SUCCESS:
            return {
                ...state,
                loading: false,
                repos: action.payload,
                error: null
            }
        case ReposActionTypes.FETCH_REPOS_TOTAL_COUNT:
            return {
                ...state,
                totalRepos: action.payload
            }
        case ReposActionTypes.FETCH_REPOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ReposActionTypes.FETCH_REPOS_RESET:
            return {
                ...state,
                repos: [],
                page: 1,
                totalRepos: 0
            }
        case ReposActionTypes.SET_REPOS_PAGE:
            return {
                ...state,
                page: action.payload
            }
        default:
            return state
    }
}