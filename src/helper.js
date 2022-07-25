import React, { useCallback } from "react";

//  constants
let NUM_OF_LINES_BEFORE = 0;
let NUM_OF_LINES_AFTER = 0;

// drag and drop helper functions

export const HandleDrop = (e, LinesProcessor) => {
  e.preventDefault();
  let dt = e.dataTransfer;
  let files = dt.files;
  LinesProcessor(files[0]);
};

export const HandleDragOver = (e, isFileDropping) => {
  e.preventDefault();
  e ? isFileDropping(true) : isFileDropping(false);
};

export const HandleDragLeave = (e, isFileDropping) => {
  e.preventDefault();
  isFileDropping(false);
};

export const HandleFileChange = (
  e,
  extractFileInfo,
  FileDropConfirmation,
  setFileDropped
) => {
  const { size, name, lastModified } = e.target?.files[0];
  extractFileInfo({ name: name, size: size, lastMod: lastModified });

  if (FileDropConfirmation) {
    setFileDropped(false);
  }
  if (e) {
    setFileDropped(true);
  }
};

// core functions
// process items from csv to text and formatting

// export const FileProcessorCSVToText = (
//   File,
//   updateFileResults,
//   FileTransformer
// ) => {
//   const reader = new FileReader();

//   reader.onload = async e => {
//     const text = e.target.result;
//     const data = await FileTransformer(text);
//     NUM_OF_LINES_BEFORE = data.length;
//     updateFileResults(data);
//   };

//   reader.readAsText(File);
// };
