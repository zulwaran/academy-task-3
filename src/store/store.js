import { createStore } from 'vuex'

const store = createStore({
    state: {
        uid: '',
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
        //Содержит в себе данные об активном списке дел 
        currentList: [],
        //Опция фильтра. "По умолчанию" находится в состоянии done
        selectedOption: "done",
    },
    mutations: {},
    actions: {},
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