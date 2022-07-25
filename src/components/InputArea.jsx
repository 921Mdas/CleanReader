import "./components.scss";

import React, { useRef, useState, useCallback } from "react";

import Toast from "./Toast";
import { AiOutlineFileAdd } from "react-icons/ai";
import { GiMagicBroom } from "react-icons/gi";
import { RiRestartFill } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";

// helper functions
import {
  HandleDrop,
  // HandleDragOver,
  // HandleDragLeave,
  // HandleFileChange,
  // FileProcessorCSVToText,
} from "../helper";

// lines of csv files before and after removing duplicates
let NUM_OF_LINES_BEFORE = 0;
let NUM_OF_LINES_AFTER = 0;

const InputArea = () => {
  const [useResults, setUseResults] = useState(null);
  const [isDropping, setIsDropping] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);

  const [FileInfo, setFileInfo] = useState(null);
  const txt = useRef();
  const drop = useRef();
  const TargetField = useRef();

  let finalVal = "";

  const copyContent = useCallback(() => {
    const finalText = txt.current?.innerText;
    navigator.clipboard.writeText(finalText);
    Toast("coped to clipboard!", "success");
  }, []);

  const FileProcessor = useCallback(File => {
    const reader = new FileReader();

    reader.onload = async e => {
      const text = e.target.result;
      const data = await csvToArray(text);
      NUM_OF_LINES_BEFORE = data.length;
      setUseResults(data);
    };

    reader.readAsText(File);
  }, []);

  // const HandleDrop = useCallback(e => {
  //   e.preventDefault();
  //   let dt = e.dataTransfer;
  //   let files = dt.files;
  //   FileProcessor(files[0]);
  // }, []);

  const HandleDrag = useCallback(e => {
    e.preventDefault();
    if (e) {
      setIsDropping(true);
    }
  }, []);

  const HandleDragLeave = useCallback(e => {
    e.preventDefault();
    setIsDropping(false);
  }, []);

  const HandleDragOver = useCallback(e => {
    e.preventDefault();
  }, []);

  const HandleFileChange = useCallback(e => {
    const { size, name, lastModified } = e.target?.files[0];

    setFileInfo({ name: name, size: size, lastMod: lastModified });

    if (hasDropped) {
      setHasDropped(false);
    }
    if (e) {
      setHasDropped(true);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const input = TargetField?.current?.files[0];
    FileProcessor(input);
    // FileProcessorCSVToText(input, setUseResults, csvToArray);
    setHasDropped(false);
    Toast("duplicates removed!", "success");
  };

  const csvToArray = useCallback(
    (str, delimiter = ",") => {
      const headers = str?.slice(0, str.indexOf("\n")).split(delimiter);
      const rows = str?.slice(str?.indexOf("\n") + 1).split("\n");
      const data = [];

      const array = rows.map(row => {
        const values = row?.split(delimiter);

        const obj = headers?.reduce((acc, cur, index) => {
          acc[cur] = values[index];
          return acc;
        }, {});

        data.push(obj);
      });

      return data;
    },
    [useResults]
  );

  const findDuplicates = useCallback(
    (arr = []) => {
      const cache = {};
      if (arr?.length === 0 || arr?.length === undefined) return;
      let length = arr?.length;
      let key;

      for (let i = 0; i < length; i++) {
        key = Object.values(arr[i])[0];
        if (key === "" || key === undefined) continue;
        cache[key] = i;
      }

      const results = EmailProcessor(Object.keys(cache));
      NUM_OF_LINES_AFTER = results.length;
      finalVal = results.toString();
      return finalVal;
    },
    [useResults]
  );

  const EmailProcessor = useCallback(
    (arr = []) => {
      return arr.reduce((acc, cur, idx) => {
        acc[idx] = cur.split("\r")[0];
        return acc;
      }, []);
    },
    [useResults]
  );

  const reset = () => {
    setUseResults(null);
    setFileInfo(null);
    setIsDropping(false);
    setHasDropped(false);
    NUM_OF_LINES_BEFORE = 0;
    NUM_OF_LINES_AFTER = 0;
  };

  return (
    <div className="inputSections">
      <div className="upload_section">
        <form action="" className="form_submit">
          <label
            htmlFor="drag_area"
            className={isDropping ? `drag_area scaleGrow` : `drag_area`}
          >
            <div
              ref={drop}
              onDrop={e => HandleDrop(e, FileProcessor)}
              onDragEnter={HandleDrag}
              onDragLeave={HandleDragLeave}
              onDragOver={HandleDragOver}
              className={isDropping ? `drag_zone` : `drag_zone`}
            >
              <AiOutlineFileAdd
                className={isDropping ? `File_icon` : `File_icon`}
                color="aliceblue"
              />
              Drag and Drop Your <br /> CSV File Here
            </div>
          </label>
          <div className="alternative">OR</div>
          <label
            htmlFor="file"
            className={`${hasDropped ? "uploaded" : ""} label_area `}
          >
            <p>{hasDropped ? "File uploaded" : "Upload your file"}</p>
            <input
              type="file"
              id="file"
              name="file"
              accept=".csv"
              ref={TargetField}
              className="file_field"
              onChange={e =>
                HandleFileChange(e, setFileInfo, hasDropped, setHasDropped)
              }
            />
          </label>
        </form>
        {hasDropped && (
          <div className="file_info">
            <p>
              <span>File:</span> {FileInfo.name}
            </p>
            <p>
              <span>Size: </span> {Math.trunc(FileInfo.size / 1000000)} MB
            </p>

            <p>
              <span>Last Modified: </span>
              {new Date(FileInfo.lastMod).toString().substring(0, 15)}
            </p>
          </div>
        )}
      </div>
      <div className="action_section">
        <button onClick={e => handleSubmit(e)} className="convert_btn">
          <GiMagicBroom color="aliceblue" />
        </button>
        <button onClick={reset} className="convert_btn">
          <RiRestartFill color="aliceblue" />
        </button>
      </div>
      <div className="result_section">
        <p className="results_field" ref={txt}>
          {findDuplicates(useResults)}
        </p>
        <button onClick={copyContent} className="convert_btn copy_btn">
          <IoCopy color="white" />
        </button>

        <div className="message_cleanup">
          <p className="file_cleanupinfo1 file_cleanupinfo">
            <span>Before:</span> {NUM_OF_LINES_BEFORE}
          </p>
          <p className="file_cleanupinfo2 file_cleanupinfo">
            <span>After:</span> {NUM_OF_LINES_AFTER}
          </p>
          <p className="file_cleanupinfo3 file_cleanupinfo">
            <span className="dupes_removed">Duplicates Removed: </span>
            {NUM_OF_LINES_BEFORE - NUM_OF_LINES_AFTER}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
