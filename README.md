# ETC Hog 5 MIDI Show Control

> [!CAUTION]
> This experimental module was developed through AI-assisted, human-directed interaction. None of its code has been independently reviewed or verified by a human. Test every command in a non-show environment before considering live production use.

An unofficial Bitfocus Companion module that sends MIDI Show Control (MSC) commands to **Hog OS 5** over USB MIDI, RTP-MIDI/AppleMIDI, or an unframed raw MIDI-over-TCP socket.

## Important disclaimers

- This is a community project and is not affiliated with, endorsed by, or supported by Electronic Theatre Controls, Inc. ETC, Hog, and Hog 5 are trademarks of their respective owners.
- The software is provided without warranty. You are responsible for validating it with your exact Companion, Hog OS 5, interface, network, show file, and operating system.
- Do not first test this module during rehearsal or a live show. Prove every action against a non-production show file and inspect Companion's exact-byte transmission log.
- The official support target for this project is **Hog OS 5 only**. Hog 4 behavior is not supported or verified.

## Features

- GO, STOP, RESUME, Release, immediate TIMED_GO, Change Page, and Hog scene actions
- Separate Go Scene, Release Scene, and locally tracked Toggle Scene controls
- Raw SysEx passthrough with byte validation but no semantic interpretation or normalization
- One selected transport and one Hog/MSC target per Companion connection instance
- FIFO command queue with a configurable 0–500 ms inter-command delay
- Fixed two-second automatic reconnect; no manual reconnect or disconnect actions
- Transport status variable: `Connected`, `Disconnected`, or `Reconnecting`
- Scene State boolean feedback; multiple scenes can be tracked active simultaneously

## Connection setup

Choose one transport in **Edit Connection**:

- **USB MIDI:** select a detected MIDI output by name.
- **RTP-MIDI / AppleMIDI:** enter the remote host and AppleMIDI control port (normally 5004), plus an optional local session name.
- **Raw MIDI over TCP:** enter the remote host and port. Bytes are sent exactly as raw MIDI, with no framing or delimiter added.

Choose a decimal MSC Device ID from 0–126 or Broadcast/All-call. The MSC command format is fixed to General Lighting (`0x01`).

## Hog OS 5 setup

Map the intended MIDI input in the Hog console MIDI configuration, enable **MSC In**, and ensure its device ID matches the module. During commissioning, open **Control Panel → Event Monitor** and confirm the incoming SysEx before allowing it to affect a production show.

## Actions

- **GO:** requires both an explicit List and Cue. Decimal cues are supported. Hog OS 5 physical testing found that list-only and targetless GO messages were ignored, so the module blocks both incomplete forms without transmitting MIDI.
- **STOP / RESUME / Release:** List is optional; blank targets Hog's currently chosen playback behavior.
- **Skip Forward / Skip Back:** currently implemented as immediate `TIMED_GO` actions requiring an explicit destination Cue. See the protocol limitation below.
- **Change Page:** requires a whole-number Page.
- **Go / Release / Toggle Scene:** require a whole-number Scene and use Hog cue path 5.
- **Reset All Scene States:** clears only local tracked state and sends nothing to Hog.
- **Raw SysEx:** accepts whitespace-separated two-digit hex bytes beginning `F0` and ending `F7`, for example `F0 7F 01 02 01 01 31 00 33 F7`. The module sends the parsed byte values unchanged.

List, Scene, and Page values must resolve to whole non-negative numbers. Cue values may include a decimal point. Invalid resolved values are blocked and logged.

## Known limitations

- Scene state is inferred from successfully transmitted commands; it is not confirmed by Hog. It resets to inactive on startup, reconnect, or configuration change.
- USB MIDI send success is not a Hog acknowledgment. Network connection status likewise does not prove that Hog accepted a command.
- Commands still waiting in the queue are discarded if the transport disconnects. Their scene states do not change.
- AppleMIDI discovery is not yet included; v0.1 uses manual host/port configuration. The session transport requires hardware/software testing.
- The design conversation requested operator-facing Skip Forward/Back with only an optional List, but Hog's documented `TIMED_GO` wire format requires a cue number. The initial implementation therefore requires an explicit destination Cue pending Hog OS 5 hardware qualification.
- No supported/tested hardware matrix is published yet.
- On 2026-09-09, USB MIDI testing against Hog OS 5 physically qualified explicit GO List + Cue, STOP List, RESUME List, and Release List. Six list-only GO transmissions and two targetless GO transmissions were received without module errors but produced no Hog response; these GO variants are therefore not exposed by the module.

## Development

Requires Node.js 22.20+ and Yarn 4.

```sh
corepack yarn install
corepack yarn check
corepack yarn package
```

See [Companion help](companion/HELP.md), [CONTRIBUTING.md](CONTRIBUTING.md), [CHANGELOG.md](CHANGELOG.md), and [LICENSE](LICENSE).
