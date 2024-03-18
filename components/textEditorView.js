"use client";
import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);
const textEditorView = ({ desc }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    if (desc) {
      const prev_desc = convertFromRaw(JSON.parse(desc));
      setEditorState(EditorState.createWithContent(prev_desc));
    }
    var table = document.getElementById("property-table");
    var blocks = JSON.parse(desc).blocks;

    blocks.forEach(function (block) {
      if (block.text.trim() !== "") {
        var colonIndex = block.text.indexOf(":");
        if (colonIndex !== -1) {
          var propertyName = block.text.substring(0, colonIndex).trim();
          var propertyValue = block.text.substring(colonIndex + 1).trim();

          var row = table.insertRow();
          var propNameCell = row.insertCell(0);
          var propValueCell = row.insertCell(1);
          propNameCell.textContent = propertyName;
          propValueCell.textContent = propertyValue;
        }
      }
    })
  }, []);


 
  return (
    // <div>
    //   <Editor toolbarHidden editorState={editorState} readOnly />
    // </div>
    <div>
      <table id="property-table">
        <tr>
          <th>Property Name</th>
          <th>Value</th>
        </tr>
      </table>
    </div>
  );
};



export default textEditorView;
