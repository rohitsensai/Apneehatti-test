import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import textEditorView from '../styles/textEditorView.module.css'

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

const TextEditorView = ({ desc }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Define a helper function to render table rows
  const renderTableRows = () => {
    if (!desc) return null; // Return early if desc is empty
  
    const prevDesc = JSON.parse(desc);
    const blocks = prevDesc.blocks;
  
    return blocks.map((block, index) => {
      const { text } = block;
      const colonIndex = text.indexOf(":");
      if (colonIndex !== -1) {
        const propertyName = text.substring(0, colonIndex).trim();
        const propertyValue = text.substring(colonIndex + 1).trim();
  
        return (
          <tr key={index} className="border-b border-gray-200">
            <td className="px-4 py-2">{propertyName}</td>
            <td className="px-4 py-2">{propertyValue}</td>
          </tr>
        );
      }
      return null; // Skip rendering if colonIndex is -1 (invalid format)
    });
  };
  

  return (
    <div>
      <table id={textEditorView["property-table"]} className={textEditorView["table"]}>
        <thead>
          <tr>
            <th style={{ padding: "0 10px" }} className={textEditorView["th"]}>Property Name</th>
            <th style={{ padding: "0 10px" }} className={textEditorView["td"]}>Value</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()} {/* Render dynamic table rows */}
        </tbody>
      </table>
    </div>



  );
};

export default TextEditorView;
