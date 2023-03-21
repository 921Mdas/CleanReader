import React, { useCallback } from "react";
import Toast from "./components/Util/Toast";

//  constants
export let NUM_OF_LINES_BEFORE = 0;
export let NUM_OF_LINES_AFTER = 0;
export let FINAL_VAL = "";

// drag and drop helper functions

export const HandleDrop = (
  e,
  LinesProcessor,
  csvToArray,
  setUseResults,
  setHasDropped,
  setFileInfo,
  extractFileInfo
) => {
  e.preventDefault();
  let dt = e.dataTransfer;
  let files = dt.files;
  setHasDropped(true);
  console.log(dt);
  const { size, name, lastModified } = files[0];
  setFileInfo({ name: name, size: size, lastMod: lastModified });
  // if statement that will either analyze or remove duplicates here
  return LinesProcessor(files[0], csvToArray, setUseResults);
};

export const HandleDrag = (e, isFileDropping) => {
  e.preventDefault();
  if (e) isFileDropping(true);
};

export const HandleDragOver = e => {
  e.preventDefault();
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

// copy 2 clipboard

export const copyContent = element => {
  const finalText = element?.current?.innerText;
  navigator.clipboard.writeText(finalText);
  Toast("coped to clipboard!", "success");
};

// convert CSV to array
export const csvToArray = (str, delimiter = ",") => {
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

// find duplicates
export const findDuplicates = (arr = [], LineCleanUp) => {
  const cache = {};
  const dupesFound = [];
  if (arr?.length === 0 || arr?.length === undefined) return;
  let length = arr?.length;
  let key;

  for (let i = 0; i < length; i++) {
    key = Object.values(arr[i])[0];
    if (key === "" || key === undefined) continue;
    if (key in cache) {
      dupesFound.push(key);
    }
    cache[key] = i;
  }

  const results = LineCleanUp(Object.keys(cache));
  NUM_OF_LINES_AFTER = results.length;
  return results;
};

// line cleans extra characters
export const EmailProcessor = (arr = []) => {
  return arr.reduce((acc, cur, idx) => {
    acc[idx] = cur.split("\r")[0];
    return acc;
  }, []);
};

// convert lines of csv to array

export const FileProcessor = (File, LineConverter, updateArrayState) => {
  const reader = new FileReader();

  reader.onload = async e => {
    const text = e.target.result;
    const data = await LineConverter(text, ",");
    NUM_OF_LINES_BEFORE = data.length;
    updateArrayState(data);
  };

  reader.readAsText(File);
};

// datascience Danfo.js

// reset everything

export const Reset = (
  setUseResults,
  setFileInfo,
  setIsDropping,
  setHasDropped
) => {
  setUseResults(null);
  setFileInfo(null);
  setIsDropping(false);
  setHasDropped(false);

  NUM_OF_LINES_BEFORE = 0;
  NUM_OF_LINES_AFTER = 0;
  FINAL_VAL = "";
};
