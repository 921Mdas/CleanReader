import React, { useState } from "react";

import Toast from "./Toast";
import { AiOutlineFileAdd } from "react-icons/ai";
import { GiMagicBroom } from "react-icons/gi";
import { RiRestartFill } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";

// helper functions
import {
  HandleDrop,
  HandleDrag,
  HandleDragOver,
  HandleDragLeave,
  HandleFileChange,
} from "../../helper";

const Upload = ({
  isDropping,
  dropFieldArea,
  setUseResults,
  setIsDropping,
  hasDropped,
  FileUploadInput,
  setFileInfo,
  FileInfo,
  setHasDropped,
  FileProcessor,
  csvToArray,
}) => {
  return (
    <>
      <div className="upload_section">
        <form action="" className="form_submit">
          <label
            htmlFor="drag_area"
            className={isDropping ? `drag_area scaleGrow` : `drag_area`}
            data-testid="dragzone_id"
          >
            <div
              ref={dropFieldArea}
              onDrop={e =>
                HandleDrop(
                  e,
                  FileProcessor,
                  csvToArray,
                  setUseResults,
                  setHasDropped,
                  setFileInfo
                )
              }
              onDragEnter={e => HandleDrag(e, setIsDropping)}
              onDragLeave={e => HandleDragLeave(e, setIsDropping)}
              onDragOver={e => HandleDragOver(e, setIsDropping)}
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
            data-testid="input_label"
          >
            <p>{hasDropped ? "File uploaded" : "Upload your file"}</p>
            <input
              type="file"
              id="file"
              name="file"
              accept=".csv"
              ref={FileUploadInput}
              className="file_field"
              data-testid="input_upload"
              onChange={e =>
                HandleFileChange(e, setFileInfo, hasDropped, setHasDropped)
              }
            />
          </label>
        </form>
        {hasDropped && (
          <div className="file_info">
            <p>
              <span>File:</span> {FileInfo?.name}
            </p>
            <p>
              <span>Size: </span> {Math.trunc(FileInfo?.size / 1000000)} MB
            </p>

            <p>
              <span>Last Modified: </span>
              {new Date(FileInfo?.lastMod).toString().substring(0, 15)}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
