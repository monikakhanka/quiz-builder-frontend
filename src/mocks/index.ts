import MockAdapter from "axios-mock-adapter";
import {api} from "../api";
import {Quiz} from "../models/quiz";
import { config } from "process";

const mock = new MockAdapter(api, {delayResponse: 500});

let quizzes: Quiz[] = [];

// GET all quizzes
mock.onGet("/quizzes").reply(200, quizzes);

// POST new quiz
mock.onPost("/quizzes").reply((config) => {
    const newQuiz: Quiz = {
        id: Date.now().toString(),
        title: "Untitled Quiz",
        blocks: [],
        published: false,
        updatedAt: new Date().toISOString(),
        ...JSON.parse(config.data),
    };
    quizzes.push(newQuiz);
    return [200, newQuiz];
});

// PUT update quiz
mock.onPut(/\/quizzes\/\d+/).reply((config) => {
    const id = config.url!.split("/").pop();
    const idx = quizzes.findIndex((q)=> q.id === id);
    if(idx === -1) return [404];
    quizzes[idx] = { ...quizzes[idx], ...JSON.parse(config.data)};
    return [200, quizzes[idx]]
});


// GET single quiz
mock.onGet(/\/quizzes\/\d+/).reply((config)=>{
    const id = config.url!.split("/").pop();
    const quiz = quizzes.find((q) => q.id === id);
    return quiz ? [200, quiz] : [404];
    
});

export default mock;