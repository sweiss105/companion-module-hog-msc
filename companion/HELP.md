# ETC Hog 5 MIDI Show Control

This unofficial, experimental module targets Hog OS 5 only. It was developed with AI assistance and has not received independent human code verification. Test outside live production; use Hog Event Monitor to verify received MSC.

## Configure

Select one transport, choose a specific decimal MSC Device ID or Broadcast, and set a 0–500 ms inter-command delay. Reconnect attempts occur automatically every two seconds.

USB MIDI uses the selected output name. RTP-MIDI/AppleMIDI and raw TCP require a host and port. Raw TCP adds no framing.

## Scene tracking

Scene State is local assumed state, not console feedback. State changes only after a scene command is transmitted. Disconnect/reconnect, restart, configuration changes, and Reset All Scene States make all scenes inactive locally.

## Safety

There is no Hog command acknowledgment, connection-test action, Panic/Release All, manual reconnect, or manual disconnect action. Validate every button before show use.
