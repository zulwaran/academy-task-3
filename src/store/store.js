import { createStore } from 'vuex'

const store = createStore({
    state: {
        //Содержит все списки дел полученные из БД
        lists: [],
        //Содержит все задачи полученные из БД 
        tasks: [],
        //Переключатели видимости блока с задачами
        showListName: false,
        showAddTask: false,
        showTasks: false,
        //Содержит в себе списки дел, которые необходимо отобразить на экране в данный момент
        visibleLists: [],
        //Содержит в себе задачи, которые необходимо отобразить на экране в данный момент
        currentTasks: [],
        //Содержит в себе данные о активном списке дел 
        currentList: [],
        //Опция фильтра "по умолчанию"
        selectedOption: "done",
    },
    mutations: {
        // Получаем из БД массив списков дел, и сортируем их. 
        SET_LISTS_TO_STATE: (state, lists) => {
            state.lists = lists;
            state.lists.sort((a, b) => a.text.localeCompare(b.text));
            state.visibleLists = state.lists
        },

        // Получаем из БД массив задач. 
        SET_TASKS_TO_STATE: (state, tasks) => {
            state.tasks = tasks;
        },

        // Добавляем новый список дел. 
        ADD_LIST(state, newList) {
            state.lists = [...state.lists, newList]
            state.lists.sort((a, b) => a.text.localeCompare(b.text));
            state.visibleLists = state.lists
        },

        // Добавляем новую задачу. 
        ADD_TASK(state, newTask) {
            state.tasks = [...state.tasks, newTask]
            state.currentTasks = [...state.currentTasks, newTask]
        },

        // Удаляем список дел и все задачи связанные с ним. Если список был активным, то окно задач становится пустым
        DELETE_LIST(state, id) {
            state.lists = state.lists.filter((list) => list.id !== id);
            state.tasks = state.tasks.filter((task) => task.listId !== id);
            state.currentTasks = [];
            if (state.currentList && state.currentList.id === id) {
                state.showAddTask = false;
                state.showListName = false;
                state.showTasks = false;
            }
        },

        // Удаляем задачу
        DELETE_TASK(state, id) {
            state.tasks = state.tasks.filter((task) => task.id !== id);
            state.currentTasks = state.currentTasks.filter((task) => task.id !== id)
        },

        // Получаем активный список дел, выводим на экран задачи связанные с ним
        GET_CURRENT_LIST(state, list) {
            state.currentList = list;
            state.showAddTask = true;
            state.showListName = true;
            state.showTasks = true;
            state.currentTasks = state.tasks.filter((task) => task.listId === list.id)
        },

        //Меняем статус задачи на противоположный
        CHANGE_TASK_COMPLITED(state, id) {
            state.tasks = state.tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)
        },

        // Проверяем статус списков дел и выдаем им соответсвующий класс
        COLOR_LIST(state) {
            for (let list in state.visibleLists) {
                let count = 0;
                for (let task in state.tasks) {
                    if (state.visibleLists[list].id === state.tasks[task].listId && state.tasks[task].completed === true) {
                        count++;
                    }
                }
                if (state.visibleLists[list].count_tasks === 0) {
                    state.visibleLists[list].color = "white"
                } else if (state.visibleLists[list].count_tasks === count) {
                    state.visibleLists[list].color = "gray"
                } else {
                    state.visibleLists[list].color = "green"
                }
            }
        },

        // Получаем выбранную опцию фильтра. При переключении опций, окно с задачами очищается
        FILTER_OPTION(state, selectedOption) {
            state.selectedOption = selectedOption,
                state.showListName = false,
                state.showAddTask = false,
                state.showTasks = false
        },

        // Фильтруем списки дел в зависимости от выбранной опции
        LIST_FILTER(state, selectedOption) {
            if (selectedOption == "all") {
                state.visibleLists = state.lists;
                return state.visibleLists
            }
            if (selectedOption == "done") {
                state.visibleLists = store.getters.doneLists;
                return state.visibleLists
            }
            if (selectedOption == "works") {
                state.visibleLists = store.getters.workLists;
                console.log(state.visibleLists)
                return state.visibleLists
            }
        },

        //Увеличиваем количество задач в списке дел на +1
        INC_COUNT_TASKS(state, data) {
            state.lists = state.lists.map((list) => list.id === data.id ? { ...list, count_tasks: data.count_tasks } : list)
            state.visibleLists = state.visibleLists.map((list) => list.id === data.id ? { ...list, count_tasks: data.count_tasks } : list)
        },

        //Уменьшаем количество задач в списке дел на -1
        DEC_COUNT_TASKS(state, data) {
            state.lists = state.lists.map((list) => list.id === data.id ? { ...list, count_tasks: data.count_tasks } : list)
            state.visibleLists = state.visibleLists.map((list) => list.id === data.id ? { ...list, count_tasks: data.count_tasks } : list)
        },

    },
    actions: {

        //Передаем с БД списки дел и задачи в них. Коммит SET_LISTS_TO_STATE записывает в lists и visibleLists списки дел, коммит SET_TASKS_TO_STATE записывает в tasks все задачи, коммит COLOR_LIST передает статус списка дел, коммит LIST_FILTER выводит на экран отфильтрованный visibleList.
        async fetchLists({ commit, state }) {
            const resList = await fetch('http://localhost:5000/lists')
            const dataList = await resList.json()
            await commit('SET_LISTS_TO_STATE', dataList)
            const resTasks = await fetch('http://localhost:5000/tasks')
            const dataTasks = await resTasks.json()
            await commit('SET_TASKS_TO_STATE', dataTasks)
            commit('COLOR_LIST')
            commit('LIST_FILTER', state.selectedOption)
        },

        // Создаем новый список дел и сохраняем его в БД. Коммит LIST_FILTER фильтрует новый список, чтобы он оказался в правильном разделе фильтра. 
        async NEW_LIST({ commit, state }, addtext) {
            if (!addtext) {
                alert("Введите название списка");
                return;
            }
            const newList = {
                text: addtext,
                count_tasks: 0,
            }

            const res = await fetch('http://localhost:5000/lists', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newList)
            })
            const data = await res.json()
            await commit('ADD_LIST', data)
            commit('LIST_FILTER', state.selectedOption)
            return data
        },

        //Создаем новую задачу. И сохраняем её в БД.
        async NEW_TASK({ commit, state }, { text, check }) {
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
                title: text,
                day: day,
                urgently: check,
                completed: false,
            }

            const res = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
            const data = await res.json()
            await commit('ADD_TASK', data)
            return data
        },

        // Удаляем из БД задачу
        async DELETE_TASK({ commit }, id) {
            if (confirm("Вы действительно хотите удалить задачу?")) {
                const ref = await fetch(`http://localhost:5000/tasks/${id}`, {
                    method: 'DELETE'
                })
                if (ref.status === 200) {
                    await commit('DELETE_TASK', id)
                } else {
                    alert('Error')
                }
            }
        },

        // Удаляем из БД список дел. Коммит LIST_FILTER выводит на экран новый отфильтрованный список дел
        async DELETE_LIST({ commit, state }, id) {
            if (confirm("Вы действительно хотите удалить список?")) {
                const ref = await fetch(`http://localhost:5000/lists/${id}`, {
                    method: 'DELETE'
                })
                if (ref.status === 200) {
                    await commit('DELETE_LIST', id)
                    commit('LIST_FILTER', state.selectedOption)

                } else {
                    alert('Error')
                }
            }
        },

        // Меняем статус задачи на противоположный, и записываем в БД новое значение. Коммит COLOR_LIST изменяет статус списка дел.  
        async CHANGE_TASK_COMPLITED({ commit }, id) {
            const task = await fetch(`http://localhost:5000/tasks/${id}`)
            const dataTask = await task.json()
            const updTask = { ...dataTask, completed: !dataTask.completed }
            const res = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updTask)
            })
            const data = await res.json()
            commit('CHANGE_TASK_COMPLITED', id, data)
            commit('COLOR_LIST')
        },

        // Увеличиваем счетчик задач в списке дел и записываем новое значение в БД. Коммит COLOR_LIST изменяет статус списка дел.
        async INC_COUNT_TASKS({ commit }) {
            const id = this.state.currentList.id
            const list = await fetch(`http://localhost:5000/lists/${id}`)
            const dataList = await list.json()
            const updList = { ...dataList, count_tasks: dataList.count_tasks + 1 }
            const res = await fetch(`http://localhost:5000/lists/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updList)
            })
            const data = await res.json()
            commit('INC_COUNT_TASKS', data)
            commit('COLOR_LIST')
            return data
        },

        // Уменьшаем счетчик задач в списке дел и записываем новое значение в БД. Коммит COLOR_LIST изменяет статус списка дел.
        async DEC_COUNT_TASKS({ commit }) {
            const id = this.state.currentList.id
            const list = await fetch(`http://localhost:5000/lists/${id}`)
            const dataList = await list.json()
            const updList = { ...dataList, count_tasks: dataList.count_tasks - 1 }
            const res = await fetch(`http://localhost:5000/lists/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updList)
            })
            const data = await res.json()
            commit('DEC_COUNT_TASKS', data)
            commit('COLOR_LIST')
            return data
        },

    },
    getters: {

        //Используются в фильтре списков дел. doneLists возвращает все выполненные списки дел, workLists возвращает все списки дел в "работе"
        doneLists: state => {
            return state.lists.filter(list => {
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
            })
        },
        workLists: state => {
            return state.lists.filter(list => {
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
            })
        }
    },
})

export default store