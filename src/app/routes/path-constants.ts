class DASHBOARD {
  private root = '/'

  HOME = this.root

  STREAMER = `${this.root}/streamer/:id`
  AUTH = `${this.root}/auth`
}

export const PATH = new DASHBOARD()
