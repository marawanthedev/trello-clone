export const initialData = {
    columns: {
        todo: {
            id: "todo",
            title: "To do",
            cardIds: ["card-1", "card-2"],
        },
        doing: {
            id: "doing",
            title: "Doing",
            cardIds: ["card-3"],
        },
        done: {
            id: "done",
            title: "Done",
            cardIds: ["card-4", "card-5"],
        },
    },
    cards: {
        "card-1": { id: "card-1", content: "Task 1" },
        "card-2": { id: "card-2", content: "Task 2" },
        "card-3": { id: "card-3", content: "Task 3" },
        "card-4": { id: "card-4", content: "Task 4" },
        "card-5": { id: "card-5", content: "Task 5" },
    },
    columnOrder: ["todo", "doing", "done"],
};
