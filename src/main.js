import axios from 'axios';
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state: {
        lists: [],
        tasks: [],
        visibleList: [],
        currentList: [],
        currentTasks: [],
    },
    mutations: {
        SET_LISTS_TO_STATE: (state, lists) => {
            state.lists = lists;
        },
        SET_TASKS_TO_STATE: (state, tasks) => {
            state.tasks = tasks;
        },
        ADD_LIST(state, addtext) {
            if (!addtext) {
                alert("Введите название списка");
                return;
            }
            axios
                .post('http://localhost:5000/lists', {
                    text: addtext,
                    color: "white",
                })
                .then((data) => {
                    state.lists = [...state.lists, data.data];
                    state.visibleList = [...state.visibleList, data.data];
                    console.log(data);
                    alert("Список дел " + data.data.text + " добавлен");
                })
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
            axios
                .post('http://localhost:5000/tasks', {
                    listId: state.currentList.id,
                    title: text,
                    day: day,
                    urgently: check,
                    completed: false,
                })
                .then((data) => {
                    state.tasks = [...state.tasks, data.data];
                    state.currentTasks = [...state.currentTasks, data.data];
                    alert(data.data.title + " добавлено в " + state.currentList.text);
                })

        },

        DELETE_LIST(state, id) {
            if (confirm("Вы действительно хотите удалить список?")) {
                axios
                    .delete('http://localhost:5000/lists/' + id)
                    .then(() => {
                        state.lists = state.lists.filter((list) => list.id !== id);
                        state.visibleList = state.visibleList.filter((list) => list.id !== id);
                    })
            }
        },

        DELETE_TASK(state, id) {
            if (confirm("Вы действительно хотите удалить задачу?")) {
                axios
                    .delete('http://localhost:5000/tasks/' + id)
                    .then(() => {
                        state.tasks = state.tasks.filter((task) => task.id !== id);
                        state.currentTasks = state.currentTasks.filter((task) => task.id !== id);
                    })
            }
        },

        GET_CURRENT_LIST(state, list) {
            state.currentList = list;
            console.log(state.currentList)
            state.currentTasks = state.tasks.filter((task) => task.listId === list.id)
        },

        COLOR_LIST(state) {
            for (let list in state.lists) {
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

        SORT(state) {
            state.visibleList.sort((a, b) => a.text.localeCompare(b.text));
        },

        LIST_FILTER(state, selectedOption) {
            console.log(state.lists);
            console.log(selectedOption);
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

        },
    },
    actions: {
        GET_LISTS_FROM_API({ commit }) {
            return axios('http://localhost:5000/lists', {
                method: "GET"
            })
                .then((lists) => {
                    commit('SET_LISTS_TO_STATE', lists.data)
                    return lists
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        GET_TASKS_FROM_API({ commit }) {
            return axios('http://localhost:5000/tasks', {
                method: "GET"
            })
                .then((tasks) => {
                    commit('SET_TASKS_TO_STATE', tasks.data)
                    return tasks
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
    },
    getters: {},
})
const app = createApp(App);
app.use(store)
app.mount('#app')
