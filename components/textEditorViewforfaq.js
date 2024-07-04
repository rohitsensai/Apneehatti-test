"use client";
import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

const textEditorViewforfaq = ({ desc }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (desc) {
      try {
        const parsedDesc = JSON.parse(desc);
        const prev_desc = convertFromRaw(parsedDesc);
        setEditorState(EditorState.createWithContent(prev_desc));
      } catch (error) {
        console.error("Error parsing desc:", error);
      }
    }
  }, [desc]);

  return (
    <div>
      <Editor toolbarHidden editorState={editorState} readOnly />
    </div>
  );
};

export default textEditorViewforfaq;
