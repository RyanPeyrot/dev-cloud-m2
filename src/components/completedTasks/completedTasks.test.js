import React, {useContext} from "react";
import {render} from "@testing-library/react";
import CompletedTasks from "./index";
import {TasksContext} from "../../utils/contexts/taskContext";

test('No render if not any completed tasks', () => {
    const taskList = [
        { id: 1, text: 'Task 1', completed: false },
    ];

    const renderWithTasksContext = (taskList) => {
        return render(
            <TasksContext.Provider value={{ tasks: taskList }}>
                <CompletedTasks />
            </TasksContext.Provider>
        );
    };

    const completedTasksElement = renderWithTasksContext(taskList).getByRole('list');
    expect(completedTasksElement).toBeEmptyDOMElement();

})

test('Completed tasks are rendered', ()=> {
    const taskList = [
        {id: 3, text: 'Task 3', completed: true},
    ];

    const renderWithTasksContext = (taskList) => {
        return render(
            <TasksContext.Provider value={{tasks: taskList}}>
                <CompletedTasks/>
            </TasksContext.Provider>
        );
    };

    const completedTasksElement = renderWithTasksContext(taskList).getAllByRole('listitem');
    expect(completedTasksElement).toHaveLength(1)
})

test('Uncompleted tasks are not rendered', () => {
    const taskList = [
        {id: 2, text: 'Task 2', completed: false},
        {id: 3, text: 'Task 3', completed: true},
    ];

    const renderWithTasksContext = (taskList) => {
        return render(
            <TasksContext.Provider value={{tasks: taskList}}>
                <CompletedTasks/>
            </TasksContext.Provider>
        );
    };

    const completedTasksElement = renderWithTasksContext(taskList).getAllByRole('listitem');
    expect(completedTasksElement).toHaveLength(0) //1 working

})

test('Render components snapshot', () => {
    const taskList = [
        {id: 2, text: 'Task 2', completed: false},
        {id: 3, text: 'Task 3', completed: true},
    ];

 const {asFragment} = render(
     <TasksContext.Provider value={{tasks: taskList}}>
        <CompletedTasks/>
     </TasksContext.Provider>
 );
 expect(asFragment()).toMatchSnapshot()
})
