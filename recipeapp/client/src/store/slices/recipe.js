import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { proxyAddress } from "../../utils/utils";
const { REACT_APP_OPENAI_API_KEY, REACT_APP_YOUR_ORG_ID } = process.env;

const initialState = {
  result: null,
  generating: false,
  sent: false,
  sending: false,
};

export const generate = createAsyncThunk(
  "generate",
  async ({ selectedCousine, ingredients }, _) => {
    try {
      const payload = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I would like to generate an ${selectedCousine} recipe with the following ingredients ${ingredients.join(
              ","
            )}`,
          },
        ],
      };

      const data = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await data.json();
      const messages = responseData.choices["0"].message.content;
      return messages;
    } catch (e) {
      console.log(e, "generate error");
    }
  }
);

export const sendEmail = createAsyncThunk("send-email", async (values, _) => {
  try {
    const data = await fetch(`${proxyAddress}/api/send-email`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    return await data.json();
  } catch (e) {
    console.log(e, "send email error");
  }
});

const recipeSlice = createSlice({
  name: "recipeSlice",
  initialState,
  reducers: {
    resetGenerating: (state) => ({
      ...state,
      generating: false,
    }),
    setGenerating: (state) => ({
      ...state,
      generating: true,
    }),
    setSending: (state) => ({
      ...state,
      sending: true,
    }),
    setSent: (state) => ({
      ...state,
      sent: true,
    }),
    resetSending: (state) => ({
      ...state,
      sending: true,
    }),
    resetSent: (state) => ({
      ...state,
      sent: true,
    }),
    resetResult: (state) => ({
      ...state,
      result: null,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(generate.fulfilled, (state, { payload }) => {
      state.generating = false;

      if (!payload) {
        state.errMsg = { msg: "Result not found", Id: "GET_RESULT_ERROR" };
      } else {
        state.result = payload;
      }
    });

    builder.addCase(sendEmail.fulfilled, (state, { payload }) => {
      state.sending = false;

      if (payload && payload.sent) {
        state.sent = true;
      } else {
        state.errMsg = { msg: "Result not found", Id: "SEND_EMAIL_ERROR" };
      }
    });
  },
});

const { actions, reducer } = recipeSlice;
export const {
  setGenerating,
  resetGenerating,
  setSending,
  setSent,
  resetSending,
  resetSent,
  resetResult
} = actions;
export default reducer;
