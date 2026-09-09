# ETC Hog 5 MIDI Show Control

This unofficial, experimental module targets Hog OS 5 only. It was developed with AI assistance and has not received independent human code verification. It is not affiliated with or supported by ETC and is provided without warranty. Test every button outside live production with your exact setup.

## Configure

Select USB MIDI and the intended output. Choose Specific Device ID (0–126, matching Hog's receiving ID) or Broadcast / All-call. Broadcast overrides the numeric outgoing ID field. Set inter-command delay (0–500 ms) and save.

Configure Hog's MIDI input and enable MSC In. For optional return monitoring, configure Hog's MSC output and connect its return path, enable Monitor return MSC, select the USB input, and match Return MSC Device ID to Hog's outgoing ID. Leave that return ID independent of output broadcast addressing.

Older network configurations remain disconnected until USB MIDI is selected and saved. TCP, AppleMIDI, and OSC are not available.

## Configure buttons

- GO requires List and Cue and uses programmed cue timing.
- STOP, RESUME, and Release require List.
- Skip Forward and Skip Back require Destination Cue and perform the same immediate jump. They do not calculate next/previous cues. List is optional; blank List worked with the chosen list in bounded Hog tests.
- Change Page requires Page. Scene actions require Scene.
- List, Scene, and Page use whole non-negative numbers. Cue supports decimals.
- Required blank or invalid values log an error and send nothing. Preset targets are intentionally blank placeholders.
- Raw SysEx accepts space-separated two-digit hex bytes from F0 through F7 and sends them unchanged. It does not directly update tracking.

There is no verified main chosen-playback Go/Halt key equivalent. Check the action inside a button; its editable button label does not determine what it sends.

## State feedback

List State and Scene State reflect successful targeted sends, corrected by accepted return MSC events. List GO/RESUME/Skip mark active; Release marks inactive; STOP retains activity. Scene State and Toggle share the same state. Multiple targets can be active.

This is active/released tracking, not fade progress, halt status, chosen-master identity, or a complete inventory. Blank-List Skip and Raw SysEx can update tracking through explicit-target return events, but not directly from the send.

Startup, configuration changes, and output reconnection reset tracking. Return-input loss alone retains last values and clears observations. Missed events can leave stale state; silence does not mean released. An open input does not prove cable continuity.

Scene diagnostic feedbacks remain available: Scene: Hog reported active, Scene: return observation available, and Scene: local/return mismatch. Use observation availability to distinguish unknown from released. New scene sends invalidate previous observations; reset, restart, output reconnect, and detected input loss clear observations. Accepted native scene GO/Release events and explicit-list GO/RESUME/TIMED_GO/Release events are filtered by configured return ID and recognized format; no MIDI is echoed.

Reset All Scene States clears local scene state and observations only; it does not release Hog scenes.

## Release All

Release All Lists, Release All Scenes, and Release All snapshot the corresponding tracked active targets and queue individual releases. Verify tracked states against Hog first. They cannot discover untracked console activity.

Combined Release All sends lists then scenes. Existing queued commands retain their position; targets activated after the snapshot are excluded. Empty tracking sends nothing. These actions do not cancel other queued actions.

## Recovery and verification

USB output availability is checked every two seconds. Detected loss discards waiting commands, rejects new commands, and reports Reconnecting. The selected output reopens automatically; discarded commands do not replay. Very brief interruptions may be missed.

Inspect Companion's Log for the resolved action and exact sent bytes, then verify the physical result. Successful send completion is not Hog acknowledgment. Return monitoring observes events without guaranteeing an acknowledgment for each command. There are no manual reconnect, disconnect, or connection-test actions.

Bounded USB tests covered core list/scene actions, return reconciliation, tracked releases, reconnect/discard/no-replay behavior, optional-List Skip, decimal Cue 4.5, and broadcast Skip. These results do not qualify every addressing combination, operating system, or interface.
