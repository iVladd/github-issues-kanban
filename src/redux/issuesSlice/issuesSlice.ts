import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { octokit } from "../../config";
import { Status } from "../../types/status";
import { Issue } from "../../types/Issue";
import { DropResult } from "react-beautiful-dnd";

export const loadIssues = createAsyncThunk(
  "repos/load-repos",
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue }
  ) => {
    console.log("executed");

    try {
      const res = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: owner,
        repo: repo,
        per_page: 20,
        state: "all",
        sort: "updated",
      });

      if (res.status !== 200) throw new Error("Error");

      console.log(res.data);

      return res.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

type IssuesSlice = {
  status: Status;
  error: string | null;
  search: string;
  done: Issue[];
  todo: Issue[];
  inProgress: Issue[];
};

const initialState: IssuesSlice = {
  status: "idle",
  error: null,
  search: window.localStorage.getItem("search") || "",
  done: [],
  todo: [],
  inProgress: [],
};

const filterData = (state: IssuesSlice, data: Issue[]) => {
  state.done = [];
  state.todo = [];
  state.inProgress = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.state === "closed") {
      state.done.push(element);
      continue;
    } else if (element.state === "open" && element.assignee) {
      state.inProgress.push(element);
      continue;
    } else if (element.state === "open" && !element.assignee) {
      state.todo.push(element);
    }
  }
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      window.localStorage.setItem("search", action.payload);
    },
    getFromLocalStorage: (state, action: PayloadAction<string>) => {
      const localData = window.localStorage.getItem(action.payload);
      if (!localData) return;
      filterData(state, JSON.parse(localData));
      state.error = null;
    },
    updateStates: (state, action: PayloadAction<DropResult>) => {
      // reducer for drag and drop functionality

      // remove item from source place
      const removedItem = state[
        action.payload.source.droppableId as keyof Pick<
          IssuesSlice,
          "done" | "todo" | "inProgress"
        >
      ].splice(action.payload.source.index, 1)[0];

      // fix data for proper filtering
      const destinationId = action.payload.destination?.droppableId;
      if (destinationId === "done") {
        removedItem.state = "closed";
      } else if (destinationId === "todo") {
        removedItem.state = "open";
        removedItem.assignee = {};
      } else if (destinationId === "inProgress") {
        removedItem.state = "open";
        removedItem.assignee = { "someone": "someone" };
      }

      // insert item to destination place
      state[
        action.payload.destination!.droppableId as keyof Pick<
          IssuesSlice,
          "done" | "todo" | "inProgress"
        >
      ].splice(action.payload.destination!.index, 0, removedItem);

      // set to localStorage
      window.localStorage.setItem(
        state.search,
        JSON.stringify([...state.done, ...state.todo, ...state.inProgress])
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIssues.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadIssues.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.name || "Cannot load data or you didn't pass your personal token (check readme file)";
      })
      .addCase(loadIssues.fulfilled, (state, action) => {
        state.status = "received";
        filterData(state, action.payload);
        window.localStorage.setItem(
          state.search,
          JSON.stringify(action.payload)
        );
      });
  },
});

export const { getFromLocalStorage, setSearch, updateStates } =
  issuesSlice.actions;

export const issuesReducer = issuesSlice.reducer;
