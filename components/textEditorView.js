import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
          <tr key={index}>
            <td style={{ padding: "0 10px" }}>{propertyName}</td>
            <td style={{ padding: "0 10px" }}>{propertyValue}</td>
          </tr>
        );
      }
      return null; // Skip rendering if colonIndex is -1 (invalid format)
    });
  };

  return (
    
    <div>
      <table id="property-table">
        <thead>
          <tr>
            <th style={{ padding: "0 10px" }}>Property Name</th>
            <th style={{ padding: "0 10px" }}>Value</th>
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
