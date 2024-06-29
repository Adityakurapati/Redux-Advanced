import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Data Getting Cached -Issue SOlved 
export const apiSlice=createApi( {
        reducerPath: 'api',
        baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3500' } ),
        tagTypes: [ 'Todos' ],
        endpoints: ( builder ) => ( {
                getTodos: builder.query( {
                        query: () => '/todos',
                        providesTags: [ 'Todos' ],
                } ),
                addTodo: builder.mutation( {
                        query: ( todo ) => ( {
                                url: '/todos',
                                method: 'POST',
                                body: todo,
                        } ),
                        invalidatesTags: [ 'Todos' ],
                } ),
                updateTodo: builder.mutation( {
                        query: ( todo ) => ( {
                                url: `/todos/${ todo.id }`,
                                method: 'PATCH',
                                body: todo,
                        } ),
                        invalidatesTags: [ 'Todos' ],
                } ),
                deleteTodo: builder.mutation( {
                        query: ( id ) => ( {
                                url: `/todos/${ id }`,
                                method: 'DELETE',
                        } ),
                        invalidatesTags: [ 'Todos' ],
                } ),
        } ),
} );

export const {
        useGetTodosQuery,
        useAddTodoMutation,
        useUpdateTodoMutation,
        useDeleteTodoMutation,
}=apiSlice;

export default apiSlice;
