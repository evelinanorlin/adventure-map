import React, { useRef } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";

interface TextEditorProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = ({
  description,
  setDescription,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    setDescription(content);
  };

  return (
    <>
      <TinyMCEEditor
        onInit={(editor) => (editorRef.current = editor)}
        apiKey={import.meta.env.VITE_TINYMCE_KEY || ""}
        init={{
          height: 500,
          menubar: true,
          toolbar:
            "undo redo | " +
            "bold italic |" +
            " bullist numlist outdent indent | " +
            "removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        value={description}
        onEditorChange={handleEditorChange}
      />
    </>
  );
};

export default TextEditor;
