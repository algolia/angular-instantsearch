interface MemoryState {
  [key: string]: string | number;
}

export class MemoryRouter {
  private memoryState: MemoryState;
  constructor(initialState: MemoryState = {}) {
    this.memoryState = initialState;
  }
  write(routeState: MemoryState) {
    this.memoryState = routeState;
  }
  read() {
    return this.memoryState;
  }
  createURL() {
    return '';
  }
  onUpdate() {
    return {};
  }
  dispose() {}
}
