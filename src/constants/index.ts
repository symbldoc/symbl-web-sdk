export const SYMBL_DEFAULTS = {
	DEFAULT_SAMPLE_RATE_HERTZ: 16000,
	DEFAULT_ENCODING_TYPE: 'LINEAR16',
	VALID_INSIGHT_TYPES: ['action_item', 'question', 'follow_up'],
	VALID_ENCODING: ['LINEAR16', 'OPUS'],
	LINEAR16_SAMPLE_RATE_HERTZ: [8000, 16000, 24000, 44100, 48000],
	OPUS_SAMPLE_RATE_HERTZ: [8000, 16000, 24000, 48000],
	ID_REGEX: /^[a-zA-Z0-9-]{6,64}$/,
	DISCONNECT_TIMEOUT_MIN: 0,
	DISCONNECT_TIMEOUT_MAX: 1800,
	NO_CONNECTION_TIMEOUT_MIN: 0,
	NO_CONNECTION_TIMEOUT_MAX: 1800,
}
