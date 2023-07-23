import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

function EditorBox() {
    return (
        <Editor
            initialValue="내용을 입력하세요!"
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
        />
    );
}

export default EditorBox;
