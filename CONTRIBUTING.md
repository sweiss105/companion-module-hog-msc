# Contributing

Bug reports and focused pull requests are welcome. This project officially targets Hog OS 5 only.

1. Describe the Hog OS, Companion, transport, interface, and operating-system versions involved without including private show data.
2. Keep changes focused and preserve the module's safety boundaries.
3. Add or update tests for MSC bytes, queueing, state changes, and reconnect behavior.
4. Run `corepack yarn check` and update user documentation when behavior changes.

New protocol behavior should cite an authoritative specification or ETC source and should not be described as hardware-qualified until it has been tested on the relevant physical path.
