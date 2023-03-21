import * as dfd from "danfojs";

const NL = () => {
  const load_process_data = async () => {
    let df = await dfd.readCSV(
      "https://web.stanford.edu/class/archive/cs/cs109/cs109.1166/stuff/titanic.csv"
    );
    df.head().print();
  };

  const data = load_process_data();

  return data;
};

export default NL;
