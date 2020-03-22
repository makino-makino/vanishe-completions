class currentDiff {
  constructor(io) {
    this.io = io
    this.before = ''
  }

  read() {
    const msg = this.io.read()
    this.before = msg

    // ここで差分を探す
    diff = '';
    return diff;
  }

  write(msg) {
    this.io.write(msg)
    this.reset()
  }
}
