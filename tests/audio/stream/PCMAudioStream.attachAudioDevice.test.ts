import {AudioContext} from "standardized-audio-context-mock";

(AudioContext.prototype as any).createScriptProcessor = function() {}
// (AudioContext.prototype as any).createMediaStreamSource = m2;
// import AudioContext, {mocks} from "../../__mocks__/AudioContext.mock";
/**
 * return {
    SoundPlayer: jest.fn().mockImplementation(() => {
      return {playSoundFile: () => {}};
    }),
  };
 */
import Symbl from "../../../src2/symbl";
// import 
import { PCMAudioStream } from '../../../src2/audio';
import { APP_ID, APP_SECRET } from '../../constants';
import { InvalidAudioInputDeviceError } from " ../../../src2/error";
import { SymblEvent } from "../../../src2/events";

/**
 * failure cases:
 *  deviceId is invalid - throw InvalidAUdioINputDeviceError
 * 
 * success cases:
 *  if media stream is passed in invoke createMediaStreamSource 
 *  if media stream is not passed do not invoke - create media stream instead
 *  if audio context is already active emit `audio_source_disconnected` and recreate topology
 *  test with audio context not active
 *  if successful emit audio_source_connected
 *  
 */

 // mock audio context
 // AudioContext = jest.fn().mockImplementation(() => {});

Object.defineProperty(window, 'MediaStream', {
    writable: true,
    value: jest.fn().mockImplementation((query) => {})
});

Object.defineProperty(window, 'MediaStreamAudioSourceNode', {
    writable: true,
    value: jest.fn().mockImplementation((query) => {})
});

    
 let audioStream, device1, authConfig
 let symbl, streamingAPIConnection;
 let myStream = new MediaStream();

 describe('PCMAudioStream.attachAudioDevice tests', () => {
    beforeAll(() => {

        authConfig = {
            appId: APP_ID,
            appSecret: APP_SECRET
        };
        symbl = new Symbl(authConfig);
        const context = new AudioContext();
        const sourceNode = (<any>context).createMediaStreamSource(new MediaStream());
        sourceNode.context = context;
        audioStream = new PCMAudioStream(sourceNode);

        device1 = {
            deviceId: "default",
            kind: "audioinput",
            label: "",
            groupId: "default"
        }

        const mockGetUserMedia = jest.fn(async () => {
            return myStream;
        })

        const mockEnumerateDevices = jest.fn(async () => {
            return [device1];
        })

        Object.defineProperty(navigator, 'mediaDevices', {
            value: {
                getUserMedia: mockGetUserMedia,
                enumerateDevices: mockEnumerateDevices
            },
        })
        
    });

    beforeEach(() => {
    })

    //  test(
    //      'PCMAudioStream.attachAudioDevice -deviceId is invalid - throw InvalidAudioInputDeviceError',
    //      async () => {
    //         const deviceId = "my-invalid-device-id";
    //         expect(audioStream.attachAudioDevice(deviceId)).toThrowError(new InvalidAudioInputDeviceError('Invalid deviceId as parameter'));
    //      }
    //  )
    
    test(
        `PCMAudioStream.attachAudioDevice - Verify that createMediaStreamSource is invoked 
        when valid arguments are supplied.`,
        async () => {
            const mediaStream = new MediaStream();
            audioStream.audioContext = new AudioContext();
            const mediaStreamSpy = jest.spyOn(audioStream.audioContext, 'createMediaStreamSource');
            // audioStream.audioContext.createMediaStreamSource = m2;
            await audioStream.attachAudioDevice('default', mediaStream);
            expect(mediaStreamSpy).toBeCalledTimes(1);
            expect(mediaStreamSpy).toBeCalledWith(mediaStream);
        }
    )

    //  test(
    //      `PCMAudioStream.attachAudioDevice - If media stream is not passed do not 
    //      invoke - create media stream instead`,
    //      async () => {
    //         const mediaStreamSpy = jest.spyOn(audioStream.audioContext, 'createMediaStreamSource');
    //         const gumSpy = jest.spyOn(navigator.mediaDevices, 'getUserMedia');
    //         audioStream.attachAudioDevice('default');
    //         expect(gumSpy).toBeCalledTimes(1);

    //         // might not work because getUserMedia returns a promise
    //         expect(gumSpy).toReturnWith(myStream);

    //         expect(mediaStreamSpy).toBeCalledTimes(1);
    //         expect(mediaStreamSpy).toBeCalledWith(myStream);
    //      }
    //  )

    // /**
    //  * if (context.state === 'running') {
    //  *  this.detachAudioDevice()
    //  * }
    //  * // go on
    //  */

    //  test(
    //      `PCMAudioStream.attachAudioDevice -If audio context is already active invoke \`detachAudioDevice\``,
    //      async () => {
    //          const context = <any>new AudioContext();
    //          context.state = 'active';
    //          audioStream.audioContext = context;
    //          const detachDeviceSpy = jest.spyOn(audioStream, 'detachAudioDevice');
    //          audioStream.attachAudioDevice('default');
    //          expect(detachDeviceSpy).toBeCalledTimes(1);
    //      }
    //  )

    //  test(
    //      `PCMAudioStream.attachAudioDevice -If audio context is inactive we do not invoke \`detachAudioDevice\``,
    //      async () => {
    //          const context: any = new AudioContext();
    //          context.state = 'inactive';
    //          audioStream.audioContext = context;
    //          const detachDeviceSpy = jest.spyOn(audioStream, 'detachAudioDevice');
    //          audioStream.attachAudioDevice('default');
    //          expect(detachDeviceSpy).toBeCalledTimes(0);
    //      }
    //  )


    
    //  test(
    //     `PCMAudioStream.attachAudioDevice - If successful emit \`audio_source_connected\``,
    //     async () => {
    //        const mediaStream = new MediaStream();
    //        const eventEmitterSpy = jest.spyOn(audioStream, 'eventEmitter');
    //        audioStream.attachAudioDevice('default', mediaStream);
    //        expect(eventEmitterSpy).toBeCalledTimes(1);
    //        expect(eventEmitterSpy).toBeCalledWith(new SymblEvent('audio_source_connected'));
    //     }
    // )
});