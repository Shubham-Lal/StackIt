import { create } from 'zustand';

export const useQuestionStore = create((set) => ({
    questions: [],
    setQuestions: (data) => set({ questions: data }),
}));