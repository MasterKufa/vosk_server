const { loadModel, transcriptFromFile, freeModel } = require('vosk');
import { resolve } from 'path';

const MODELS_DIR = resolve('app', 'models', 'vosk-model-ru-0.42');

const speechToText = async ({ inputName, id }) => {
  const model = loadModel(MODELS_DIR);

  try {
    const srResult = await transcriptFromFile(inputName, model, {
      sampleRate: 8000,
    });

    process.send({ ...srResult, success: true, id });
  } catch {
    process.send({ success: false, id });
    process.exit(1);
  } finally {
    freeModel(model);
    exec(`rm "/app/input/${inputName}"`, process.exit);
  }
};

process.on('message', speechToText);
