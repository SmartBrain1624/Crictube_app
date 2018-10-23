
import type { Action } from './types';

export const SET_USER = 'SET_USER';

export function setUser(user:string):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}
export function login(data):Action {
    return {
        type: 'Login_Data',
        data: data
    };
}
export function MovieInfo(data):Action {
    return {
        type: 'Movie_Data_Info',
        data: data
    };
}
export function MovieList(data):Action {
    return {
        type: 'Movie_Data_List',
        data: data
    };
}
export function MovieComment(data):Action {
    return {
        type: 'Movie_Comment_List',
        data: data
    };
}
export function AddMovieComment(data):Action {
    return {
        type: 'Add_Movie_Comment',
        data: data
    };
}