import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameTags: (state, action) => {
      const { gameId, tags } = action.payload;
      state.games[gameId] = {
        ...state.games[gameId],
        tags,
      };
    },
    setGameCurrentTime: (state, action) => {
      const { gameId, currentTime } = action.payload;
      state.games[gameId] = {
        ...state.games[gameId],
        currentTime,
      };
    },
  },
});

export const { setGameTags, setGameCurrentTime } = gameSlice.actions;

export default gameSlice.reducer;
