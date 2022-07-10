import React, { useEffect,useState, useRef } from "react";
function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const [datas, setdatas] = useState('')

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
    
  }, []);
  
  return (
    <div>
      {editorLoaded ? (


<CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
            
          mediaEmbed: {
            previewsInData: true
          }
        }}
        disabled={false}
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          
        }}
        // onChange={(event, editor) => {
        //   const data = editor.getData();
        //   setdatas(data)
        //   dispatch(valuepass(datas))
          
        // }}
        // onBlur={()=>{
        //   dispatch(valuepass(datas))
        // }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
