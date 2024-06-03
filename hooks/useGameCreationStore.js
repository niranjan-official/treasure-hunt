import { create } from "zustand";

const useGameCreationStore = create((set) => ({
  gameData: {
    basicData: {
      title: "",
      venue: "",
      levels: 0,
    },
    instructions: [],
    questionsAnswers: [],
    qrData: [],
  },
  pageStep: 1,
  incrementPageStep: () =>
    set((state) => ({
      pageStep: state.pageStep + 1,
    })),
  decrementPageStep: () =>
    set((state) => ({
      pageStep: state.pageStep - 1,
    })),
  updateBasicData: (basicData) =>
    set((state) => ({
      gameData: { ...state.gameData, basicData },
    })),
  updateInstructions: (instructions) =>
    set((state) => ({
      gameData: { ...state.gameData, instructions },
    })),
  updateQuestionsAnswers: (questionsAnswers) =>
    set((state) => ({
      gameData: { ...state.gameData, questionsAnswers },
    })),
  updateQrData: (qrData) =>
    set((state) => ({
      gameData: { ...state.gameData, qrData },
    })),
}));

export default useGameCreationStore;
