import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../api/apiSlice'

export const TodoList=() =>
{
        const [ todo, setTodo ]=useState( '' );
        const { data: todos, isLoading, isSuccess, isError, error }=useGetTodosQuery();
        const [ addTodo ]=useAddTodoMutation();
        const [ updateTodo ]=useUpdateTodoMutation();
        const [ deleteTodo ]=useDeleteTodoMutation();
        const handleSubmit=( e ) =>
        {
                e.preventDefault();
                if ( todo.trim() )
                {
                        // Handle submitting the todo here, e.g., save to a list or database
                        console.log( 'Submitting todo:', todo );
                        setTodo( '' );
                }
        };

        const newTodoSection=(
                <form onSubmit={ handleSubmit }>
                        <input
                                type='text'
                                value={ todo }
                                onChange={ ( e ) => setTodo( e.target.value ) }
                                placeholder='Add new Task'
                        />
                        <button type='submit'>
                                <FontAwesomeIcon icon={ faUpload } />
                        </button>
                </form>
        );

        let content;
        if ( isLoading )
        {
                content="<p>Loading...</p>";
        } else if ( isSuccess )
        {
                // content=JSON.stringify( todos );
                content=todos.map( todo => (
                        <article key={ todo.id }>
                                <div>
                                        <input type="checkbox"
                                                checked={ todo.completed }
                                                id={ todo.id }
                                                onChange={ () => updateTodo( { ...todo, completed: !todo.completed } ) } />
                                        <label htmlFor={ todo.id }>{ todo.title }</label>
                                </div>
                                <button onClick={ () => deleteTodo( { id: todo.id } ) }>
                                        <FontAwesomeIcon icon={ faTrash } />
                                </button>
                        </article>
                ) )
        } else if ( isError )
        {
                content=<p>{ error }</p>
        }

        return (
                <main>
                        <h1>Task Manager</h1>
                        { newTodoSection }
                        { content }
                </main>
        );
};