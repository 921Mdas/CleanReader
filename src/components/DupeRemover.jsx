import "./components.scss";

import React, { useRef, useState } from "react";

import Toast from "./Util/Toast";
import { AiOutlineFileAdd } from "react-icons/ai";
import { GiMagicBroom } from "react-icons/gi";
import { RiRestartFill } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";

// components
import Upload from "./Util/Upload";

// helper functions
import {
  copyContent,
  csvToArray,
  findDuplicates,
  NUM_OF_LINES_AFTER,
  NUM_OF_LINES_BEFORE,
  EmailProcessor,
  FileProcessor,
  Reset,
} from "../helper";

const DupeRemover = () => {
  const [useResults, setUseResults] = useState(null);
  const [isDropping, setIsDropping] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);
  const [FileInfo, setFileInfo] = useState(null);

  const ResultField = useRef();
  const dropFieldArea = useRef();
  const FileUploadInput = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const input = FileUploadInput?.current?.files[0];
    FileProcessor(input, csvToArray, setUseResults);
    setHasDropped(false);
    Toast("duplicates removed!", "success");
  };

  return (
    <div className="inputSections">
      <Upload
        isDropping={isDropping}
        dropFieldArea={dropFieldArea}
        setUseResults={setUseResults}
        setIsDropping={setIsDropping}
        hasDropped={hasDropped}
        FileUploadInput={FileUploadInput}
        setFileInfo={setFileInfo}
        FileInfo={FileInfo}
        setHasDropped={setHasDropped}
        FileProcessor={FileProcessor}
        csvToArray={csvToArray}
      />

      <div className="action_section">
        <button onClick={e => handleSubmit(e)} className="convert_btn">
          <GiMagicBroom color="aliceblue" />
        </button>
        <button
          onClick={() =>
            Reset(setUseResults, setFileInfo, setIsDropping, setHasDropped)
          }
          className="convert_btn"
        >
          <RiRestartFill color="aliceblue" />
        </button>
      </div>
      <div className="result_section">
        <p className="results_field" ref={ResultField}>
          {findDuplicates(useResults, EmailProcessor)}
        </p>
        <button
          onClick={() => copyContent(ResultField)}
          className="convert_btn copy_btn"
        >
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

export default DupeRemover;
