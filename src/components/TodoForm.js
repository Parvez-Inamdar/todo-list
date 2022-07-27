import React from 'react';
import { Form, Field } from 'react-final-form';

export default function TodoForm(props) {
    console.log("InitialValues", props.initialValues);
    const handleSubmit = (values) => {
        console.log("VA" ,values);
        props.onSubmit({
            id: `${Math.floor(Math.random() * 10000)}`,
            text: values.text,
            description: values.description
        });
    };

    return (
        <Form
            onSubmit={(values) => {
                console.log("TodoForm Values",values);
                handleSubmit(values);
            }}
            initialValues={props.initialValues}
            render={({ handleSubmit }) => (
                <form action="" className="cb-todo-form" onSubmit={handleSubmit}>
                    <Field name="text" component="input" placeholder="Add a name" className='cb-todo-input'/>
                    <Field name="description" component="textarea" placeholder="Add a desc" className='cb-todo-input'/>
                    <button type="submit" className="cb-todo-button">Add Todo</button>
                </form>
            )}
        />  
    )
}
