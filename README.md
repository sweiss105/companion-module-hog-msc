# ETC Hog 5 MIDI Show Control

> [!CAUTION]
> This experimental module was developed through AI-assisted, human-directed interaction. None of its code has been independently reviewed or verified by a human. Test every command in a non-show environment before considering live production use.

An unofficial Bitfocus Companion module that sends MIDI Show Control (MSC) commands to **Hog OS 5** over USB MIDI.

## Important disclaimers

- This is a community project and is not affiliated with, endorsed by, or supported by Electronic Theatre Controls, Inc. ETC, Hog, and Hog 5 are trademarks of their respective owners.
- The software is provided without warranty. You are responsible for validating it with your exact Companion, Hog OS 5, interface, show file, and operating system.
- Do not first test this module during rehearsal or a live show. Prove every action against a non-production show file and inspect Companion's exact-byte transmission log.
- The official support target for this project is **Hog OS 5 only**. Hog 4 behavior is not supported or verified.

## Features

- GO, STOP, RESUME, Release, immediate cue jumps (Skip Forward / Skip Back), and Change Page
- Go Scene, Release Scene, and Toggle Scene
- List State and Scene State feedback with optional incoming MSC reconciliation
- Release All Lists, Release All Scenes, and Release All for tracked active targets
- USB MIDI output, optional receive-only USB input, automatic recovery, and FIFO pacing (0–500 ms)
- Raw SysEx passthrough with byte validation; transport status variable

## Connection setup

Select USB MIDI and the intended output by name. Choose Specific Device ID (decimal 0–126) or Broadcast / All-call. Broadcast uses address `7F` and overrides the numeric outgoing ID field. General Lighting (`01`) is fixed. Save connection changes.

On Hog, configure the intended MIDI input and enable MSC In. For specific addressing, match the outgoing Device ID to Hog's receiving ID. To receive Hog events, enable Monitor return MSC, select the return input, and match Return MSC Device ID to Hog's outgoing ID. This return ID is independent of broadcast output. Enable/configure Hog's MSC output and connect the return MIDI path.

USB MIDI is the only supported transport. Legacy TCP/AppleMIDI configurations remain disconnected until USB is selected and saved. OSC is not implemented.

## Actions

| Action                           | Required target and behavior                                                                                                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GO                               | List and Cue; runs the specified cue using its programmed timing.                                                                                                                       |
| STOP / RESUME / Release          | Explicit List; halt, resume, or release that list.                                                                                                                                      |
| Skip Forward / Skip Back         | Destination Cue required; List optional. Both perform the same immediate cue jump, not automatic next/previous navigation. Blank List worked with the chosen List49 in bounded testing. |
| Change Page                      | Whole-number Page.                                                                                                                                                                      |
| Go / Release / Toggle Scene      | Whole-number Scene. Toggle and Scene State share tracked state.                                                                                                                         |
| Reset All Scene States           | Clears local scene tracking and observations; sends no MIDI.                                                                                                                            |
| Release All Lists / Scenes / All | Releases the corresponding tracked active targets; see limitations below.                                                                                                               |
| Raw SysEx                        | Whitespace-separated two-digit hex bytes beginning `F0` and ending `F7`; sent unchanged after syntax validation.                                                                        |

List, Scene, and Page values must resolve to whole non-negative numbers. Cue values support decimals. Preset targets start blank and must be configured where required. Invalid actions log an error and send nothing. Missing GO List/Cue and missing STOP/RESUME/Release List are rejected because tested incomplete forms produced no observed response.

No reliable MSC equivalent of the console's main chosen-playback Go/Halt keys has been established. The module does not discover chosen masters, next cues, or halt state.

## Tracking and return monitoring

Use List State or Scene State feedback to style a button for its target. Successful explicit-target sends update tracking; accepted Hog return events reconcile it automatically without echoing MIDI. List GO/RESUME/Skip mark active, Release marks inactive, and STOP retains activity. Scene GO/Release update scene state. Multiple targets can be active simultaneously.

Activity does not mean a fade is running. Raw SysEx and blank-List Skip do not directly identify/update a tracked target, but a matching explicit-target return can update it. This is event monitoring, not a full console snapshot or guaranteed command acknowledgment. Pre-existing activity and missed events can leave tracking incomplete or stale.

Startup, configuration changes, and output reconnection reset list/scene tracking. Return-input loss alone retains the last tracked values but clears observations; silence never forces targets inactive. An open MIDI input does not prove cable continuity. See [Companion help](companion/HELP.md) for scene diagnostic feedbacks.

## Release All behavior

Verify Companion's tracked states match Hog before using Release All Lists, Release All Scenes, or Release All. These release only tracked active targets, not every console object.

Each press snapshots the selected targets and queues individual releases (lists then scenes for combined Release All). Existing queued commands retain their position. Targets activated afterward are excluded. Empty tracking sends nothing. Send completion updates each target, with Hog returns taking precedence when received during transmission.

## USB recovery and logging

Output availability is checked every two seconds, including while idle. Detected loss reports Reconnecting and discards waiting commands. Commands submitted while disconnected are rejected; discarded commands are not replayed. The named output reopens automatically when available. Very brief interruptions between checks may be missed.

The `transport_status` variable reports Connected, Disconnected, or Reconnecting. Successful sends appear in Companion's Log with resolved targets and exact bytes. Send completion proves neither Hog receipt nor physical execution. There are no manual reconnect, disconnect, or connection-test actions.

## Qualification

See [hardware acceptance record](docs/ACCEPTANCE.md) for tested cases and remaining limits. September 9 testing used a Tour Hog running Hog OS 5, Companion 5.0.3 on macOS, and C2MIDI Pro Port 1. Physical results were reported by the operator and correlated with Companion logs and selected receive-only captures. They are not independent human code review or qualification of every host, interface, or show configuration.

Versions through 0.1.4 had incorrect scene targeting. Version 0.1.5 corrected the native scene layout and passed installed GO/Release/Toggle testing with a different scene chosen. Use the current package, and validate your own setup before live use.

## Reference documentation

The Hog v5.2.1 User Manual, revision A, is the project's primary reference (locally supplied; not redistributed in this repository). Its version is a documentation version, not a claim about the exact console build tested.

## Development

Requires Node.js compatible with `^22.20` and Yarn 4.

```sh
corepack yarn install
corepack yarn check
corepack yarn package
```

See [Companion help](companion/HELP.md), [CONTRIBUTING.md](CONTRIBUTING.md), [CHANGELOG.md](CHANGELOG.md), and [LICENSE](LICENSE).
