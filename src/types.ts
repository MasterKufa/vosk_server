export type SRConfig = {
  inputName: string;
  id: string;
};

export type TranscriptionUnit = {
  conf: number;
  end: number;
  start: number;
  word: string;
  id: number;
};

export type SROutput = {
  result: TranscriptionUnit[];
  text: string;
};

export type SRTaskResult = SROutput & {
  id: string;
  success: boolean;
};

export type SRTask = {
  processPath: string;
  callback: (res: SRTaskResult) => void;
  id: string;
  inputName: string;
};
