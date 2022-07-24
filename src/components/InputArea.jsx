import React, { useRef, useState, useEffect } from "react";
import "./components.scss";
import CustomButton from "./Button";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaFileCsv } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { GiMagicBroom } from "react-icons/gi";
import { IoCopy } from "react-icons/io5";
import Toast from "./Toast";

const InputArea = () => {
  const [useResults, setUseResults] = useState(null);
  const [isDropping, setIsDropping] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);
  const [inputBefore, setInputBefore] = useState(null);
  const [inputAfter, setInputAfter] = useState(null);
  const [inputNet, setInputNet] = useState(null);

  const [FileInfo, setFileInfo] = useState(null);
  const txt = useRef();
  const drop = useRef();
  const TargetField = useRef();

  let finalVal = "";

  const copyContent = () => {
    const finalText = txt.current?.innerText;
    navigator.clipboard.writeText(finalText);
    Toast("coped to clipboard!", "success");
  };

  const FileProcessor = File => {
    const reader = new FileReader();

    reader.onload = async e => {
      const text = e.target.result;
      const data = await csvToArray(text);
      setInputBefore(data.length);
      setUseResults(data);
    };

    reader.readAsText(File);
  };

  const handleDrop = e => {
    e.preventDefault();
    let dt = e.dataTransfer;
    let files = dt.files;
    FileProcessor(files[0]);
  };

  const handleDrag = e => {
    e.preventDefault();

    if (e) {
      setIsDropping(true);
    }
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDropping(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleFileChange = e => {
    const { size, name, lastModified } = e.target?.files[0];

    setFileInfo({ name: name, size: size, lastMod: lastModified });

    if (hasDropped) {
      setHasDropped(false);
    }
    if (e) {
      setHasDropped(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const input = TargetField?.current?.files[0];
    FileProcessor(input);
    setHasDropped(false);
    Toast("duplicates removed!", "success");
  };

  const csvToArray = (str, delimiter = ",") => {
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
  };

  const findDuplicates = (arr = []) => {
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
    console.log("after", results.length);
    setInputAfter(results.length);

    finalVal = results.toString();
    return finalVal;
  };

  const EmailProcessor = (arr = []) => {
    return arr.reduce((acc, cur, idx) => {
      acc[idx] = cur.split("\r")[0];
      return acc;
    }, []);
  };

  console.log(inputBefore, inputAfter);

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
              onDrop={handleDrop}
              onDragEnter={handleDrag}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
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
              onChange={e => handleFileChange(e)}
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
      <button onClick={e => handleSubmit(e)} className="convert_btn">
        <GiMagicBroom color="aliceblue" />
      </button>
      <div className="result_section">
        <p className="results_field" ref={txt}>
          {findDuplicates(useResults)}
        </p>
        <button onClick={copyContent} className="convert_btn copy_btn">
          <IoCopy color="white" />
        </button>

        <div className="message_cleanup">
          <p className="file_cleanupinfo1 file_cleanupinfo">
            Before: {inputBefore}
          </p>
          <p className="file_cleanupinfo2 file_cleanupinfo">
            After: {inputAfter}
          </p>
          <p className="file_cleanupinfo2 file_cleanupinfo">
            Duplicates Removed:
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
