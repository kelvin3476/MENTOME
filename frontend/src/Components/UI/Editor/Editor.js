import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
];

const QuillEditor = ({ name, value, onChange, placeholder }) => {
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                ],
            },
        };
    }, []);

    const editorStyle = {
        width: '100%',
        height: '700px',
    };

    return (
        <ReactQuill
            theme="snow"
            placeholder={placeholder}
            modules={modules}
            formats={formats}
            name={name}
            value={value}
            onChange={onChange}
            style={editorStyle}
        />
    );
};

export default QuillEditor;
