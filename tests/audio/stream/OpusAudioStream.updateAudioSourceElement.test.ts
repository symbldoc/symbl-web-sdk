import AudioContext from 'audio-context-mock';
import Symbl from "../../../src/symbl";
import { OpusAudioStream } from '../../../src/audio';
import { APP_ID, APP_SECRET } from '../../constants';

let authConfig, symbl;
let audioStream;
beforeAll(() => {
    authConfig = {
        appId: APP_ID,
        appSecret: APP_SECRET
    };
    symbl = new Symbl(authConfig);
    const opusConfig: any = {
        numberOfChannels: 1,
        encoderSampleRate: 48000,
        encoderFrameSize: 20,
        maxFramesPerPage: 40,
        encoderComplexity: 6,
        streamPages: true,
        rawOpus: true
    };
    const context = new AudioContext();
    const mediaStream = new MediaStream();
    const sourceNode = context.createMediaStreamSource(mediaStream);
    audioStream = new OpusAudioStream(sourceNode, opusConfig);
});

// Check if `audioContext`, `sourceNode` and `processorNode` exist.
// If they do, close the `audioContext`, disconnect the `sourceNode` and `processorNode`
// Emit `audio_source_disconnected` event

test(
    `OpusAudioStream.updateAudioSourceElement - Check that \`detachAudioSourceElement\` and
    \`attachAudioSourceElement\` are invoked.`,
    async () => {
        const audioElement = document.createElement("audio");
        audioElement.src = "test.mp3";
        audioStream.attachAudioSourceElement = jest.fn();
        const detachElementSpy = jest.spyOn(audioStream, 'detachAudioSourceElement');
        const attachElementSpy = jest.spyOn(audioStream, 'attachAudioSourceElement');
        await audioStream.updateAudioSourceElement(audioElement);
        expect(detachElementSpy).toBeCalledTimes(1);
        expect(attachElementSpy).toBeCalledTimes(1);
        expect(attachElementSpy).toBeCalledWith(audioElement)
    }
)