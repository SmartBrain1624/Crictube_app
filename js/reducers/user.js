
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

export type State = {
    name: string,
    login_data:{},
    movie_info: {},
    movie_list:[],
    comment_list:[],
}

const initialState = {
  name: '',
  login_data: {},
  movie_info: {},
  movie_list:[],
  comment_list:[],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      name: action.payload,
    };
  }
  if (action.type === 'Login_Data') {
    return {
      ...state,
      login_data: action.data
    };
  }
  if (action.type === 'Movie_Data_Info') {
    return {
      ...state,
      movie_info: action.data
    };
  }
  if (action.type === 'Movie_Data_List') {
    return {
      ...state,
      movie_list: action.data
    };
  }
  if (action.type === 'Movie_Comment_List') {
    return {
      ...state,
      comment_list: action.data
    };
  }
  if (action.type === 'Add_Movie_Comment') {
    return {
      ...state,
      comment_list: [
        ...state.comment_list,
        action.data,
      ]
    };
  }
  return state;
}
