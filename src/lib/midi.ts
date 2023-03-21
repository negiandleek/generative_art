let channel: number
let value: number
let on: number;

navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
    console.log(input);
  }
}

function getMIDIMessage(midiMessage: WebMidi.MIDIMessageEvent) {
  value = midiMessage.data[2];
  channel = midiMessage.data[1];
  on = midiMessage.data[0];
}

export { channel, value, on}