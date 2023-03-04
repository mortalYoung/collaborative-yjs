import { useEffect } from "react";
import * as monaco from "monaco-editor";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import "./App.scss";

export default function App() {
  // const { data, error, isLoading } = usePost("/api/login");

  useEffect(() => {
    const ydocument = new Y.Doc();
    const type = ydocument.getText("monaco");
    const provider = new WebsocketProvider(
      `${location.protocol === "http:" ? "ws:" : "wss:"}//localhost:1234`,
      "monaco",
      ydocument
    );
    const ide = monaco.editor.create(document.getElementById("container")!, {
      value: 'console.log("Hello, world")',
      language: "javascript",
    });
    const monacoBinding = new MonacoBinding(
      type,
      ide.getModel()!,
      new Set([ide]),
      provider.awareness
    );
    return () => {
      ide.dispose();
    };
  }, []);

  return <div id="container"></div>;
}
