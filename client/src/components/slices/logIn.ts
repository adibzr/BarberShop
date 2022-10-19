import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

export interface userInfo {

  user: string;
}

const initialState: userInfo = {
  user: "",

};

//==========action==================
export const logIn = (email: string, password: string): AppThunk => {
  return async (dispatch) => {
    try {
      const credenciales: string = await axios.post(
        "http://localhost:5000/users/login",
        { email, password }
      );
      dispatch(userLogIn(credenciales));
    } catch (error) {
      return error;
    }
  };
};
//================reducer===================

export const logInReducerSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLogIn: (state, action: PayloadAction<string>) => {

      state.user = action.payload;

    },
  },
});

export default logInReducerSlice.reducer;
export const { userLogIn } = logInReducerSlice.actions;