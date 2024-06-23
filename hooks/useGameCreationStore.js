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
  refreshGameData: () =>
    set((state) => ({
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
    })),
  incrementPageStep: () =>
    set((state) => ({
      pageStep: state.pageStep + 1,
    })),
  decrementPageStep: () =>
    set((state) => ({
      pageStep: state.pageStep - 1,
    })),
    updateGameData: (gameData) =>
      set(() => ({
        gameData: gameData,
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
