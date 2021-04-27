import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state: {
        lists: [
            {
                id: 1,
                text: "Список 1",
                color: "green",
            },
            {
                id: 2,
                text: "Список 2",
                color: "green",
            },
            {
                id: 3,
                text: "Список 3",
                color: "green",
            },
            {
                id: 4,
                text: "Список 4",
                color: "green",
            },
            {
                id: 5,
                text: "Список 5",
                color: "green",
            },
        ],

        tasks: [
            {
                listId: 1,
                id: 1,
                title: "delectus aut autem",
                day: "14.08.21 14:37",
                urgently: true,
                completed: false,
            },
            {
                listId: 1,
                id: 2,
                title: "quis ut nam facilis et officia qui",
                day: "14.08.21 14:37",
                urgently: false,
                completed: false,
            },
            {
                listId: 1,
                id: 3,
                title: "fugiat veniam minus",
                day: "14.08.21 14:37",
                urgently: true,
                completed: false,
            },
            {
                listId: 1,
                id: 4,
                title: "et porro tempora",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 2,
                id: 5,
                title:
                    "laboriosam mollitia et enim quasi adipisci quia provident illum",
                day: "14.08.21 14:37",
                urgently: true,
                completed: false,
            },
            {
                listId: 2,
                id: 6,
                title: "qui ullam ratione quibusdam voluptatem quia omnis",
                day: "14.08.21 14:37",
                urgently: true,
                completed: false,
            },
            {
                listId: 2,
                id: 7,
                title: "illo expedita consequatur quia in",
                day: "14.08.21 14:37",
                urgently: true,
                completed: false,
            },
            {
                listId: 2,
                id: 8,
                title: "quo adipisci enim quam ut ab",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 3,
                id: 9,
                title: "molestiae perspiciatis ipsa",
                day: "14.08.21 14:37",
                urgently: true,
                completed: false,
            },
            {
                listId: 3,
                id: 10,
                title: "illo est ratione doloremque quia maiores aut",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 3,
                id: 11,
                title: "vero rerum temporibus dolor",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 3,
                id: 12,
                title: "ipsa repellendus fugit nisi",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 4,
                id: 13,
                title: "et doloremque nulla",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 4,
                id: 14,
                title: "repellendus sunt dolores architecto voluptatum",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 4,
                id: 15,
                title: "ab voluptatum amet voluptas",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 4,
                id: 16,
                title: "accusamus eos facilis sint et aut voluptatem",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
            {
                listId: 4,
                id: 17,
                title: "quo laboriosam deleniti aut qui",
                day: "14.08.21 14:37",
                urgently: true,
                completed: true,
            },
        ],
        visibleList: [],
        currentList: [],
        currentTasks: [],
    },
    mutations: {
        ADD_LIST(state, addtext) {
            if (!addtext) {
                alert("Введите название списка");
                return;
            }

            const newList = {
                id: Math.floor(Math.random() * 100000),
                text: addtext,
                color: "white",
            };

            state.lists = [...state.lists, newList];
            state.visibleList = [...state.visibleList, newList];
            alert("Список дел " + newList.text + " добавлен");
        },

        ADD_TASK(state, { text, check }) {
            if (!text) {
                alert("Введите название задачи");
                return;
            }
            let date = new Date();
            let day = date.getDate();
            if (date.getDate() < 10) {
                day = "0" + date.getDate();
            }
            let month = date.getMonth();
            if (date.getMonth() < 10) {
                month = "0" + (date.getMonth() + 1);
            }
            let year = String(date.getFullYear()).substr(2);
            let hour = date.getHours();
            if (date.getHours() < 10) {
                hour = "0" + date.getHours();
            }
            let minut = date.getMinutes();
            if (date.getMinutes() < 10) {
                minut = "0" + date.getMinutes();
            }
            day = day + "." + month + "." + year + " " + hour + ":" + minut;

            const newTask = {
                listId: state.currentList.id,
                id: Math.floor(Math.random() * 100000),
                title: text,
                day: day,
                urgently: check,
                completed: false,
            };
            console.log(newTask);
            state.tasks = [...state.tasks, newTask];
            state.currentTasks = [...state.currentTasks, newTask];
            alert(newTask.title + " добавлено в " + state.currentList.text);
        },

        DELETE_LIST(state, id) {
            if (confirm("Вы действительно хотите удалить список?")) {
                state.lists = state.lists.filter((list) => list.id !== id);
                state.visibleList = state.visibleList.filter((list) => list.id !== id);
            }
        },

        DELETE_TASK(state, id) {
            if (confirm("Вы действительно хотите удалить задачу?")) {
                state.tasks = state.tasks.filter((task) => task.id !== id);
                state.currentTasks = state.currentTasks.filter((task) => task.id !== id);
            }
        },

        GET_CURRENT_LIST(state, list) {
            state.currentList = list;
            state.currentTasks = state.tasks.filter((task) => task.listId === list.id)
        },

        COLOR_LIST(state) {
            for (let list in state.lists) {
                console.log(state.lists[list]);
                let taskLenght = 0;
                let count = 0;
                for (let task in state.tasks) {
                    if (state.lists[list].id === state.tasks[task].listId) {
                        taskLenght++;
                    }
                    if (state.lists[list].id === state.tasks[task].listId && state.tasks[task].completed === true) {
                        count++;
                    }
                    if (taskLenght === count) {
                        state.lists[list].color = "gray"
                    }
                    if (taskLenght > count) {
                        state.lists[list].color = "green"
                    }
                    if (taskLenght === 0) {
                        state.lists[list].color = "white"
                    }
                }
            }
        },

        LIST_FILTER(state, selectedOption) {
            switch (selectedOption) {
                case "all":
                    state.visibleList = state.lists;
                    break;
                case "done":
                    state.visibleList = state.lists.filter((list) => {
                        var count = 0;
                        for (let task in state.tasks) {
                            if (
                                state.tasks[task].listId === list.id &&
                                state.tasks[task].completed === false
                            ) {
                                count += 1;
                            }
                        }
                        if (count === 0) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    break;
                case "works":
                    state.visibleList = state.lists.filter((list) => {
                        var count = 0;
                        for (let task in state.tasks) {
                            if (
                                state.tasks[task].listId === list.id &&
                                state.tasks[task].completed === false
                            ) {
                                count += 1;
                            }
                        }
                        if (count > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    break;
            }

        }
    },
    actions: {},
    getters: {},
})
const app = createApp(App);
app.use(store)
app.mount('#app')
