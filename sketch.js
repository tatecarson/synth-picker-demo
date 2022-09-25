/* eslint-disable no-undef, no-unused-vars */

const duo = new Tone.DuoSynth().toDestination();
const am = new Tone.AMSynth().toDestination();

let synthPicker;
let presetPicker;
let duoPresetPicker;
let amPresetPicker;

let selectedSynth;

function setup() {
  synthPicker = createRadio();
  synthPicker.option("Duo Synth");
  synthPicker.option("AM Synth");
  synthPicker.selected("Duo Synth");

  synthPicker.changed(updatePresets);

  presetPicker = createSelect();
  presetPicker.option("DuoSynth1");
  presetPicker.option("DuoSynth2");
  presetPicker.changed(updateSynth);
}

const keyboard = new AudioKeys();

keyboard.down(function (note) {
  // do things with the note object
  console.log(note);

  if (synthPicker.value() === "Duo Synth") {
    duo.triggerAttack(note.frequency);
  } else {
    am.triggerAttack(note.frequency);
  }
});

keyboard.up(function (note) {
  // do things with the note object

  if (synthPicker.value() === "Duo Synth") {
    duo.triggerRelease();
  } else {
    am.triggerRelease();
  }
});

function updatePresets() {
  const options = selectAll("option");

  // delete previous options
  options.forEach((option) => {
    option.remove();
  });

  // add options that refer to selected synth
  if (synthPicker.value() === "Duo Synth") {
    presetPicker.option("DuoSynth1");
    presetPicker.option("DuoSynth2");
  } else if (synthPicker.value() === "AM Synth") {
    presetPicker.option("Tiny");
    presetPicker.option("Harmonics");
  }
}

function updateSynth() {
  if (presetPicker.value() === "DuoSynth1") {
    duo.set(duoSynth1);
  } else if (presetPicker.value() === "DuoSynth2") {
    duo.set(duoSynth2);
  } else if (presetPicker.value() === "Tiny") {
    am.set(tiny);
  } else if (presetPicker.value() === "Harmonics") {
    am.set(harmonics);
  }
}

function draw() {}

let harmonics = {
  harmonicity: 3.999,
  oscillator: {
    type: "square"
  },
  envelope: {
    attack: 0.03,
    decay: 0.3,
    sustain: 0.7,
    release: 0.8
  },
  modulation: {
    volume: 12,
    type: "square6"
  },
  modulationEnvelope: {
    attack: 2,
    decay: 3,
    sustain: 0.8,
    release: 0.1
  }
};

let tiny = {
  harmonicity: 1,
  envelope: {
    attack: 0.03,
    decay: 0.3,
    sustain: 0.7,
    release: 3
  },
  modulation: {
    volume: 12,
    type: "square6"
  },
  modulationEnvelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.8,
    release: 3
  }
};

let duoSynth1 = {
  vibratoAmount: 0.5,
  vibratoRate: 5,
  harmonicity: 4.0,
  voice0: {
    volume: -10,
    portamento: 0,
    oscillator: {
      type: "square"
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  },
  voice1: {
    volume: -20,
    portamento: 0.02,
    oscillator: {
      type: "sine"
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  }
};

let duoSynth2 = {
  vibratoAmount: 0.5,
  vibratoRate: 5,
  harmonicity: 1.5,
  voice0: {
    volume: -10,
    portamento: 0,
    oscillator: {
      type: "sine"
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  },
  voice1: {
    volume: -20,
    portamento: 0,
    oscillator: {
      type: "sine"
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    envelope: {
      attack: 0.01,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  }
};
