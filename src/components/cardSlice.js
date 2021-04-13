import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("cards/getUser", async () => {
  return fetch("https://randomuser.me/api").then((res) => res.json());
});
const cardSlice = createSlice({
  name: "cards",
  initialState: {
    user: [],
    status: "",
    newCard: [
      {
        number: "5162 0933 8384 8387",
        name: "",
        month: "12",
        year: "23",
        cvc: "343",
        vendor: "visacard",
        activeCard: true,
      },
    ],
  },

  reducers: {
    addNewCard: (state, action) => {
      state.newCard = state.newCard.concat(action.payload);
    },
    activeCard: (state, action) => {
      state.newCard.forEach((card) => {
        if (card.activeCard === true) {
          card.activeCard = false;
        }
        if (card.cvc + card.number === action.payload) {
          card.activeCard = true;
        }
      });
    },
    removeCard: (state, action) => {
      state.newCard = state.newCard.filter(
        (card) =>
          card.cvc + card.number !== action.payload.cvc + action.payload.number
      );
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.status = "loading...";
    },

    [getUser.fulfilled]: (state, action) => {
      state.status = "success";
      let user = action.payload.results[0].name;
      const userName = user.first + " " + user.last;
      state.newCard[0].name = userName.toUpperCase();
    },

    [getUser.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

const { actions, reducer } = cardSlice;
export const { addNewCard, activeCard, removeCard } = actions;

export default reducer;
